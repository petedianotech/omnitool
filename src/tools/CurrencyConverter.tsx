import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  // Mock rates for demonstration
  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 150.5,
    AUD: 1.53,
    CAD: 1.35,
  };

  const converted = (amount / rates[from]) * rates[to];

  // Visual buying power equivalents
  const coffeePriceUSD = 4;
  const coffees = Math.floor((amount / rates[from]) / coffeePriceUSD);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="flex flex-col gap-4 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full text-3xl font-bold bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 focus:border-blue-500 dark:focus:border-blue-400 outline-none pb-2 text-neutral-900 dark:text-neutral-50"
            min="0"
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium text-neutral-900 dark:text-neutral-50"
          >
            {Object.keys(rates).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          
          <button
            onClick={() => { setFrom(to); setTo(from); }}
            className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            <ArrowRightLeft size={20} />
          </button>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium text-neutral-900 dark:text-neutral-50"
          >
            {Object.keys(rates).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="text-center py-6">
        <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
          {converted.toFixed(2)} {to}
        </div>
        <div className="text-neutral-500 dark:text-neutral-400 mt-2">
          1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}
        </div>
      </div>

      {coffees > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl flex items-center gap-4">
          <div className="text-3xl">☕</div>
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-100">Visual Buying Power</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">This is roughly equivalent to {coffees} coffee{coffees > 1 ? 's' : ''}.</p>
          </div>
        </div>
      )}
    </div>
  );
}
