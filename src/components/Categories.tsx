import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription } from "./ui/card";

interface CategoryProps {
  categories?: {
    id: string;
    name: string;
    description: string;
    image: string;
    count?: number;
  }[];
}

const Categories = ({
  categories = [
    {
      id: "klasik",
      name: "Klasik Masallar",
      description: "Nesillerdir anlatılan sevilen klasik masallar",
      image:
        "https://images.unsplash.com/photo-1618945524163-32451704cbb8?w=300&q=80",
      count: 24,
    },
    {
      id: "hayvan",
      name: "Hayvan Masalları",
      description: "Hayvanların başrolde olduğu eğlenceli hikayeler",
      image:
        "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=300&q=80",
      count: 18,
    },
    {
      id: "prenses",
      name: "Prenses Hikayeleri",
      description: "Prensesler ve sihirli krallıklar hakkında masallar",
      image:
        "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=300&q=80",
      count: 12,
    },
    {
      id: "macera",
      name: "Macera Masalları",
      description: "Heyecan dolu maceralar ve keşifler",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80",
      count: 15,
    },
    {
      id: "ogretici",
      name: "Öğretici Masallar",
      description: "Değerli hayat dersleri içeren hikayeler",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80",
      count: 20,
    },
    {
      id: "yerel",
      name: "Yerel Masallar",
      description: "Anadolu kültüründen gelen geleneksel hikayeler",
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=300&q=80",
      count: 10,
    },
  ],
}: CategoryProps) => {
  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Kategoriler</h2>
          <Link
            href="/categories"
            className="text-sm text-primary hover:underline"
          >
            Tümünü Gör
          </Link>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          style={{ maxWidth: "1440px", margin: "0 auto" }}
        >
          {categories.map((category) => (
            <Link
              href={`/category/${category.id}`}
              key={category.id}
              className="block h-full"
              style={{ maxWidth: "240px" }}
            >
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 bg-card rounded-xl border-0 shadow">
                <div className="relative w-full h-20">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="text-white font-medium text-sm">
                      {category.name}
                    </h3>
                    {category.count && (
                      <span className="text-white/80 text-xs">
                        {category.count} masal
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="p-3">
                  <CardDescription className="text-xs line-clamp-2">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
