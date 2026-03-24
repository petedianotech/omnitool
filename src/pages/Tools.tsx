import { Link } from "react-router-dom";
import { tools } from "../lib/data";
import * as Icons from "lucide-react";

export default function Tools({ filterCategory }: { filterCategory?: string }) {
  const groupedTools = tools.reduce((acc, tool) => {
    if (filterCategory && tool.category !== filterCategory) return acc;
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{filterCategory || "All Tools"}</h1>
        <p className="text-neutral-500">Explore the complete suite of everyday solvers.</p>
      </header>

      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-800 border-b border-neutral-200 pb-2">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryTools.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Icons.Wrench;
              return (
                <Link
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-all active:scale-95"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-4">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{tool.name}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-1">{tool.description}</p>
                  </div>
                  <Icons.ChevronRight size={20} className="text-neutral-300" />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
