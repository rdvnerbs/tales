import React from "react";
import Header from "@/components/Header";
import PopularStories from "@/components/PopularStories";
import Categories from "@/components/Categories";
import RecentlyRead from "@/components/RecentlyRead";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center justify-between">
        <div className="w-full">
          <PopularStories />
          <Categories />
          <RecentlyRead />
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2023 Masal Dünyası. Tüm hakları saklıdır.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Hakkımızda
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Gizlilik Politikası
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Kullanım Şartları
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                İletişim
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
