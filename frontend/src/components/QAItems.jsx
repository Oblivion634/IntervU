import { useState } from "react";
import ReactMarkdown from "react-markdown";

const QAItem = ({ item, onPin }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className="bg-white text-black rounded shadow mb-4 p-4 transition hover:shadow-md">
      
      {/* Question + Pin */}
      <div className="flex justify-between items-center">
        <h3
          className="font-medium cursor-pointer"
          onClick={toggle}
        >
          {item.question}
        </h3>

        <button onClick={() => onPin?.(item._id)}>
          {item.pinned ? "📌" : "📍"}
        </button>
      </div>

      {/* Toggle Text */}
      <div 
        className="text-sm text-blue-500 cursor-pointer mt-2"
        onClick={toggle}
      >
        {open ? "Click to hide answer" : "Click to reveal answer"}
      </div>

      {/* Answer */}
      {open && (
        <div className="mt-3 text-gray-700">
          <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default QAItem;