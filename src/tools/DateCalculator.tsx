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
        <h3 className="text-lg font-semibold text-neutral-800">How many days until/since?</h3>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Select Date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {isValidTarget && diffDays !== null && (
          <div className={`p-6 rounded-2xl text-center ${diffDays > 0 ? 'bg-blue-50 border border-blue-100' : 'bg-amber-50 border border-amber-100'}`}>
            <div className="text-4xl font-bold text-neutral-900 mb-2">
              {Math.abs(diffDays)} {Math.abs(diffDays) === 1 ? 'day' : 'days'}
            </div>
            <p className="text-sm font-medium text-neutral-600">
              {diffDays > 0 ? 'until' : 'since'} {format(parsedTarget, "MMMM do, yyyy")}
            </p>
          </div>
        )}
      </div>

      <hr className="border-neutral-200" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Add days to today</h3>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Days to add</label>
          <input
            type="number"
            value={daysToAdd}
            onChange={(e) => setDaysToAdd(Number(e.target.value))}
            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="p-6 bg-neutral-100 rounded-2xl text-center">
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            {format(addedDate, "EEEE, MMMM do, yyyy")}
          </div>
          <p className="text-sm text-neutral-500">
            is {daysToAdd} days from today
          </p>
        </div>
      </div>
    </div>
  );
}
