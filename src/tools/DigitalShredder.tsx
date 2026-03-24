import { useState } from "react";
import { Copy, Trash2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function DigitalShredder() {
  const [text, setText] = useState("");
  const [isShredding, setIsShredding] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleShred = () => {
    if (!text) return;
    setIsShredding(true);
    setTimeout(() => {
      setText("");
      setIsShredding(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto flex flex-col h-[60vh]">
      <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3 text-sm text-red-800">
        <ShieldAlert className="shrink-0 mt-0.5" size={18} />
        <p>Paste sensitive information here (like a credit card number or temporary password). Copy it, then shred it to completely remove it from your screen and memory.</p>
      </div>

      <div className="flex-1 relative overflow-hidden rounded-2xl border-2 border-neutral-200 focus-within:border-red-500 transition-colors bg-neutral-50">
        <AnimatePresence>
          {!isShredding ? (
            <motion.textarea
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste sensitive info here..."
              className="w-full h-full p-6 bg-transparent outline-none resize-none font-mono text-lg"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-white"
            >
              <div className="flex gap-1 overflow-hidden h-32">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100 }}
                    animate={{ y: 200 }}
                    transition={{ duration: 1, delay: i * 0.05, ease: "linear" }}
                    className="w-4 bg-white opacity-20"
                  />
                ))}
              </div>
              <p className="mt-4 font-mono text-red-400 font-bold tracking-widest uppercase">Shredding...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleCopy}
          disabled={!text || isShredding}
          className="p-4 bg-white border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-neutral-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Copy size={20} /> Copy to Clipboard
        </button>
        <button
          onClick={handleShred}
          disabled={!text || isShredding}
          className="p-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Trash2 size={20} /> Shred Now
        </button>
      </div>
    </div>
  );
}
