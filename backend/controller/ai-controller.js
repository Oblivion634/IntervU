import dotenv from "dotenv";
dotenv.config();

import StatusCodes from "http-status-codes";
import { GoogleGenAI } from "@google/genai";
import Question from "../models/question-model.js";
import Session from "../models/session-model.js";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts-util.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Generate + SAVE interview questions for a session
// @route   POST /api/ai/generate-questions
// @access  Private
export const generateInterviewQuestions = async (req, res) => {
  console.log("hi");
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "sessionId is required",
      });
    }

    // ✅ 1. Get session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Not authorized",
      });
    }

    const { role, experience, topicsToFocus } = session;

    console.log("✅ SESSION:", session);

    // ✅ 2. Generate prompt
    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, 10);

    // ✅ 3. Call Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("✅ GEMINI RESPONSE RECEIVED");

    // ✅ 4. Extract text safely
    const parts = response.candidates?.[0]?.content?.parts ?? [];

    const rawText = parts
      .filter((p) => !p.thought)
      .map((p) => p.text || "")
      .join("");

    console.log("🧠 RAW TEXT:\n", rawText);

    // ✅ 5. Clean text
    let cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/^json/g, "")
      .trim();

    console.log("🧹 CLEANED TEXT:\n", cleanedText);

    // ✅ 6. SAFE JSON PARSING (ULTRA FIX)
    let questions;

    try {
      const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);

      if (!jsonMatch) {
        throw new Error("No JSON array found");
      }

      let jsonString = jsonMatch[0];

      // 🔥 Fix common AI mistakes
      jsonString = jsonString
        .replace(/,\s*}/g, "}") // remove trailing commas
        .replace(/,\s*]/g, "]")
        .replace(/\n/g, " ")
        .replace(/\r/g, "");

      console.log("✅ FINAL JSON STRING:\n", jsonString);

      questions = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("❌ JSON PARSE ERROR");
      console.error("🔥 BROKEN TEXT:\n", cleanedText);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "AI returned invalid JSON",
      });
    }

    if (!Array.isArray(questions)) {
      throw new Error("Response is not an array");
    }

    console.log("✅ PARSED QUESTIONS:", questions.length);

    // ✅ 7. Save to DB
    const saved = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer || "",
        note: "",
        isPinned: false,
      })),
    );

    // ✅ 8. Attach to session
    session.questions.push(...saved.map((q) => q._id));
    await session.save();

    console.log("🎉 QUESTIONS SAVED");

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error("🔥 FINAL ERROR:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc    Generate explanation for an interview question
// @route   POST /api/ai/generate-explanation
// @access  Private
export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    // Clean it: Remove backticks, json markers, and any extra formatting
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .replace(/^json\s*/, "")
      .trim();

    // Parse the cleaned JSON
    let explanation;
    try {
      explanation = JSON.parse(cleanedText);
    } catch (parseError) {
      // If parsing fails, try to extract JSON object from text
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        explanation = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response as JSON");
      }
    }

    // Validate the response structure
    if (!explanation.title || !explanation.explanation) {
      throw new Error(
        "Response missing required fields: title and explanation",
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: explanation,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("questions"); // ← this was missing

    if (!session)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Session not found" });

    res.status(StatusCodes.OK).json({ success: true, session });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
