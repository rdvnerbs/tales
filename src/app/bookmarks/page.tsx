import React from "react";
import Header from "@/components/Header";
import StoryCard from "@/components/StoryCard";
import { Bookmark } from "lucide-react";

const bookmarkedStories = [
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

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="text-blue-500 fill-current" size={24} />
          <h1 className="text-3xl font-bold">Yer İşaretlerim</h1>
        </div>

        {bookmarkedStories.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground mb-2">
              Henüz yer işareti eklediğiniz masal bulunmuyor.
            </p>
            <p className="text-sm text-muted-foreground">
              Daha sonra okumak istediğiniz masalları yer işaretlerine eklemek
              için yer işareti simgesine tıklayın.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bookmarkedStories.map((story) => (
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
