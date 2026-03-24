import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Square } from "lucide-react";

export default function BreathTimer() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let phaseTimeout: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      const cycle = () => {
        setPhase("inhale");
        phaseTimeout = setTimeout(() => {
          setPhase("hold");
          phaseTimeout = setTimeout(() => {
            setPhase("exhale");
            phaseTimeout = setTimeout(cycle, 4000); // Exhale for 4s
          }, 4000); // Hold for 4s
        }, 4000); // Inhale for 4s
      };

      if (phase === "idle") cycle();

    } else if (timeLeft === 0) {
      setIsActive(false);
      setPhase("idle");
      setTimeLeft(60);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(phaseTimeout);
    };
  }, [isActive, timeLeft, phase]);

  const toggleTimer = () => {
    if (isActive) {
      setIsActive(false);
      setPhase("idle");
      setTimeLeft(60);
    } else {
      setIsActive(true);
    }
  };

  const getScale = () => {
    switch (phase) {
      case "inhale": return 1.5;
      case "hold": return 1.5;
      case "exhale": return 1;
      default: return 1;
    }
  };

  const getMessage = () => {
    switch (phase) {
      case "inhale": return "Breathe In...";
      case "hold": return "Hold...";
      case "exhale": return "Breathe Out...";
      default: return "Ready to relax?";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-800">{getMessage()}</h2>
        <p className="text-neutral-500 font-mono">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
          animate={{ scale: getScale() }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-xl"
        />
        <motion.div
          animate={{ scale: getScale() }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute w-24 h-24 bg-blue-400 rounded-full opacity-80"
        />
        <div className="absolute w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white font-bold">
          {phase !== "idle" && phase.toUpperCase()}
        </div>
      </div>

      <button
        onClick={toggleTimer}
        className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-full shadow-lg transition-all flex items-center gap-3"
      >
        {isActive ? <><Square size={20} fill="currentColor" /> Stop</> : <><Play size={20} fill="currentColor" /> Start 1-Min Session</>}
      </button>
    </div>
  );
}
