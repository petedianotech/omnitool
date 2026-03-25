import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Grid, Heart, Shield, User, LogOut, Coffee } from "lucide-react";
import { cn } from "../lib/utils";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import AuthModal from "./AuthModal";

export default function Layout() {
  const location = useLocation();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Tools", path: "/tools", icon: Grid },
    { name: "Well-Being", path: "/well-being", icon: Heart },
    { name: "Security", path: "/security", icon: Shield },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 pb-16 md:pb-0 md:pl-20">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-20 bg-white/80 backdrop-blur-md border-r border-neutral-200 z-50 py-6 items-center justify-between shadow-sm">
        <div className="flex flex-col items-center w-full">
          <div className="font-black text-xl bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">OMAX</div>
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
                    isActive ? "text-blue-600 bg-blue-50" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
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
          <a
            href="https://www.buymeacoffee.com/peterdamiano"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors text-amber-600 hover:bg-amber-50"
            title="Buy Me a Coffee"
          >
            <Coffee size={24} />
            <span className="text-[10px] font-medium text-center">Support</span>
          </a>
          
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors text-neutral-500 hover:text-red-600 hover:bg-red-50"
              title="Sign Out"
            >
              <LogOut size={24} />
              <span className="text-[10px] font-medium truncate w-full text-center">Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors text-neutral-500 hover:text-blue-600 hover:bg-blue-50"
            >
              <User size={24} />
              <span className="text-[10px] font-medium">Sign In</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Header (for User Profile) */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
        <div className="font-black text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">OmaxTool</div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.buymeacoffee.com/peterdamiano"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-full text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors"
            title="Buy Me a Coffee"
          >
            <Coffee size={18} />
          </a>
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 p-2 rounded-full text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
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
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50 pb-safe">
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
                  isActive ? "text-blue-600" : "text-neutral-500"
                )}
              >
                <Icon size={20} className={cn(isActive && "fill-blue-100")} />
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
