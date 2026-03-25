import React, { useState } from 'react';
import { Share2, Gift, Copy, Check } from 'lucide-react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function ShareRewards() {
  const [copied, setCopied] = useState(false);
  const shareLink = window.location.origin;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'OmaxTool',
          text: 'Check out these amazing tools!',
          url: shareLink,
        });
        await addPoints();
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    addPoints();
    setTimeout(() => setCopied(false), 2000);
  };

  const addPoints = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        points: increment(10)
      });
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl text-white shadow-lg space-y-4">
      <div className="flex items-center gap-3">
        <Gift className="w-8 h-8" />
        <h3 className="text-xl font-bold">Share & Earn!</h3>
      </div>
      <p className="text-blue-50 text-sm">Share OmaxTool with friends and earn 10 points per share!</p>
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors"
        >
          <Share2 size={18} /> Share
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 bg-blue-700 text-white font-semibold px-4 py-3 rounded-xl hover:bg-blue-800 transition-colors"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );
}
