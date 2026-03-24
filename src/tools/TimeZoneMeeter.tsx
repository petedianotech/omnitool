import { useState, useEffect } from "react";

export default function TimeZoneMeeter() {
  const [localTime, setLocalTime] = useState(new Date());
  const [offsetHours, setOffsetHours] = useState(0); // Offset from local

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const remoteTime = new Date(localTime.getTime() + offsetHours * 60 * 60 * 1000);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isWorkingHours = (date: Date) => {
    const hours = date.getHours();
    return hours >= 9 && hours < 18;
  };

  const localWorking = isWorkingHours(localTime);
  const remoteWorking = isWorkingHours(remoteTime);
  const isGoodMeetingTime = localWorking && remoteWorking;

  return (
    <div className="space-y-8 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-6 rounded-2xl text-center transition-colors ${localWorking ? 'bg-blue-50 border border-blue-100' : 'bg-neutral-100'}`}>
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Your Time</h3>
          <div className="text-3xl font-bold text-neutral-900">{formatTime(localTime)}</div>
          <p className="text-xs mt-2 text-neutral-400">{localWorking ? 'Working Hours' : 'Outside Hours'}</p>
        </div>
        
        <div className={`p-6 rounded-2xl text-center transition-colors ${remoteWorking ? 'bg-green-50 border border-green-100' : 'bg-neutral-100'}`}>
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Their Time</h3>
          <div className="text-3xl font-bold text-neutral-900">{formatTime(remoteTime)}</div>
          <p className="text-xs mt-2 text-neutral-400">{remoteWorking ? 'Working Hours' : 'Outside Hours'}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-neutral-700">Time Difference</label>
          <span className="font-bold text-blue-600">
            {offsetHours > 0 ? '+' : ''}{offsetHours} hours
          </span>
        </div>
        
        <input
          type="range"
          min="-12"
          max="12"
          step="1"
          value={offsetHours}
          onChange={(e) => setOffsetHours(Number(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-neutral-400">
          <span>-12h</span>
          <span>Same Time</span>
          <span>+12h</span>
        </div>
      </div>

      {isGoodMeetingTime ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-xl text-center font-medium flex items-center justify-center gap-2">
          <span>✅</span> This is a great time for a meeting!
        </div>
      ) : (
        <div className="p-4 bg-amber-100 text-amber-800 rounded-xl text-center font-medium flex items-center justify-center gap-2">
          <span>⚠️</span> Someone might be asleep or off work.
        </div>
      )}
    </div>
  );
}
