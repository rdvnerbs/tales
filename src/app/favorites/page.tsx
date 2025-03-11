import React from "react";
import Header from "@/components/Header";
import StoryCard from "@/components/StoryCard";
import { Heart } from "lucide-react";

const favoriteStories = [
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
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="text-red-500 fill-current" size={24} />
          <h1 className="text-3xl font-bold">Favorilerim</h1>
        </div>

        {favoriteStories.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground mb-2">
              Henüz favori masalınız bulunmuyor.
            </p>
            <p className="text-sm text-muted-foreground">
              Beğendiğiniz masalları favorilere eklemek için kalp simgesine
              tıklayın.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteStories.map((story) => (
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
