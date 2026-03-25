import React, { useState, useRef } from "react";
import { Upload, Download, ShieldCheck, AlertTriangle } from "lucide-react";

export default function MetadataStripper() {
  const [image, setImage] = useState<string | null>(null);
  const [isStripped, setIsStripped] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target?.result as string);
        setIsStripped(false);
        
        // Draw to canvas immediately to strip metadata
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            setIsStripped(true);
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvasRef.current || !isStripped) return;
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "stripped-image.jpg";
    // Exporting from canvas removes EXIF data natively in browsers
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex items-start gap-3 text-sm text-blue-800 dark:text-blue-400">
        <ShieldCheck className="shrink-0 mt-0.5" size={18} />
        <p>Photos often contain hidden metadata (EXIF) like GPS location, camera model, and date. Upload a photo here to strip all metadata before sharing it online.</p>
      </div>

      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-2xl cursor-pointer bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 text-neutral-400 dark:text-neutral-500 mb-3" />
            <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400"><span className="font-semibold text-neutral-700 dark:text-neutral-300">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">JPG, PNG, HEIC</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="relative w-full h-64 bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
            <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
            <button onClick={() => { setImage(null); setIsStripped(false); }} className="absolute top-2 right-2 bg-white/80 dark:bg-black/60 backdrop-blur p-2 rounded-full text-xs font-medium shadow-sm hover:bg-white dark:hover:bg-black text-neutral-900 dark:text-neutral-50">
              Change Photo
            </button>
          </div>

          {isStripped ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-xl text-center font-medium flex items-center justify-center gap-2 border border-green-100 dark:border-green-800">
              <ShieldCheck size={20} /> Metadata successfully stripped!
            </div>
          ) : (
            <div className="p-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-xl text-center font-medium flex items-center justify-center gap-2 border border-amber-100 dark:border-amber-800">
              <AlertTriangle size={20} /> Processing image...
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={!isStripped}
            className="w-full py-4 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:text-neutral-500 dark:disabled:text-neutral-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} /> Download Safe Image
          </button>
          <p className="text-xs text-center text-neutral-400 dark:text-neutral-500">Processed entirely on your device. No data is sent to any server.</p>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}
