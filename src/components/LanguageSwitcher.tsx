"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { supportedLanguages, getLanguage, setLanguage } from "@/lib/i18n";

interface LanguageSwitcherProps {
  showLabel?: boolean;
}

const LanguageSwitcher = ({ showLabel = true }: LanguageSwitcherProps) => {
  const [currentLang, setCurrentLang] = useState(getLanguage());

  useEffect(() => {
    // Dil değişikliklerini dinle
    const handleLanguageChange = () => {
      setCurrentLang(getLanguage());
    };

    document.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      document.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    // Sayfayı yeniden yükle
    window.location.reload();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe size={16} />
          {showLabel && (
            <span className="hidden md:inline">
              {
                supportedLanguages.find((lang) => lang.code === currentLang)
                  ?.name
              }
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="flex flex-col gap-1">
          {supportedLanguages.map((lang) => (
            <Button
              key={lang.code}
              variant="ghost"
              size="sm"
              className={`justify-start ${currentLang === lang.code ? "bg-muted" : ""}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
