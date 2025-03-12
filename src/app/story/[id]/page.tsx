"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/components/UserProvider";
import Image from "next/image";
import {
  Heart,
  Bookmark,
  Share2,
  Volume2,
  Play,
  Book,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { t } from "@/lib/i18n";
import {
  trackView,
  trackLike,
  trackBookmark,
  trackListen,
} from "@/lib/track-activity";
import {
  toggleFavorite,
  toggleBookmark,
  checkUserStoryStatus,
} from "@/lib/user-actions";
import { trackVisitor } from "@/lib/track-visitor";
import StoryStats from "./components/StoryStats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const stories = {
  "story-1": {
    id: "story-1",
    title: "Kırmızı Başlıklı Kız",
    description:
      "Büyükannesini ziyarete giden küçük bir kızın orman macerasını anlatan klasik bir masal.",
    coverImage:
      "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=800&q=80",
    category: "Klasik Masallar",
    content: `<p>Bir zamanlar, küçük bir köyde Kırmızı Başlıklı Kız adında sevimli bir kız çocuğu yaşarmış. Annesi ona kırmızı bir başlık hediye etmiş ve kız bu başlığı o kadar çok severmiş ki, her yere takıp gidermiş. Bu yüzden herkes ona Kırmızı Başlıklı Kız dermiş.</p>

<p>Bir gün annesi ona, "Kırmızı Başlıklı Kız, büyükannen hasta. Ona bu çörek ve şarabı götür" demiş. "Ama dikkatli ol, ormandan geçerken yoldan ayrılma ve yabancılarla konuşma."</p>

<p>Kırmızı Başlıklı Kız yola çıkmış. Ormanda ilerlerken, karşısına kötü kalpli bir kurt çıkmış. Kurt ona nereye gittiğini sormuş. Kırmızı Başlıklı Kız, büyükannesinin hasta olduğunu ve ona yiyecek götürdüğünü söylemiş.</p>

<p>Kurt, büyükannenin evinin yerini öğrenmiş ve hızlıca oraya varmış. Büyükanneyi yutmuş ve onun yatağına yatmış, kıyafetlerini giymiş.</p>

<p>Kırmızı Başlıklı Kız eve vardığında, büyükannesinin tuhaf göründüğünü fark etmiş. "Büyükanne, kulakların ne kadar büyük!" demiş. Kurt, "Seni daha iyi duymak için" diye cevap vermiş.</p>

<p>"Büyükanne, gözlerin ne kadar büyük!" demiş Kırmızı Başlıklı Kız. "Seni daha iyi görmek için" demiş kurt.</p>

<p>"Büyükanne, ellerin ne kadar büyük!" demiş kız. "Seni daha iyi tutmak için" demiş kurt.</p>

<p>"Büyükanne, ağzın ne kadar büyük!" demiş kız. "Seni daha iyi yemek için!" diye bağırmış kurt ve Kırmızı Başlıklı Kız'ı da yutmuş.</p>

<p>Neyse ki, yakınlarda bir avcı varmış. Büyükannenin evinden gelen sesleri duymuş ve içeri girmiş. Kurdu görmüş ve hemen karnını kesmiş. Büyükanne ve Kırmızı Başlıklı Kız kurtulmuşlar.</p>

<p>Kırmızı Başlıklı Kız bir daha asla annesinin sözünden çıkmamış ve yabancılarla konuşmamış.</p>`,
    audioUrl: "#",
    videoUrl: "#",
    relatedStories: ["story-2", "story-3"],
    isFavorite: false,
    isBookmarked: true,
  },
  "story-2": {
    id: "story-2",
    title: "Uyuyan Güzel",
    description:
      "Kötü bir büyü sonucu uykuya dalan ve bir prensin öpücüğüyle uyanan prensesin hikayesi.",
    coverImage:
      "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=800&q=80",
    category: "Klasik Masallar",
    content: `<p>Bir varmış bir yokmuş, bir zamanlar bir kral ve kraliçe varmış. Uzun yıllar çocukları olmamış ve sonunda bir kızları olmuş. Doğum gününde büyük bir kutlama düzenlemişler ve ülkedeki tüm perileri davet etmişler.</p>

<p>Ancak bir peri davet edilmemiş ve çok kızmış. Kutlamaya gelmiş ve bebeğe bir lanet okumuş: "On altı yaşına geldiğinde, bir iğneye dokunacak ve ölecek!"</p>

<p>Neyse ki, henüz hediyesini vermemiş olan iyi kalpli bir peri varmış. Laneti tamamen kaldıramamış ama değiştirebilmiş: "Ölmeyecek, yüz yıl boyunca derin bir uykuya dalacak."</p>

<p>Kral, krallıktaki tüm iğneleri yok etmesi için emir vermiş. Prenses büyümüş ve güzel bir genç kız olmuş. On altıncı doğum gününde, sarayın eski bir kulesinde yaşlı bir kadınla karşılaşmış. Kadın iğne ile iplik eğiriyormuş. Prenses merak etmiş ve iğneye dokunmuş, parmağını batırmış ve hemen uykuya dalmış.</p>

<p>İyi peri, prensesin yüz yıl sonra uyanacağını biliyormuş. Saraydaki herkesi de uykuya daldırmış ki prenses uyandığında yalnız kalmasın. Sarayın etrafında kalın dikenli çalılar büyümüş ve sarayı tamamen gizlemiş.</p>

<p>Yıllar geçmiş ve bir gün yakındaki bir krallıktan genç bir prens, efsanevi uyuyan prensesin hikayesini duymuş. Sarayı bulmaya karar vermiş. Dikenli çalılara ulaştığında, çalılar kendiliğinden açılmış ve ona yol vermiş.</p>

<p>Prens, uyuyan prensesi bulmuş ve güzelliğine hayran kalmış. Eğilip onu öpmüş ve prenses uyanmış. Onunla birlikte tüm saray da uyanmış. Prens ve prenses evlenmişler ve sonsuza dek mutlu yaşamışlar.</p>`,
    audioUrl: "#",
    videoUrl: "#",
    relatedStories: ["story-1", "story-5"],
    isFavorite: true,
    isBookmarked: false,
  },
};

