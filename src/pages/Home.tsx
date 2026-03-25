import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Star } from "lucide-react";
import { tools, categories } from "../lib/data";
import * as Icons from "lucide-react";
import { useFavorites } from "../lib/useFavorites";
import ShareRewards from "../components/ShareRewards";

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
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">OmaxTool</h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">Everyday solvers for everyone.</p>
      </header>

      {/* Universal Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl leading-5 bg-white dark:bg-neutral-900 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow"
          placeholder="Type 'tip', 'convert', or 'password'..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ShareRewards />

      {searchQuery ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold dark:text-neutral-50">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTools.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Icons.Wrench;
              return (
                <Link
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  className="flex items-center p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all active:scale-95 group"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-50">{tool.name}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{tool.description}</p>
                  </div>
                  <ChevronRight size={20} className="text-neutral-300 dark:text-neutral-600" />
                </Link>
              );
            })}
            {filteredTools.length === 0 && (
              <p className="text-neutral-500 dark:text-neutral-400 col-span-full py-8 text-center">No tools found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Favorites */}
          {favoriteTools.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-neutral-50">
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
                      className="flex flex-col items-center p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-900/50 hover:shadow-md hover:border-yellow-300 dark:hover:border-yellow-700 transition-all active:scale-95 text-center gap-3 group"
                    >
                      <div className="p-3 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 line-clamp-2">{tool.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Access */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold dark:text-neutral-50">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.slice(0, 4).map((tool) => {
                const Icon = (Icons as any)[tool.icon] || Icons.Wrench;
                return (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.id}`}
                    className="flex flex-col items-center p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all active:scale-95 text-center gap-3 group"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 line-clamp-2">{tool.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Categories / Groups */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text">Tailored For You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group relative p-6 bg-surface rounded-3xl shadow-sm border border-neutral-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">{category.name}</h3>
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {category.tools.length} tools
                    </div>
                  </div>
                  <p className="text-sm text-text-muted">Explore tools curated for {category.name.toLowerCase()}.</p>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
