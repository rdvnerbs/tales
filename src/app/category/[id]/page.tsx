"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import Header from "@/components/Header";
import StoryCard from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const categories = {
  klasik: {
    id: "klasik",
    name: "Klasik Masallar",
    description: "Nesillerdir anlatılan sevilen klasik masallar",
    image:
      "https://images.unsplash.com/photo-1618945524163-32451704cbb8?w=300&q=80",
    count: 5,
    stories: [
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
  },
  hayvan: {
    id: "hayvan",
    name: "Hayvan Masalları",
    description: "Hayvanların başrolde olduğu eğlenceli hikayeler",
    image:
      "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=300&q=80",
    count: 3,
    stories: [
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
    ],
  },
  yerel: {
    id: "yerel",
    name: "Yerel Masallar",
    description: "Anadolu kültüründen gelen geleneksel hikayeler",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=300&q=80",
    count: 3,
    stories: [
      {
        id: "story-9",
        title: "Keloğlan ve Sihirli Taş",
        description:
          "Keloğlan'ın bulduğu sihirli taşla başından geçen maceraları anlatan bir Türk halk masalı.",
        coverImage:
          "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&q=80",
        category: "Türk Masalları",
        isFavorite: false,
        isBookmarked: false,
      },
      {
        id: "story-10",
        title: "Nasreddin Hoca ve Eşeği",
        description: "Nasreddin Hoca'nın eşeğiyle yaşadığı komik bir macera.",
        coverImage:
          "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?w=300&q=80",
        category: "Türk Masalları",
        isFavorite: false,
        isBookmarked: false,
      },
      {
        id: "story-11",
        title: "Dede Korkut Hikayeleri",
        description: "Türk destanlarından seçme hikayeler.",
        coverImage:
          "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=300&q=80",
        category: "Türk Masalları",
        isFavorite: false,
        isBookmarked: false,
      },
    ],
  },
  prenses: {
    id: "prenses",
    name: "Prenses Hikayeleri",
    description: "Prensesler ve sihirli krallıklar hakkında masallar",
    image:
      "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=300&q=80",
    count: 3,
    stories: [
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
    ],
  },
  macera: {
    id: "macera",
    name: "Macera Masalları",
    description: "Heyecan dolu maceralar ve keşifler",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80",
    count: 3,
    stories: [
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
        id: "story-12",
        title: "Alaaddin'in Sihirli Lambası",
        description:
          "Fakir bir gencin bulduğu sihirli lambayla değişen hayatı.",
        coverImage:
          "https://images.unsplash.com/photo-1528696892704-5e1122852276?w=300&q=80",
        category: "Macera Masalları",
        isFavorite: false,
        isBookmarked: false,
      },
      {
        id: "story-13",
        title: "Sinbad'ın Maceraları",
        description:
          "Denizci Sinbad'ın yedi denizde yaşadığı olağanüstü maceralar.",
        coverImage:
          "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=300&q=80",
        category: "Macera Masalları",
        isFavorite: false,
        isBookmarked: false,
      },
    ],
  },
  ogretici: {
    id: "ogretici",
    name: "Öğretici Masallar",
    description: "Değerli hayat dersleri içeren hikayeler",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80",
    count: 3,
    stories: [
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
        id: "story-14",
        title: "Çiftçi ve Çocukları",
        description: "Çalışmanın ve birliğin önemini anlatan bir masal.",
        coverImage:
          "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&q=80",
        category: "Öğretici Masallar",
        isFavorite: false,
        isBookmarked: false,
      },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const category = categories[categoryId];

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => window.history.back()}
        >
          <ChevronLeft size={16} className="mr-1" /> Kategorilere Dön
        </Button>

        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground mb-6">{category.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.stories.map((story) => (
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
      </main>
    </div>
  );
}
