import { useState } from "react";
import { jsPDF } from "jspdf";
import { Download, FileText } from "lucide-react";

export default function PdfConverter() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Document");

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const maxLineWidth = pageWidth - margin * 2;

    doc.setFontSize(16);
    doc.text(title, margin, margin);

    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(text, maxLineWidth);
    doc.text(splitText, margin, margin + 10);

    doc.save(`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto flex flex-col h-[60vh]">
      <div className="flex items-center gap-4">
        <FileText className="text-blue-500" size={24} />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title"
          className="flex-1 p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-lg"
        />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here to convert to PDF..."
        className="flex-1 w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
      />

      <button
        onClick={generatePDF}
        disabled={!text.trim()}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
      >
        <Download size={20} /> Download PDF
      </button>
    </div>
  );
}
