"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  BarChart,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Hikayeler",
      href: "/admin/stories",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Kategoriler",
      href: "/admin/categories",
      icon: <BarChart size={20} />,
    },
    {
      name: "Kullanıcılar",
      href: "/admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "Ayarlar",
      href: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r flex flex-col transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2
          className={cn(
            "font-bold text-lg transition-opacity duration-300",
            collapsed ? "opacity-0 w-0" : "opacity-100",
          )}
        >
          Admin Panel
        </h2>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-muted"
        >
          <ChevronRight
            size={20}
            className={cn(
              "transition-transform duration-300",
              collapsed ? "rotate-180" : "",
            )}
          />
        </button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted",
                )}
              >
                {item.icon}
                <span
                  className={cn(
                    "transition-opacity duration-300",
                    collapsed ? "opacity-0 w-0" : "opacity-100",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div
          className={cn(
            "text-xs text-muted-foreground transition-opacity duration-300",
            collapsed ? "opacity-0" : "opacity-100",
          )}
        >
          Masal Dünyası v1.0
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
