import { useState, useEffect } from "react";
import { Droplets, Plus, Minus, Trash2 } from "lucide-react";

export default function HydrationTracker() {
  const [glasses, setGlasses] = useState(0);
  const goal = 8; // 8 glasses a day

  useEffect(() => {
    const saved = localStorage.getItem("hydration");
    const savedDate = localStorage.getItem("hydrationDate");
    const today = new Date().toDateString();

    if (savedDate === today && saved) {
      setGlasses(parseInt(saved, 10));
    } else {
      setGlasses(0);
      localStorage.setItem("hydrationDate", today);
    }
  }, []);

  const updateGlasses = (newAmount: number) => {
    const validAmount = Math.max(0, newAmount);
    setGlasses(validAmount);
    localStorage.setItem("hydration", validAmount.toString());
    localStorage.setItem("hydrationDate", new Date().toDateString());
  };

  const progress = Math.min(100, (glasses / goal) * 100);

  return (
    <div className="space-y-8 max-w-md mx-auto text-center py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Daily Hydration</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Track your water intake. Goal: {goal} glasses.</p>
      </div>

      <div className="relative w-48 h-64 mx-auto bg-blue-50 dark:bg-blue-950/30 rounded-b-3xl rounded-t-lg border-4 border-blue-100 dark:border-blue-900/50 overflow-hidden flex items-end justify-center pb-4 shadow-inner">
        <div
          className="absolute bottom-0 left-0 right-0 bg-blue-400 dark:bg-blue-600 transition-all duration-500 ease-in-out opacity-80"
          style={{ height: `${progress}%` }}
        >
          {/* Simple CSS wave effect could go here */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-blue-300 dark:bg-blue-500 opacity-50 rounded-t-full transform -translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <Droplets size={48} className={glasses >= goal / 2 ? "text-white" : "text-blue-500 dark:text-blue-400"} />
          <span className={`text-4xl font-bold mt-2 ${glasses >= goal / 2 ? "text-white" : "text-blue-600 dark:text-blue-400"}`}>
            {glasses}<span className="text-xl opacity-70">/{goal}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => updateGlasses(glasses - 1)}
          disabled={glasses === 0}
          className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors shadow-sm"
        >
          <Minus size={24} />
        </button>
        
        <button
          onClick={() => updateGlasses(glasses + 1)}
          className="w-20 h-20 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center text-white transition-transform active:scale-95 shadow-lg"
        >
          <Plus size={36} />
        </button>
      </div>

      <div className="pt-8">
        <button
          onClick={() => updateGlasses(0)}
          className="text-sm text-neutral-400 hover:text-red-500 dark:hover:text-red-400 flex items-center justify-center gap-2 mx-auto transition-colors"
        >
          <Trash2 size={16} /> Reset Today
        </button>
      </div>
    </div>
  );
}
