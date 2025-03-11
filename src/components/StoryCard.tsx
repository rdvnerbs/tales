"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";

interface StoryCardProps {
  id?: string;
  title?: string;
  description?: string;
  coverImage?: string;
  category?: string;
  isFavorite?: boolean;
  isBookmarked?: boolean;
  onClick?: () => void;
  compact?: boolean;
}

const StoryCard = ({
  id = "story-1",
  title = "Kırmızı Başlıklı Kız",
  description = "Büyükannesini ziyarete giden küçük bir kızın orman macerasını anlatan klasik bir masal.",
  coverImage = "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=300&q=80",
  category = "Klasik Masallar",
  isFavorite = false,
  isBookmarked = false,
  onClick = () => {},
  compact = false,
}: StoryCardProps) => {
  return (
    <Card
      className="w-full h-full overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg bg-card rounded-xl border-0 shadow"
      style={{ maxWidth: "240px" }}
    >
      <Link href={`/story/${id}`}>
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full bg-background/80 ${isFavorite ? "text-red-500" : "text-gray-500"}`}
              onClick={(e) => {
                e.preventDefault();
                // Toggle favorite functionality would go here
              }}
            >
              <Heart size={16} className={isFavorite ? "fill-current" : ""} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full bg-background/80 ${isBookmarked ? "text-blue-500" : "text-gray-500"}`}
              onClick={(e) => {
                e.preventDefault();
                // Toggle bookmark functionality would go here
              }}
            >
              <Bookmark
                size={16}
                className={isBookmarked ? "fill-current" : ""}
              />
            </Button>
          </div>
        </div>
      </Link>

      <CardHeader className="p-3 pb-2">
        <div className="text-xs text-muted-foreground mb-1">{category}</div>
        <CardTitle className="text-base truncate">{title}</CardTitle>
      </CardHeader>

      {!compact && (
        <CardContent className="p-3 pt-0 flex-grow">
          <CardDescription className="text-xs line-clamp-2">
            {description}
          </CardDescription>
        </CardContent>
      )}

      <CardFooter className="p-3 pt-0">
        <Link href={`/story/${id}`} className="w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-sm"
            onClick={(e) => {
              e.preventDefault();
              if (onClick) onClick();
              window.location.href = `/story/${id}`;
            }}
          >
            Okumaya Başla
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
