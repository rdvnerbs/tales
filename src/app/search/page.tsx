"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import StoryCard from "@/components/StoryCard";
import { Search } from "lucide-react";

const allStories = [
  {
    id: "story-1",
    title: "Kırmızı Başlıklı Kız",
    description:
      "Büyükannesini ziyarete giden küçük bir kızın orman macerasını anlatan klasik bir masal.",
    coverImage:
      "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=300&q=80",
    category: "Klasik Masallar",
    isFavorite: false,
    isBookmarked: true,
  },
  {
    id: "story-2",
    title: "Uyuyan Güzel",
    description:
      "Kötü bir büyü sonucu uykuya dalan ve bir prensin öpücüğüyle uyanan prensesin hikayesi.",
    coverImage:
      "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&q=80",
    category: "Klasik Masallar",
    isFavorite: true,
    isBookmarked: false,
  },
  {
    id: "story-3",
    title: "Hansel ve Gretel",
    description:
      "Ormanda kaybolan ve şekerden yapılmış bir eve rastlayan iki kardeşin macerası.",
    coverImage:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&q=80",
    category: "Klasik Masallar",
    isFavorite: false,
    isBookmarked: false,
  },
  {
    id: "story-4",
    title: "Rapunzel",
    description: "Uzun saçlı bir kızın kuleden kurtulma hikayesi.",
    coverImage:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=300&q=80",
    category: "Klasik Masallar",
    isFavorite: false,
    isBookmarked: false,
  },
  {
    id: "story-5",
    title: "Külkedisi",
    description:
      "Üvey annesi ve kız kardeşleri tarafından kötü davranılan genç bir kızın balo hikayesi.",
    coverImage:
      "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=300&q=80",
    category: "Klasik Masallar",
    isFavorite: true,
    isBookmarked: true,
  },
  {
    id: "story-6",
    title: "Tavşan ile Kaplumbağa",
    description:
      "Hızlı tavşan ile yavaş kaplumbağa arasındaki yarışın hikayesi.",
    coverImage:
      "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?w=300&q=80",
    category: "Hayvan Masalları",
    isFavorite: false,
    isBookmarked: false,
  },
  {
    id: "story-7",
    title: "Aslan ile Fare",
    description:
      "Küçük bir farenin, güçlü aslanı nasıl kurtardığının hikayesi.",
    coverImage:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=300&q=80",
    category: "Hayvan Masalları",
    isFavorite: false,
    isBookmarked: false,
  },
  {
    id: "story-8",
    title: "Karga ile Tilki",
    description: "Kurnaz tilkinin, kargayı nasıl kandırdığının hikayesi.",
    coverImage:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&q=80",
    category: "Hayvan Masalları",
    isFavorite: false,
    isBookmarked: false,
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<typeof allStories>([]);

  useEffect(() => {
    if (query) {
      const filteredStories = allStories.filter(
        (story) =>
          story.title.toLowerCase().includes(query.toLowerCase()) ||
          story.description.toLowerCase().includes(query.toLowerCase()) ||
          story.category.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filteredStories);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Search size={24} />
          <h1 className="text-3xl font-bold">Arama Sonuçları</h1>
        </div>

        {query ? (
          <p className="text-muted-foreground mb-6">
            <span className="font-medium">"{query}"</span> için{" "}
            {searchResults.length} sonuç bulundu
          </p>
        ) : (
          <p className="text-muted-foreground mb-6">
            Lütfen arama yapmak için bir kelime girin
          </p>
        )}

        {searchResults.length === 0 && query ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground mb-2">
              Aramanızla eşleşen masal bulunamadı.
            </p>
            <p className="text-sm text-muted-foreground">
              Farklı anahtar kelimeler deneyebilir veya kategorilere göz
              atabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                description={story.description}
                coverImage={story.coverImage}
                category={story.category}
                isFavorite={story.isFavorite}
                isBookmarked={story.isBookmarked}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
