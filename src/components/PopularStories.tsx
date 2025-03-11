"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import StoryCard from "./StoryCard";

interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  isFavorite: boolean;
  isBookmarked: boolean;
}

interface PopularStoriesProps {
  stories?: Story[];
  title?: string;
  description?: string;
}

const PopularStories = ({
  stories = [
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
  ],
  title = "Popüler Masallar",
  description = "En çok okunan ve sevilen masallar",
}: PopularStoriesProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 bg-background w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className="w-full overflow-x-auto whitespace-nowrap pb-4"
          ref={scrollContainerRef}
        >
          <div className="flex space-x-4 pb-4">
            {stories.map((story) => (
              <div key={story.id} className="shrink-0 w-[240px]">
                <StoryCard
                  id={story.id}
                  title={story.title}
                  description={story.description}
                  coverImage={story.coverImage}
                  category={story.category}
                  isFavorite={story.isFavorite}
                  isBookmarked={story.isBookmarked}
                  onClick={() => console.log(`Navigate to story ${story.id}`)}
                  compact={true}
                />
              </div>
            ))}
          </div>
          {/* Scroll indicator */}
          <div className="w-full h-1 bg-muted mt-4 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-1/3 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularStories;
