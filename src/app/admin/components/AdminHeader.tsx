"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LogOut, Menu } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  toggleSidebar?: () => void;
}

const AdminHeader = ({ title, toggleSidebar }: AdminHeaderProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Çıkış Yap</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
