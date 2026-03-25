import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Link as LinkIcon, Wifi, Type } from "lucide-react";

export default function QrGenerator() {
  const [type, setType] = useState<"text" | "url" | "wifi">("url");
  const [content, setContent] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  const qrRef = useRef<SVGSVGElement>(null);

  const getQrValue = () => {
    if (type === "wifi") {
      return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden};;`;
    }
    return content;
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="space-y-8 max-w-md mx-auto">
      <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
        <button onClick={() => setType("url")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${type === "url" ? "bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-neutral-50" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"}`}>
          <LinkIcon size={16} /> URL
        </button>
        <button onClick={() => setType("text")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${type === "text" ? "bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-neutral-50" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"}`}>
          <Type size={16} /> Text
        </button>
        <button onClick={() => setType("wifi")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${type === "wifi" ? "bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-neutral-50" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"}`}>
          <Wifi size={16} /> Wi-Fi
        </button>
      </div>

      <div className="space-y-4">
        {type === "wifi" ? (
          <>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Network Name (SSID)</label>
              <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Password</label>
              <input type="password" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Encryption</label>
                <select value={wifiEncryption} onChange={(e) => setWifiEncryption(e.target.value)} className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50">
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input type="checkbox" id="hidden" checked={wifiHidden} onChange={(e) => setWifiHidden(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700" />
                <label htmlFor="hidden" className="text-sm text-neutral-600 dark:text-neutral-400">Hidden Network</label>
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{type === "url" ? "Website URL" : "Text Content"}</label>
            {type === "text" ? (
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-600" placeholder="Enter text here..." />
            ) : (
              <input type="url" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-600" placeholder="https://example.com" />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl">
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <QRCodeSVG
            value={getQrValue() || "https://omnitool.app"}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            ref={qrRef}
          />
        </div>
        <button
          onClick={downloadQR}
          disabled={!getQrValue()}
          className="w-full py-3 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:text-neutral-500 dark:disabled:text-neutral-400 disabled:cursor-not-allowed text-white dark:text-neutral-900 font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          <Download size={18} /> Download QR Code
        </button>
      </div>
    </div>
  );
}
