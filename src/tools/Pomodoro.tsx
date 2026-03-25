import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee, Briefcase } from "lucide-react";

export default function Pomodoro() {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a sound or show notification here in a real app
      if (mode === "work") {
        setMode("break");
        setTimeLeft(5 * 60);
      } else {
        setMode("work");
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: "work" | "break") => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === "work" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = mode === "work" ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 max-w-md mx-auto py-8">
      <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl w-full">
        <button
          onClick={() => switchMode("work")}
          className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${mode === "work" ? "bg-white dark:bg-neutral-700 shadow-sm text-red-600 dark:text-red-400" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
        >
          <Briefcase size={18} /> Focus
        </button>
        <button
          onClick={() => switchMode("break")}
          className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${mode === "break" ? "bg-white dark:bg-neutral-700 shadow-sm text-green-600 dark:text-green-400" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
        >
          <Coffee size={18} /> Break
        </button>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-neutral-100 dark:text-neutral-800" />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
            className={`transition-all duration-1000 ease-linear ${mode === "work" ? "text-red-500 dark:text-red-400" : "text-green-500 dark:text-green-400"}`}
          />
        </svg>
        <div className="text-6xl font-bold text-neutral-800 dark:text-neutral-100 font-mono tracking-tighter">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTimer}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 text-white ${mode === "work" ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700" : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"}`}
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}
