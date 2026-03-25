import React, { useState, useEffect } from 'react';
import { Plus, Trash2, DollarSign, Calendar, CreditCard } from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
}

export default function SubscriptionManager() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    try {
      const saved = localStorage.getItem('omaxtool-subscriptions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [nextBillingDate, setNextBillingDate] = useState('');

  useEffect(() => {
    localStorage.setItem('omaxtool-subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !nextBillingDate) return;

    const newSub: Subscription = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      billingCycle,
      nextBillingDate,
    };

    setSubscriptions([...subscriptions, newSub]);
    setName('');
    setAmount('');
    setNextBillingDate('');
  };

  const handleDelete = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const calculateMonthlyTotal = () => {
    return subscriptions.reduce((total, sub) => {
      return total + (sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount);
    }, 0);
  };

  const calculateYearlyTotal = () => {
    return subscriptions.reduce((total, sub) => {
      return total + (sub.billingCycle === 'monthly' ? sub.amount * 12 : sub.amount);
    }, 0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-3xl text-white shadow-sm">
          <p className="text-blue-100 font-medium mb-1">Monthly Cost</p>
          <h2 className="text-4xl font-bold">${calculateMonthlyTotal().toFixed(2)}</h2>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-3xl text-white shadow-sm">
          <p className="text-indigo-100 font-medium mb-1">Yearly Cost</p>
          <h2 className="text-4xl font-bold">${calculateYearlyTotal().toFixed(2)}</h2>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-neutral-50">
          <Plus size={20} className="text-blue-500 dark:text-blue-400" />
          Add Subscription
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Service Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Netflix, Spotify"
              className="w-full p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Amount ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <DollarSign size={16} className="text-neutral-400 dark:text-neutral-500" />
              </div>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-9 p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Billing Cycle</label>
            <select
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value as 'monthly' | 'yearly')}
              className="w-full p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Next Billing Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-neutral-400 dark:text-neutral-500" />
              </div>
              <input
                type="date"
                required
                value={nextBillingDate}
                onChange={(e) => setNextBillingDate(e.target.value)}
                className="w-full pl-9 p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50"
              />
            </div>
          </div>
          <div className="sm:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full py-3 bg-neutral-900 dark:bg-blue-600 text-white font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-blue-700 transition-colors"
            >
              Add Subscription
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2 dark:text-neutral-50">
          <CreditCard size={20} className="text-indigo-500 dark:text-indigo-400" />
          Active Subscriptions ({subscriptions.length})
        </h3>
        
        {subscriptions.length === 0 ? (
          <div className="text-center py-10 bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl border border-neutral-100 dark:border-neutral-800">
            <p className="text-neutral-500 dark:text-neutral-400">No subscriptions added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime()).map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow transition-shadow">
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-50">{sub.name}</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <Calendar size={14} /> Next: {new Date(sub.nextBillingDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-neutral-900 dark:text-neutral-50">${sub.amount.toFixed(2)}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{sub.billingCycle}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
