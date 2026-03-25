import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Loader2, Copy, Check, Settings2 } from 'lucide-react';

export default function AiSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState('Professional');

  const handleSummarize = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setSummary('');
    
    try {
      // Initialize Gemini API
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing. Please set it in your environment variables.");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Please provide a ${tone} summary of the following text. Highlight the main points:\n\n${text}`,
      });
      
      if (response.text) {
        setSummary(response.text);
      } else {
        throw new Error("Failed to generate summary.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while summarizing the text.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg">
            <Sparkles size={20} />
          </div>
          <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">AI Text Summarizer</h2>
        </div>
        <p className="text-indigo-700/80 dark:text-indigo-300/80 text-sm">
          Paste any long article, email, or document below, and our AI will extract the most important points for you instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here (e.g., an article, meeting notes, or an email)..."
            className="w-full h-48 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 dark:placeholder-neutral-500"
          />
          <div className="absolute bottom-4 right-4 text-xs text-neutral-400 dark:text-neutral-500 font-medium">
            {text.length} characters
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            <Settings2 size={16} className="text-neutral-500 ml-2" />
            <select 
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-transparent text-sm font-medium text-neutral-700 dark:text-neutral-300 py-1.5 pr-8 pl-2 outline-none cursor-pointer"
            >
              <option value="Professional">Professional (Pro)</option>
              <option value="Casual">Casual</option>
              <option value="Concise">Concise (Pro)</option>
              <option value="Detailed">Detailed (Pro)</option>
            </select>
          </div>

          <button
            onClick={handleSummarize}
            disabled={loading || !text.trim()}
            className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Summarize Text
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50 text-sm">
          {error}
        </div>
      )}

      {summary && (
        <div className="mt-8 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Summary</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm prose prose-indigo dark:prose-invert max-w-none">
            {summary.split('\n').map((paragraph, idx) => (
              <p key={idx} className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-2 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
