import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Grid, Heart, Shield, User, LogOut, Coffee, Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import AuthModal from "./AuthModal";
import { useTheme } from "./ThemeProvider";
import AdBanner from "./AdBanner";

export default function Layout() {
  const location = useLocation();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Tools", path: "/tools", icon: Grid },
    { name: "Well-Being", path: "/well-being", icon: Heart },
    { name: "Security", path: "/security", icon: Shield },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pb-16 md:pb-0 md:pl-20 transition-colors duration-200">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-r border-neutral-200 dark:border-neutral-800 z-50 py-6 items-center justify-between shadow-sm transition-colors duration-200">
        <div className="flex flex-col items-center w-full">
          <div className="font-black text-xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-8">OMAX</div>
          <div className="flex flex-col gap-6 w-full px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
                    isActive ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <Icon size={24} />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Profile Desktop */}
        <div className="w-full px-2 flex flex-col gap-4">
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            <span className="text-[10px] font-medium text-center">Theme</span>
          </button>

          <a
            href="https://www.buymeacoffee.com/peterdamiano"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30"
            title="Buy Me a Coffee"
          >
            <Coffee size={24} />
            <span className="text-[10px] font-medium text-center">Support</span>
          </a>
          
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              title="Sign Out"
            >
              <LogOut size={24} />
              <span className="text-[10px] font-medium truncate w-full text-center">Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              <User size={24} />
              <span className="text-[10px] font-medium">Sign In</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Header (for User Profile) */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40 shadow-sm transition-colors duration-200">
        <div className="font-black text-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">OmaxTool</div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="https://www.buymeacoffee.com/peterdamiano"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-full text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
            title="Buy Me a Coffee"
          >
            <Coffee size={18} />
          </a>
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              <User size={16} />
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto md:max-w-4xl p-4 md:p-8">
        <Outlet />
        <AdBanner />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-50 pb-safe transition-colors duration-200">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-neutral-500 dark:text-neutral-400"
                )}
              >
                <Icon size={20} className={cn(isActive && "fill-blue-100 dark:fill-blue-900/50")} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
