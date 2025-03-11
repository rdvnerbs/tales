"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const allCategories = [
  {
    id: "klasik",
    name: "Klasik Masallar",
    description: "Nesillerdir anlatılan sevilen klasik masallar",
    image:
      "https://images.unsplash.com/photo-1618945524163-32451704cbb8?w=300&q=80",
    count: 24,
    ageGroup: "hepsi",
  },
  {
    id: "hayvan",
    name: "Hayvan Masalları",
    description: "Hayvanların başrolde olduğu eğlenceli hikayeler",
    image:
      "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=300&q=80",
    count: 18,
    ageGroup: "3-6",
  },
  {
    id: "prenses",
    name: "Prenses Hikayeleri",
    description: "Prensesler ve sihirli krallıklar hakkında masallar",
    image:
      "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=300&q=80",
    count: 12,
    ageGroup: "6-9",
  },
  {
    id: "macera",
    name: "Macera Masalları",
    description: "Heyecan dolu maceralar ve keşifler",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80",
    count: 15,
    ageGroup: "9-12",
  },
  {
    id: "ogretici",
    name: "Öğretici Masallar",
    description: "Değerli hayat dersleri içeren hikayeler",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80",
    count: 20,
    ageGroup: "6-9",
  },
  {
    id: "yerel",
    name: "Yerel Masallar",
    description: "Anadolu kültüründen gelen geleneksel hikayeler",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=300&q=80",
    count: 10,
    ageGroup: "hepsi",
  },
  {
    id: "fantastik",
    name: "Fantastik Masallar",
    description: "Sihir ve fantastik öğeler içeren masallar",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300&q=80",
    count: 14,
    ageGroup: "9-12",
  },
  {
    id: "uyku",
    name: "Uyku Masalları",
    description: "Yatmadan önce okunabilecek sakinleştirici hikayeler",
    image:
      "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=300&q=80",
    count: 8,
    ageGroup: "3-6",
  },
  {
    id: "dostluk",
    name: "Dostluk Masalları",
    description: "Arkadaşlık ve paylaşma temalı hikayeler",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&q=80",
    count: 16,
    ageGroup: "6-9",
  },
  {
    id: "cesaret",
    name: "Cesaret Masalları",
    description: "Kahramanlık ve cesaret temalı hikayeler",
    image:
      "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=300&q=80",
    count: 12,
    ageGroup: "9-12",
  },
  {
    id: "dunya",
    name: "Dünya Masalları",
    description: "Farklı kültürlerden gelen ilginç hikayeler",
    image:
      "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=300&q=80",
    count: 22,
    ageGroup: "hepsi",
  },
  {
    id: "komik",
    name: "Komik Masallar",
    description: "Güldüren ve eğlendiren hikayeler",
    image:
      "https://images.unsplash.com/photo-1543084951-1650d1468e2d?w=300&q=80",
    count: 18,
    ageGroup: "3-6",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Kategoriler</h1>

        <Tabs defaultValue="hepsi" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="hepsi">Tüm Yaş Grupları</TabsTrigger>
            <TabsTrigger value="3-6">3-6 Yaş</TabsTrigger>
            <TabsTrigger value="6-9">6-9 Yaş</TabsTrigger>
            <TabsTrigger value="9-12">9-12 Yaş</TabsTrigger>
          </TabsList>

          {["hepsi", "3-6", "6-9", "9-12"].map((ageGroup) => (
            <TabsContent key={ageGroup} value={ageGroup} className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allCategories
                  .filter(
                    (cat) =>
                      ageGroup === "hepsi" ||
                      cat.ageGroup === ageGroup ||
                      cat.ageGroup === "hepsi",
                  )
                  .map((category) => (
                    <Link
                      href={`/category/${category.id}`}
                      key={category.id}
                      className="block h-full"
                    >
                      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 bg-card">
                        <div className="relative w-full h-48">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-medium text-lg">
                              {category.name}
                            </h3>
                            {category.count && (
                              <span className="text-white/80 text-sm">
                                {category.count} masal
                              </span>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <CardDescription className="text-sm">
                            {category.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
