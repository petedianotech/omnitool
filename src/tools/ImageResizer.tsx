import React, { useState, useRef } from "react";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target?.result as string);
        setWidth(img.width);
        setHeight(img.height);
        setOriginalRatio(img.width / img.height);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainRatio) setHeight(Math.round(val / originalRatio));
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainRatio) setWidth(Math.round(val * originalRatio));
  };

  const handleDownload = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const link = document.createElement("a");
      link.download = "resized-image.jpg";
      link.href = canvas.toDataURL("image/jpeg", 0.9);
      link.click();
    };
    img.src = image;
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-2xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 text-neutral-400 mb-3" />
            <p className="mb-2 text-sm text-neutral-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-neutral-400">SVG, PNG, JPG or GIF</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="relative w-full h-48 bg-neutral-100 rounded-2xl overflow-hidden flex items-center justify-center">
            <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
            <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-white/80 backdrop-blur p-2 rounded-full text-xs font-medium shadow-sm hover:bg-white">
              Change
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="maintainRatio"
              checked={maintainRatio}
              onChange={(e) => setMaintainRatio(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="maintainRatio" className="text-sm text-neutral-600">Maintain aspect ratio</label>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-4">
            <button onClick={() => { handleWidthChange(1080); handleHeightChange(1080); }} className="p-2 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 rounded-lg">Instagram Square</button>
            <button onClick={() => { handleWidthChange(1920); handleHeightChange(1080); }} className="p-2 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 rounded-lg">1080p HD</button>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} /> Download Resized Image
          </button>
          <p className="text-xs text-center text-neutral-400">Processed entirely on your device. No data is sent to any server.</p>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}
