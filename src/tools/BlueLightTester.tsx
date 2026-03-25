import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function BlueLightTester() {
  const [warmth, setWarmth] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // We apply the filter to the whole screen using a fixed overlay
  // when isActive is true.

  return (
    <div className="space-y-8 max-w-md mx-auto py-8 relative z-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Blue Light Filter</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Test how different screen tints look for late-night reading.</p>
      </div>

      <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">Enable Filter</span>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${isActive ? 'bg-amber-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className={`space-y-4 transition-opacity ${isActive ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
            <Sun size={18} />
            <span>Intensity</span>
            <Moon size={18} />
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={warmth}
            onChange={(e) => setWarmth(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="text-center text-xs font-medium text-amber-600 dark:text-amber-500">
            {warmth}% Warmth
          </div>
        </div>
      </div>

      <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Sample Reading Text</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="mt-2">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
      </div>

      {/* The actual overlay that tints the screen */}
      {isActive && (
        <div
          className="fixed inset-0 pointer-events-none z-[100] mix-blend-multiply transition-opacity duration-300"
          style={{
            backgroundColor: `rgba(255, 150, 0, ${warmth / 100})`,
          }}
        />
      )}
    </div>
  );
}
