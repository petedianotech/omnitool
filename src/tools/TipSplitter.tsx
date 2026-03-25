import { useState } from "react";

export default function TipSplitter() {
  const [bill, setBill] = useState(100);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(2);
  const [taxExclusive, setTaxExclusive] = useState(false);
  const [taxAmount, setTaxAmount] = useState(0);

  const baseForTip = taxExclusive ? bill : bill + taxAmount;
  const tipAmount = baseForTip * (tipPercent / 100);
  const total = bill + taxAmount + tipAmount;
  const perPerson = total / people;

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Bill Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-neutral-500 dark:text-neutral-400">$</span>
            <input
              type="number"
              value={bill || ""}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Tax Amount (Optional)</label>
          <div className="relative w-32">
            <span className="absolute left-3 top-2 text-neutral-500 dark:text-neutral-400">$</span>
            <input
              type="number"
              value={taxAmount || ""}
              onChange={(e) => setTaxAmount(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-neutral-900 dark:text-neutral-50"
            />
          </div>
        </div>

        {taxAmount > 0 && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="taxExclusive"
              checked={taxExclusive}
              onChange={(e) => setTaxExclusive(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
            />
            <label htmlFor="taxExclusive" className="text-sm text-neutral-600 dark:text-neutral-400">Calculate tip before tax</label>
          </div>
        )}

        <div className="pt-4">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Tip Percentage</label>
            <span className="font-bold text-blue-600 dark:text-blue-400">{tipPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={tipPercent}
            onChange={(e) => setTipPercent(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
          />
          <div className="flex justify-between text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            <span>0%</span>
            <span>15%</span>
            <span>30%</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Split Between</label>
            <span className="font-bold text-blue-600 dark:text-blue-400">{people} people</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-xl font-bold text-neutral-900 dark:text-neutral-50">-</button>
            <span className="flex-1 text-center text-xl font-medium text-neutral-900 dark:text-neutral-50">{people}</span>
            <button onClick={() => setPeople(people + 1)} className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-xl font-bold text-neutral-900 dark:text-neutral-50">+</button>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 dark:bg-blue-700 text-white p-6 rounded-2xl shadow-lg mt-8">
        <div className="flex justify-between items-end mb-4">
          <span className="text-blue-200 dark:text-blue-100">Total per person</span>
          <span className="text-4xl font-bold">${perPerson.toFixed(2)}</span>
        </div>
        <div className="border-t border-blue-500 dark:border-blue-600 pt-4 flex justify-between text-sm text-blue-100 dark:text-blue-50">
          <span>Total Bill: ${total.toFixed(2)}</span>
          <span>Total Tip: ${tipAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
