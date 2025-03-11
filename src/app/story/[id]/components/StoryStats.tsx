"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, Bookmark, Play, Clock } from "lucide-react";

interface StoryStatsProps {
  storyId: string;
  stats?: {
    views: number;
    likes: number;
    bookmarks: number;
    listens: number;
    readTime: number;
  };
}

const StoryStats = ({
  storyId,
  stats = {
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 200) + 50,
    bookmarks: Math.floor(Math.random() * 100) + 20,
    listens: Math.floor(Math.random() * 300) + 80,
    readTime: Math.floor(Math.random() * 10) + 5,
  },
}: StoryStatsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">İstatistikler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
            <Eye className="h-5 w-5 text-muted-foreground mb-1" />
            <span className="text-lg font-medium">{stats.views}</span>
            <span className="text-xs text-muted-foreground">Görüntülenme</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
            <Heart className="h-5 w-5 text-red-500 mb-1" />
            <span className="text-lg font-medium">{stats.likes}</span>
            <span className="text-xs text-muted-foreground">Beğeni</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
            <Bookmark className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-lg font-medium">{stats.bookmarks}</span>
            <span className="text-xs text-muted-foreground">Yer İşareti</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
            <Play className="h-5 w-5 text-green-500 mb-1" />
            <span className="text-lg font-medium">{stats.listens}</span>
            <span className="text-xs text-muted-foreground">Dinleme</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
            <Clock className="h-5 w-5 text-purple-500 mb-1" />
            <span className="text-lg font-medium">{stats.readTime} dk</span>
            <span className="text-xs text-muted-foreground">Okuma Süresi</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryStats;
