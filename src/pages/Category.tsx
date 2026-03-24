import { useParams, Link, useNavigate } from "react-router-dom";
import { categories, tools } from "../lib/data";
import * as Icons from "lucide-react";

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Category not found</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600 hover:underline">Go Home</button>
      </div>
    );
  }

  const categoryTools = category.tools.map((toolId) => tools.find((t) => t.id === toolId)).filter(Boolean) as typeof tools;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-4">
          <Icons.ArrowLeft size={16} className="mr-1" /> Back
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Tools for {category.name}</h1>
        <p className="text-neutral-500">Curated everyday solvers for your specific needs.</p>
      </header>

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
  );
}
