import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Star } from "lucide-react";
import { tools, categories } from "../lib/data";
import * as Icons from "lucide-react";
import { useFavorites } from "../lib/useFavorites";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites } = useFavorites();

  const filteredTools = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteTools = tools.filter((t) => favorites.includes(t.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="hidden md:block space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">OmaxTool</h1>
        <p className="text-neutral-500 font-medium">Everyday solvers for everyone.</p>
      </header>

      {/* Universal Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-neutral-200 rounded-2xl leading-5 bg-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow"
          placeholder="Type 'tip', 'convert', or 'password'..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTools.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Icons.Wrench;
              return (
                <Link
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md hover:border-blue-200 transition-all active:scale-95 group"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{tool.name}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-1">{tool.description}</p>
                  </div>
                  <ChevronRight size={20} className="text-neutral-300" />
                </Link>
              );
            })}
            {filteredTools.length === 0 && (
              <p className="text-neutral-500 col-span-full py-8 text-center">No tools found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Favorites */}
          {favoriteTools.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                Favorites
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {favoriteTools.map((tool) => {
                  const Icon = (Icons as any)[tool.icon] || Icons.Wrench;
                  return (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.id}`}
                      className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-yellow-100 hover:shadow-md hover:border-yellow-300 transition-all active:scale-95 text-center gap-3 group"
                    >
                      <div className="p-3 bg-gradient-to-br from-yellow-50 to-orange-50 text-yellow-600 rounded-xl group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-medium text-neutral-700 line-clamp-2">{tool.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Access */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.slice(0, 4).map((tool) => {
                const Icon = (Icons as any)[tool.icon] || Icons.Wrench;
                return (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.id}`}
                    className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md hover:border-blue-200 transition-all active:scale-95 text-center gap-3 group"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-medium text-neutral-700 line-clamp-2">{tool.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Categories / Groups */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tailored For You</h2>
            <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 snap-x">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="snap-start shrink-0 w-40 p-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                  <p className="text-xs text-neutral-500">{category.tools.length} tools</p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
