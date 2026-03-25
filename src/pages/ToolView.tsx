import React, { Suspense, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tools } from "../lib/data";
import * as Icons from "lucide-react";
import { useFavorites } from "../lib/useFavorites";

// Lazy load tools to keep the bundle small
const CurrencyConverter = lazy(() => import("../tools/CurrencyConverter"));
const TipSplitter = lazy(() => import("../tools/TipSplitter"));
const TimeZoneMeeter = lazy(() => import("../tools/TimeZoneMeeter"));
const DateCalculator = lazy(() => import("../tools/DateCalculator"));
const ImageResizer = lazy(() => import("../tools/ImageResizer"));
const TextCleaner = lazy(() => import("../tools/TextCleaner"));
const PdfConverter = lazy(() => import("../tools/PdfConverter"));
const QrGenerator = lazy(() => import("../tools/QrGenerator"));
const BreathTimer = lazy(() => import("../tools/BreathTimer"));
const Pomodoro = lazy(() => import("../tools/Pomodoro"));
const HydrationTracker = lazy(() => import("../tools/HydrationTracker"));
const BlueLightTester = lazy(() => import("../tools/BlueLightTester"));
const PasswordGen = lazy(() => import("../tools/PasswordGen"));
const DigitalShredder = lazy(() => import("../tools/DigitalShredder"));
const MetadataStripper = lazy(() => import("../tools/MetadataStripper"));

const toolComponents: Record<string, React.ComponentType> = {
  "currency-converter": CurrencyConverter,
  "tip-split": TipSplitter,
  "timezone-meeter": TimeZoneMeeter,
  "date-calculator": DateCalculator,
  "image-resizer": ImageResizer,
  "text-cleaner": TextCleaner,
  "pdf-converter": PdfConverter,
  "qr-generator": QrGenerator,
  "breath-timer": BreathTimer,
  "pomodoro": Pomodoro,
  "hydration-tracker": HydrationTracker,
  "bluelight-tester": BlueLightTester,
  "password-gen": PasswordGen,
  "digital-shredder": DigitalShredder,
  "metadata-stripper": MetadataStripper,
};

export default function ToolView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const tool = tools.find((t) => t.id === id);

  if (!tool) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Tool not found</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600 hover:underline">Go Home</button>
      </div>
    );
  }

  const ToolComponent = toolComponents[tool.id];
  const isFav = isFavorite(tool.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20">
      <header className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors">
            <Icons.ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{tool.name}</h1>
            <p className="text-sm text-neutral-500">{tool.category}</p>
          </div>
        </div>
        <button 
          onClick={() => toggleFavorite(tool.id)}
          className={`p-2 rounded-full transition-colors ${isFav ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' : 'text-neutral-400 hover:bg-neutral-100'}`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Icons.Star size={24} className={isFav ? "fill-current" : ""} />
        </button>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-4 sm:p-6 min-h-[50vh]">
        <Suspense fallback={<div className="flex justify-center items-center h-40"><Icons.Loader2 className="animate-spin text-blue-500" size={32} /></div>}>
          {ToolComponent ? <ToolComponent /> : <div className="text-center py-10 text-neutral-500">Tool under construction.</div>}
        </Suspense>
      </div>
    </div>
  );
}
