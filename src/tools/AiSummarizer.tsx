import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';

export default function AiSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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
        contents: `Please provide a concise, well-structured summary of the following text. Highlight the main points:\n\n${text}`,
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
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 text-white rounded-lg">
            <Sparkles size={20} />
          </div>
          <h2 className="text-xl font-bold text-indigo-900">AI Text Summarizer</h2>
        </div>
        <p className="text-indigo-700/80 text-sm">
          Paste any long article, email, or document below, and our AI will extract the most important points for you instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here (e.g., an article, meeting notes, or an email)..."
            className="w-full h-48 p-4 bg-white border border-neutral-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-neutral-700"
          />
          <div className="absolute bottom-4 right-4 text-xs text-neutral-400 font-medium">
            {text.length} characters
          </div>
        </div>

        <button
          onClick={handleSummarize}
          disabled={loading || !text.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow"
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

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
          {error}
        </div>
      )}

      {summary && (
        <div className="mt-8 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">Summary</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm prose prose-indigo max-w-none">
            {summary.split('\n').map((paragraph, idx) => (
              <p key={idx} className="text-neutral-700 leading-relaxed mb-2 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
