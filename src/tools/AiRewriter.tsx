import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Loader2, Copy, Check, Type } from 'lucide-react';

export default function AiRewriter() {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRewrite = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing. Please set it in your environment variables.");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Rewrite the following text to make it sound more ${tone}. Fix any grammar or spelling mistakes, and improve the overall flow. Do not add any extra commentary, just provide the rewritten text:\n\n${text}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      if (response.text) {
        setResult(response.text);
      } else {
        throw new Error("Failed to generate rewritten text.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while rewriting the text.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-600 text-white rounded-lg">
            <Type size={20} />
          </div>
          <h2 className="text-xl font-bold text-purple-900">AI Text Rewriter</h2>
        </div>
        <p className="text-purple-700/80 text-sm">
          Fix grammar, improve flow, and change the tone of your emails, essays, or messages instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your rough draft here..."
            className="w-full h-48 p-4 bg-white border border-neutral-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow text-neutral-700"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-auto flex-1">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="professional">Professional & Formal</option>
              <option value="casual">Casual & Friendly</option>
              <option value="persuasive">Persuasive & Confident</option>
              <option value="concise">Concise & Direct</option>
              <option value="creative">Creative & Engaging</option>
            </select>
          </div>
          <button
            onClick={handleRewrite}
            disabled={loading || !text.trim()}
            className="w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Rewriting...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Rewrite Text
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">Rewritten Result</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm prose prose-purple max-w-none">
            {result.split('\n').map((paragraph, idx) => (
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
