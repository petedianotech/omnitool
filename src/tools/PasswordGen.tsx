import { useState } from "react";
import { Copy, RefreshCw, Check, ShieldCheck } from "lucide-react";

export default function PasswordGen() {
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"memorable" | "secure">("secure");
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

  const words = ["apple", "river", "cloud", "stone", "eagle", "flame", "ocean", "tiger", "frost", "shadow", "spark", "breeze", "mountain", "valley", "forest", "desert", "storm", "crystal", "silver", "gold"];
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const generate = () => {
    let newPass = "";
    if (type === "memorable") {
      const numWords = Math.max(3, Math.floor(length / 5));
      for (let i = 0; i < numWords; i++) {
        newPass += words[Math.floor(Math.random() * words.length)];
        if (i < numWords - 1) newPass += "-";
      }
      // Add a random number at the end for complexity
      newPass += Math.floor(Math.random() * 100);
    } else {
      for (let i = 0; i < length; i++) {
        newPass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    setPassword(newPass);
    setCopied(false);
  };

  // Generate on mount
  useState(() => {
    generate();
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-md mx-auto py-4">
      <div className="flex bg-neutral-100 p-1 rounded-xl w-full">
        <button
          onClick={() => { setType("secure"); setLength(16); }}
          className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${type === "secure" ? "bg-white shadow-sm text-blue-600" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Hard to Crack
        </button>
        <button
          onClick={() => { setType("memorable"); setLength(15); }}
          className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${type === "memorable" ? "bg-white shadow-sm text-blue-600" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Easy to Remember
        </button>
      </div>

      <div className="relative">
        <div className="w-full p-6 bg-neutral-900 text-white rounded-2xl font-mono text-xl sm:text-2xl break-all text-center min-h-[100px] flex items-center justify-center shadow-inner">
          {password}
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg transition-all flex items-center justify-center"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
          <button
            onClick={generate}
            className="p-3 bg-white text-neutral-700 border border-neutral-200 rounded-full hover:bg-neutral-50 shadow-lg transition-all flex items-center justify-center"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="pt-8 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-neutral-700">Length / Complexity</label>
          <span className="font-bold text-blue-600">{length}</span>
        </div>
        <input
          type="range"
          min={type === "secure" ? "8" : "10"}
          max={type === "secure" ? "64" : "30"}
          step="1"
          value={length}
          onChange={(e) => { setLength(Number(e.target.value)); generate(); }}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-start gap-3 text-sm text-green-800">
        <ShieldCheck className="shrink-0 mt-0.5" size={18} />
        <p>This password is generated locally on your device and is never sent over the internet.</p>
      </div>
    </div>
  );
}
