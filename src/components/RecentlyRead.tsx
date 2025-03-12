"use client";

import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import StoryCard from "./StoryCard";
import { cn } from "../lib/utils";

interface RecentlyReadProps {
  stories?: {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    category: string;
    lastReadAt: string;
    progress: number;
    isFavorite?: boolean;
    isBookmarked?: boolean;
  }[];
  className?: string;
}

const RecentlyRead = ({
  stories = [
    {
      id: "story-1",
      title: "Kırmızı Başlıklı Kız",
      description:
        "Büyükannesini ziyarete giden küçük bir kızın orman macerasını anlatan klasik bir masal.",
      coverImage:
        "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=300&q=80",
      category: "Klasik Masallar",
      lastReadAt: "2 saat önce",
      progress: 45,
      isFavorite: true,
      isBookmarked: false,
    },
    {
      id: "story-2",
      title: "Uyuyan Güzel",
      description:
        "Bir prensesin yüz yıllık uykuya dalması ve onu uyandıran prensin hikayesi.",
      coverImage:
        "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&q=80",
      category: "Klasik Masallar",
      lastReadAt: "Dün",
      progress: 75,
      isFavorite: false,
      isBookmarked: true,
    },
    {
      id: "story-3",
      title: "Keloğlan ve Sihirli Taş",
      description:
        "Keloğlan'ın bulduğu sihirli taşla başından geçen maceraları anlatan bir Türk halk masalı.",
      coverImage:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&q=80",
      category: "Türk Masalları",
      lastReadAt: "3 gün önce",
      progress: 20,
      isFavorite: false,
      isBookmarked: false,
    },
  ],
  className,
}: RecentlyReadProps) => {
  return (
    <section className={cn("w-full py-8 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Son Okuduklarınız</h2>
          <Button variant="ghost" className="text-sm flex items-center gap-1">
            Tümünü Gör <ArrowRight size={16} />
          </Button>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">
              Henüz hiç hikaye okumadınız.
            </p>
            <Button className="mt-4">Hikayeleri Keşfedin</Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            style={{ maxWidth: "1440px", margin: "0 auto" }}
          >
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col w-full h-full">
                <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                  <Clock size={14} />
                  <span>{story.lastReadAt}</span>
                </div>

                <div className="flex-1">
                  <StoryCard
                    id={story.id}
                    title={story.title}
                    description={story.description}
                    coverImage={story.coverImage}
                    category={story.category}
                    isFavorite={story.isFavorite}
                    isBookmarked={story.isBookmarked}
                    onClick={() =>
                      console.log(`Continue reading ${story.title}`)
                    }
                  />
                </div>

                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${story.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Devam Et</span>
                    <span>{story.progress}% Tamamlandı</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyRead;
