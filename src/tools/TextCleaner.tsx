import { useState } from "react";
import { Copy, Check, Wand2 } from "lucide-react";

export default function TextCleaner() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClean = (type: string) => {
    let newText = text;
    switch (type) {
      case "lowercase":
        newText = newText.toLowerCase();
        break;
      case "uppercase":
        newText = newText.toUpperCase();
        break;
      case "capitalize":
        newText = newText.replace(/\b\w/g, l => l.toUpperCase());
        break;
      case "spaces":
        newText = newText.replace(/\s+/g, ' ').trim();
        break;
      case "newlines":
        newText = newText.replace(/\n{3,}/g, '\n\n');
        break;
      case "email":
        newText = newText.replace(/>/g, '').replace(/On.*wrote:/g, '').trim();
        break;
    }
    setText(newText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto flex flex-col h-[60vh]">
      <div className="flex-1 relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your messy text here..."
          className="w-full h-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm"
        />
        {text && (
          <button
            onClick={copyToClipboard}
            className="absolute bottom-4 right-4 p-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 shadow-lg transition-all flex items-center gap-2"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="text-sm font-medium">{copied ? "Copied!" : "Copy"}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button onClick={() => handleClean("spaces")} className="p-3 bg-white border border-neutral-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <Wand2 size={16} className="text-blue-500" /> Remove Extra Spaces
        </button>
        <button onClick={() => handleClean("newlines")} className="p-3 bg-white border border-neutral-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <Wand2 size={16} className="text-blue-500" /> Fix Line Breaks
        </button>
        <button onClick={() => handleClean("lowercase")} className="p-3 bg-white border border-neutral-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <Wand2 size={16} className="text-blue-500" /> lowercase
        </button>
        <button onClick={() => handleClean("uppercase")} className="p-3 bg-white border border-neutral-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <Wand2 size={16} className="text-blue-500" /> UPPERCASE
        </button>
        <button onClick={() => handleClean("capitalize")} className="p-3 bg-white border border-neutral-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <Wand2 size={16} className="text-blue-500" /> Capitalize Words
        </button>
        <button onClick={() => handleClean("email")} className="p-3 bg-white border border-neutral-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <Wand2 size={16} className="text-blue-500" /> Clean Email Replies
        </button>
      </div>
    </div>
  );
}
