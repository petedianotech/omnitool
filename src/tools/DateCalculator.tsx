import { useState } from "react";
import { differenceInDays, format, addDays, isValid, parseISO } from "date-fns";

export default function DateCalculator() {
  const [targetDate, setTargetDate] = useState("");
  const [daysToAdd, setDaysToAdd] = useState(0);

  const today = new Date();
  const parsedTarget = parseISO(targetDate);
  const isValidTarget = isValid(parsedTarget);

  const diffDays = isValidTarget ? differenceInDays(parsedTarget, today) : null;
  const addedDate = addDays(today, daysToAdd);

  return (
    <div className="space-y-8 max-w-md mx-auto">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">How many days until/since?</h3>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Select Date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50"
          />
        </div>

        {isValidTarget && diffDays !== null && (
          <div className={`p-6 rounded-2xl text-center ${diffDays > 0 ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800' : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800'}`}>
            <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              {Math.abs(diffDays)} {Math.abs(diffDays) === 1 ? 'day' : 'days'}
            </div>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {diffDays > 0 ? 'until' : 'since'} {format(parsedTarget, "MMMM do, yyyy")}
            </p>
          </div>
        )}
      </div>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Add days to today</h3>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Days to add</label>
          <input
            type="number"
            value={daysToAdd}
            onChange={(e) => setDaysToAdd(Number(e.target.value))}
            className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50"
          />
        </div>

        <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-2xl text-center">
          <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">
            {format(addedDate, "EEEE, MMMM do, yyyy")}
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            is {daysToAdd} days from today
          </p>
        </div>
      </div>
    </div>
  );
}
