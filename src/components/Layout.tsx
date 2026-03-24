import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Grid, Heart, Shield } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Tools", path: "/tools", icon: Grid },
    { name: "Well-Being", path: "/well-being", icon: Heart },
    { name: "Security", path: "/security", icon: Shield },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 pb-16 md:pb-0 md:pl-20">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-20 bg-white border-r border-neutral-200 z-50 py-6 items-center gap-8">
        <div className="font-bold text-xl text-primary">OT</div>
        <div className="flex flex-col gap-6 mt-4">
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
      </nav>

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
    </div>
  );
}
