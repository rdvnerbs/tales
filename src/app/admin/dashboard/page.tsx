"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  PieChart,
  LineChart,
  BookOpen,
  Users,
  BookMarked,
  Heart,
  Eye,
  Play,
} from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStories: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalViews: 0,
    totalLikes: 0,
    totalBookmarks: 0,
    totalListens: 0,
    popularStories: [],
    categoryDistribution: [],
  });

  useEffect(() => {
    // Doğrudan istatistikleri getir, kimlik doğrulama kontrolü yapma
    fetchStats();
    setLoading(false);
  }, []);

  const fetchStats = async () => {
    try {
      // Hikaye sayısı
      const { count: storiesCount } = await supabase
        .from("stories")
        .select("*", { count: "exact", head: true });

      // Kategori sayısı
      const { count: categoriesCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });

      // Kullanıcı sayısı
      const { count: usersCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      // İstatistikler toplamı
      const { data: statsData } = await supabase
        .from("stats")
        .select("views, likes, bookmarks, listens");

      // Hikaye görüntülenme sayıları
      const { data: storiesData } = await supabase
        .from("stories")
        .select("views, likes, bookmarks, listens");

      // İstatistikleri birleştir (hem stats tablosundan hem de stories tablosundan)
      const allStatsData = [...(statsData || []), ...(storiesData || [])];

      const totalViews =
        allStatsData.reduce((sum, item) => sum + (item.views || 0), 0) || 0;
      const totalLikes =
        allStatsData.reduce((sum, item) => sum + (item.likes || 0), 0) || 0;
      const totalBookmarks =
        allStatsData.reduce((sum, item) => sum + (item.bookmarks || 0), 0) || 0;
      const totalListens =
        allStatsData.reduce((sum, item) => sum + (item.listens || 0), 0) || 0;

      // En popüler hikayeler
      const { data: popularStories } = await supabase
        .from("stories")
        .select("id, title, views, likes")
        .order("views", { ascending: false })
        .limit(5);

      // Kategori dağılımı
      const { data: categoryDistribution } = await supabase
        .from("stories")
        .select("category, category_id");

      // Kategori sayılarını hesapla
      const categoryCount = {};
      categoryDistribution?.forEach((story) => {
        if (story.category) {
          categoryCount[story.category] =
            (categoryCount[story.category] || 0) + 1;
        }
      });

      setStats({
        totalStories: storiesCount || 0,
        totalCategories: categoriesCount || 0,
        totalUsers: usersCount || 0,
        totalViews,
        totalLikes,
        totalBookmarks,
        totalListens,
        popularStories: popularStories || [],
        categoryDistribution: Object.entries(categoryCount).map(
          ([name, count]) => ({ name, count }),
        ),
      });
    } catch (error) {
      console.error("İstatistik getirme hatası:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader title="Dashboard" />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button
              onClick={() => router.push("/admin/stories")}
              className="flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>Hikayeleri Yönet</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Hikaye</p>
                  <h3 className="text-2xl font-bold">{stats.totalStories}</h3>
                </div>
                <BookOpen className="h-8 w-8 text-primary opacity-75" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Toplam Kategori
                  </p>
                  <h3 className="text-2xl font-bold">
                    {stats.totalCategories}
                  </h3>
                </div>
                <BarChart className="h-8 w-8 text-primary opacity-75" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Toplam Kullanıcı
                  </p>
                  <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                </div>
                <Users className="h-8 w-8 text-primary opacity-75" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Toplam Görüntülenme
                  </p>
                  <h3 className="text-2xl font-bold">{stats.totalViews}</h3>
                </div>
                <Eye className="h-8 w-8 text-primary opacity-75" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Beğeni</p>
                  <h3 className="text-2xl font-bold">{stats.totalLikes}</h3>
                </div>
                <Heart className="h-8 w-8 text-red-500 opacity-75" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Toplam Yer İşareti
                  </p>
                  <h3 className="text-2xl font-bold">{stats.totalBookmarks}</h3>
                </div>
                <BookMarked className="h-8 w-8 text-blue-500 opacity-75" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Toplam Dinleme
                  </p>
                  <h3 className="text-2xl font-bold">{stats.totalListens}</h3>
                </div>
                <Play className="h-8 w-8 text-green-500 opacity-75" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popüler Hikayeler</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.popularStories.length > 0 ? (
                  <div className="space-y-4">
                    {stats.popularStories.map((story, index) => (
                      <div
                        key={story.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                            {index + 1}
                          </div>
                          <div className="truncate max-w-[200px]">
                            <p className="font-medium truncate">
                              {story.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye size={14} className="text-muted-foreground" />
                            <span className="text-sm">{story.views || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart size={14} className="text-red-500" />
                            <span className="text-sm">{story.likes || 0}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">
                      Henüz veri bulunmuyor
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kategori Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.categoryDistribution.length > 0 ? (
                  <div className="space-y-4">
                    {stats.categoryDistribution.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {category.count} hikaye
                          </span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{
                              width: `${(category.count / stats.totalStories) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">
                      Henüz veri bulunmuyor
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