export default function StoryPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const storyId = params.id as string;
  // UUID formatına dönüştür
  const uuidStoryId = storyId.startsWith("story-")
    ? `00000000-0000-0000-0000-${storyId.replace("story-", "").padStart(12, "0")}`
    : storyId;
  const story = stories[storyId] || stories["story-1"];

  const [activeTab, setActiveTab] = useState("read");
  const [fontSize, setFontSize] = useState(16);
  const [isFavorite, setIsFavorite] = useState(story.isFavorite);
  const [isBookmarked, setIsBookmarked] = useState(story.isBookmarked);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sayfa görüntülendiğinde ziyaretçi bilgilerini kaydet
    trackVisitor();

    // Hikaye görüntüleme sayısını artır
    trackView(user?.id || null, uuidStoryId);

    // Kullanıcı giriş yapmışsa, hikaye durumunu kontrol et
    const checkStatus = async () => {
      if (user) {
        try {
          const { isFavorite: isFav, isBookmarked: isBook } =
            await checkUserStoryStatus(user.id, storyId);
          setIsFavorite(isFav);
          setIsBookmarked(isBook);
        } catch (error) {
          console.error("Hikaye durumu kontrol hatası:", error);
        }
      }
    };

    checkStatus();
  }, [storyId, user, uuidStoryId]);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left sidebar with story image and actions */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex justify-between mb-4">
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="icon"
                  className={
                    isFavorite ? "text-white bg-red-500 hover:bg-red-600" : ""
                  }
                  onClick={async () => {
                    if (!user) {
                      router.push("/login");
                      return;
                    }
                    setIsLoading(true);
                    const newValue = !isFavorite;
                    setIsFavorite(newValue);

                    // Favorilere ekle/çıkar
                    await toggleFavorite(user.id, storyId, newValue);

                    // Aktiviteyi takip et
                    trackLike(user.id, uuidStoryId, newValue ? 1 : 0);
                    setIsLoading(false);
                  }}
                >
                  <Heart
                    className={isFavorite ? "fill-current" : ""}
                    size={18}
                  />
                </Button>

                <Button
                  variant={isBookmarked ? "default" : "outline"}
                  size="icon"
                  className={
                    isBookmarked
                      ? "text-white bg-blue-500 hover:bg-blue-600"
                      : ""
                  }
                  onClick={async () => {
                    if (!user) {
                      router.push("/login");
                      return;
                    }
                    setIsLoading(true);
                    const newValue = !isBookmarked;
                    setIsBookmarked(newValue);

                    // Yer işaretlerine ekle/çıkar
                    await toggleBookmark(user.id, storyId, newValue);

                    // Aktiviteyi takip et
                    trackBookmark(user.id, uuidStoryId, newValue ? 1 : 0);
                    setIsLoading(false);
                  }}
                >
                  <Bookmark
                    className={isBookmarked ? "fill-current" : ""}
                    size={18}
                  />
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Share2 size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Facebook size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-sky-500 hover:text-sky-600"
                      >
                        <Twitter size={18} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <Instagram size={18} />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Card className="mb-4">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{t("story.category")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {story.category}
                  </p>
                </CardContent>
              </Card>

              {/* Import and use the StoryStats component */}
              <div className="mb-4">
                <StoryStats storyId={storyId} />
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">
                    {t("story.relatedStories")}
                  </h3>
                  <ul className="space-y-2">
                    {story.relatedStories.map((relatedId) => (
                      <li key={relatedId}>
                        <a
                          href={`/story/${relatedId}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {stories[relatedId]?.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="mb-2"
                onClick={() => window.history.back()}
              >
                <ChevronLeft size={16} className="mr-1" />{" "}
                {t("story.backButton")}
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {story.title}
              </h1>
              <p className="text-muted-foreground">{story.description}</p>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="read" className="flex items-center gap-1">
                    <Book size={16} /> {t("story.readTab")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="listen"
                    className="flex items-center gap-1"
                  >
                    <Volume2 size={16} /> {t("story.listenTab")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="watch"
                    className="flex items-center gap-1"
                  >
                    <Play size={16} /> {t("story.watchTab")}
                  </TabsTrigger>
                </TabsList>

                {activeTab === "read" && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {t("story.fontSize")}:
                    </span>
                    <Slider
                      defaultValue={[fontSize]}
                      max={24}
                      min={12}
                      step={1}
                      className="w-24"
                      onValueChange={handleFontSizeChange}
                    />
                  </div>
                )}
              </div>

              <TabsContent value="read" className="mt-4">
                <div
                  className="prose dark:prose-invert max-w-none"
                  style={{ fontSize: `${fontSize}px` }}
                  dangerouslySetInnerHTML={{ __html: story.content }}
                />
              </TabsContent>

              <TabsContent value="listen" className="mt-4">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 shadow-lg">
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={story.coverImage}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{story.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      {story.category}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-10 w-10"
                        onClick={() => {
                          // Önceki hikayeye git
                          const storyIds = Object.keys(stories);
                          const currentIndex = storyIds.indexOf(storyId);
                          if (currentIndex > 0) {
                            window.location.href = `/story/${storyIds[currentIndex - 1]}`;
                          }
                        }}
                      >
                        <ChevronLeft size={18} />
                      </Button>

                      <Button
                        size="lg"
                        className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
                        onClick={() => {
                          if (!user && !isPlaying) {
                            router.push("/login");
                            return;
                          }
                          const newValue = !isPlaying;
                          setIsPlaying(newValue);
                          if (newValue) {
                            trackListen(user?.id || null, uuidStoryId);
                          }
                        }}
                      >
                        {isPlaying ? (
                          <span className="h-4 w-4 bg-white rounded-sm" />
                        ) : (
                          <Play size={24} className="ml-1" />
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-10 w-10"
                        onClick={() => {
                          // Sonraki hikayeye git
                          const storyIds = Object.keys(stories);
                          const currentIndex = storyIds.indexOf(storyId);
                          if (currentIndex < storyIds.length - 1) {
                            window.location.href = `/story/${storyIds[currentIndex + 1]}`;
                          }
                        }}
                      >
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>{isPlaying ? "1:23" : "0:00"}</span>
                      <span>8:45</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 mb-4 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-1000"
                        style={{ width: isPlaying ? "15%" : "0%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-10 w-10"
                    >
                      <Volume2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full h-10 w-10 ${isFavorite ? "bg-red-100 dark:bg-red-900/30" : ""}`}
                      onClick={async () => {
                        if (!user) {
                          router.push("/login");
                          return;
                        }
                        setIsLoading(true);
                        const newValue = !isFavorite;
                        setIsFavorite(newValue);

                        // Favorilere ekle/çıkar
                        await toggleFavorite(user.id, storyId, newValue);

                        // Aktiviteyi takip et
                        trackLike(user.id, uuidStoryId, newValue ? 1 : 0);
                        setIsLoading(false);
                      }}
                    >
                      <Heart
                        size={18}
                        className={
                          isFavorite ? "fill-current text-red-500" : ""
                        }
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full h-10 w-10 ${isBookmarked ? "bg-blue-100 dark:bg-blue-900/30" : ""}`}
                      onClick={async () => {
                        if (!user) {
                          router.push("/login");
                          return;
                        }
                        setIsLoading(true);
                        const newValue = !isBookmarked;
                        setIsBookmarked(newValue);

                        // Yer işaretlerine ekle/çıkar
                        await toggleBookmark(user.id, storyId, newValue);

                        // Aktiviteyi takip et
                        trackBookmark(user.id, uuidStoryId, newValue ? 1 : 0);
                        setIsLoading(false);
                      }}
                    >
                      <Bookmark
                        size={18}
                        className={
                          isBookmarked ? "fill-current text-blue-500" : ""
                        }
                      />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="watch" className="mt-4">
                <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-video relative">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                      <Button
                        size="lg"
                        className="rounded-full h-20 w-20 bg-primary/90 hover:bg-primary shadow-xl"
                      >
                        <Play size={32} className="ml-1" />
                      </Button>
                      <div className="text-center bg-background/80 px-6 py-3 rounded-full">
                        <h3 className="font-medium">{story.title} - Video</h3>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-full bg-background/30 rounded-full h-2 mb-2 overflow-hidden">
                        <div className="bg-primary h-full rounded-full w-0"></div>
                      </div>
                      <div className="flex justify-between text-xs text-white/90 px-1">
                        <span>0:00</span>
                        <span>5:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-8 pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => {
                  // Önceki hikayeye git
                  const storyIds = Object.keys(stories);
                  const currentIndex = storyIds.indexOf(storyId);
                  if (currentIndex > 0) {
                    window.location.href = `/story/${storyIds[currentIndex - 1]}`;
                  }
                }}
              >
                <ChevronLeft size={16} className="mr-1" />{" "}
                {t("story.previousStory")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => {
                  // Sonraki hikayeye git
                  const storyIds = Object.keys(stories);
                  const currentIndex = storyIds.indexOf(storyId);
                  if (currentIndex < storyIds.length - 1) {
                    window.location.href = `/story/${storyIds[currentIndex + 1]}`;
                  }
                }}
              >
                {t("story.nextStory")}{" "}
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
