"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Menu,
  X,
  Home,
  Grid,
  Heart,
  Bookmark,
  Globe,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ThemeSwitcher } from "./theme-switcher";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface HeaderProps {
  logo?: string;
  title?: string;
  isSearchVisible?: boolean;
  onSearch?: (query: string) => void;
}

const Header = ({
  logo = "/logo.svg",
  title = "Masal Dünyası",
  isSearchVisible = true,
  onSearch = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("tr");

  const languages = [
    { code: "tr", name: "Türkçe" },
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    // Arama sonuçlarına yönlendir
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { name: "Ana Sayfa", href: "/", icon: <Home size={16} className="mr-1" /> },
    {
      name: "Kategoriler",
      href: "/categories",
      icon: <Grid size={16} className="mr-1" />,
    },
    {
      name: "Favorilerim",
      href: "/favorites",
      icon: <Heart size={16} className="mr-1" />,
    },
    {
      name: "Yer İşaretlerim",
      href: "/bookmarks",
      icon: <Bookmark size={16} className="mr-1" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618945524163-32451704cbb8?w=300&q=80"
                alt="Logo"
                width={32}
                height={32}
                className="object-cover rounded-full"
              />
            </div>
            <span className="font-bold text-xl">{title}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search and Theme Toggle */}
        <div className="flex items-center gap-4">
          {isSearchVisible && (
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Masal ara..."
                className="w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) {
                    onSearch(e.target.value);
                  }
                }}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          )}

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Globe size={16} />
                  <span className="hidden md:inline">
                    {languages.find((lang) => lang.code === language)?.name}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="flex flex-col gap-1">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant="ghost"
                      size="sm"
                      className={`justify-start ${language === lang.code ? "bg-muted" : ""}`}
                      onClick={() => setLanguage(lang.code)}
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => (window.location.href = "/admin/dashboard")}
            >
              <Settings size={16} className="mr-1" />
              <span className="hidden md:inline">Admin</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col gap-6 mt-6">
                {isSearchVisible && (
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="search"
                      placeholder="Masal ara..."
                      className="w-full"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.trim()) {
                          onSearch(e.target.value);
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                )}

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/admin/dashboard"
                    className="text-sm font-medium transition-colors hover:text-primary py-2 flex items-center"
                  >
                    <Settings size={16} className="mr-1" />
                    Admin
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
