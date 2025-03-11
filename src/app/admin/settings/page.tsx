"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  // Genel ayarlar
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Masal Dünyası",
    siteDescription: "Çocuklar için interaktif masal okuma uygulaması",
    contactEmail: "info@masaldunyasi.com",
    footerText: "© 2023 Masal Dünyası. Tüm hakları saklıdır.",
  });

  // Sosyal medya ayarları
  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://facebook.com/masaldunyasi",
    twitter: "https://twitter.com/masaldunyasi",
    instagram: "https://instagram.com/masaldunyasi",
    youtube: "",
  });

  // SEO ayarları
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Masal Dünyası - Çocuklar İçin Masallar",
    metaDescription:
      "Çocuklar için eğitici ve eğlenceli masallar. Sesli ve görüntülü masal okuma platformu.",
    keywords: "masal, çocuk masalları, hikaye, sesli masal, görüntülü masal",
    googleAnalyticsId: "",
  });

  // Görünüm ayarları
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: "#000000",
    secondaryColor: "#f5f5f5",
    accentColor: "#f5f5f5",
    logoUrl:
      "https://images.unsplash.com/photo-1618945524163-32451704cbb8?w=300&q=80",
    faviconUrl:
      "https://images.unsplash.com/photo-1618945524163-32451704cbb8?w=32&h=32&q=80",
  });

  // Ayarları kaydet
  const saveSettings = async () => {
    setLoading(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      // Burada normalde bir API çağrısı yapılır ve ayarlar veritabanına kaydedilir
      // Şimdilik sadece simüle ediyoruz
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Başarılı mesajını göster
      setSaveSuccess(true);

      // 3 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Ayarları kaydetme hatası:", error);
      setSaveError("Ayarlar kaydedilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // Genel ayarlar form değişikliği
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({ ...generalSettings, [name]: value });
  };

  // Sosyal medya ayarları form değişikliği
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialSettings({ ...socialSettings, [name]: value });
  };

  // SEO ayarları form değişikliği
  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setSeoSettings({ ...seoSettings, [name]: value });
  };

  // Görünüm ayarları form değişikliği
  const handleAppearanceChange = (e) => {
    const { name, value } = e.target;
    setAppearanceSettings({ ...appearanceSettings, [name]: value });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader title="Ayarlar" />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Site Ayarları</h1>
            <p className="text-muted-foreground">
              Sitenizin genel ayarlarını buradan yönetebilirsiniz.
            </p>
          </div>

          {saveSuccess && (
            <Alert className="mb-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-600 dark:text-green-400">
                Ayarlar başarıyla kaydedildi.
              </AlertDescription>
            </Alert>
          )}

          {saveError && (
            <Alert className="mb-6" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{saveError}</AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Genel</TabsTrigger>
              <TabsTrigger value="social">Sosyal Medya</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="appearance">Görünüm</TabsTrigger>
            </TabsList>

            {/* Genel Ayarlar */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Genel Ayarlar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="siteName" className="text-sm font-medium">
                      Site Adı
                    </label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="siteDescription"
                      className="text-sm font-medium"
                    >
                      Site Açıklaması
                    </label>
                    <Textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={handleGeneralChange}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contactEmail"
                      className="text-sm font-medium"
                    >
                      İletişim E-posta
                    </label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="footerText" className="text-sm font-medium">
                      Alt Bilgi Metni
                    </label>
                    <Input
                      id="footerText"
                      name="footerText"
                      value={generalSettings.footerText}
                      onChange={handleGeneralChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sosyal Medya Ayarları */}
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Sosyal Medya Ayarları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="facebook" className="text-sm font-medium">
                      Facebook URL
                    </label>
                    <Input
                      id="facebook"
                      name="facebook"
                      value={socialSettings.facebook}
                      onChange={handleSocialChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="twitter" className="text-sm font-medium">
                      Twitter URL
                    </label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={socialSettings.twitter}
                      onChange={handleSocialChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="instagram" className="text-sm font-medium">
                      Instagram URL
                    </label>
                    <Input
                      id="instagram"
                      name="instagram"
                      value={socialSettings.instagram}
                      onChange={handleSocialChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="youtube" className="text-sm font-medium">
                      YouTube URL
                    </label>
                    <Input
                      id="youtube"
                      name="youtube"
                      value={socialSettings.youtube}
                      onChange={handleSocialChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Ayarları */}
            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Ayarları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="metaTitle" className="text-sm font-medium">
                      Meta Başlık
                    </label>
                    <Input
                      id="metaTitle"
                      name="metaTitle"
                      value={seoSettings.metaTitle}
                      onChange={handleSeoChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="metaDescription"
                      className="text-sm font-medium"
                    >
                      Meta Açıklama
                    </label>
                    <Textarea
                      id="metaDescription"
                      name="metaDescription"
                      value={seoSettings.metaDescription}
                      onChange={handleSeoChange}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="keywords" className="text-sm font-medium">
                      Anahtar Kelimeler
                    </label>
                    <Textarea
                      id="keywords"
                      name="keywords"
                      value={seoSettings.keywords}
                      onChange={handleSeoChange}
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Virgülle ayırarak yazın.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="googleAnalyticsId"
                      className="text-sm font-medium"
                    >
                      Google Analytics ID
                    </label>
                    <Input
                      id="googleAnalyticsId"
                      name="googleAnalyticsId"
                      value={seoSettings.googleAnalyticsId}
                      onChange={handleSeoChange}
                      placeholder="UA-XXXXXXXXX-X"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Görünüm Ayarları */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Görünüm Ayarları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="primaryColor"
                        className="text-sm font-medium"
                      >
                        Ana Renk
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          name="primaryColor"
                          type="color"
                          value={appearanceSettings.primaryColor}
                          onChange={handleAppearanceChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={appearanceSettings.primaryColor}
                          onChange={handleAppearanceChange}
                          name="primaryColor"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="secondaryColor"
                        className="text-sm font-medium"
                      >
                        İkincil Renk
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          name="secondaryColor"
                          type="color"
                          value={appearanceSettings.secondaryColor}
                          onChange={handleAppearanceChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={appearanceSettings.secondaryColor}
                          onChange={handleAppearanceChange}
                          name="secondaryColor"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="accentColor"
                        className="text-sm font-medium"
                      >
                        Vurgu Rengi
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="accentColor"
                          name="accentColor"
                          type="color"
                          value={appearanceSettings.accentColor}
                          onChange={handleAppearanceChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={appearanceSettings.accentColor}
                          onChange={handleAppearanceChange}
                          name="accentColor"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="logoUrl" className="text-sm font-medium">
                      Logo URL
                    </label>
                    <Input
                      id="logoUrl"
                      name="logoUrl"
                      value={appearanceSettings.logoUrl}
                      onChange={handleAppearanceChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="faviconUrl" className="text-sm font-medium">
                      Favicon URL
                    </label>
                    <Input
                      id="faviconUrl"
                      name="faviconUrl"
                      value={appearanceSettings.faviconUrl}
                      onChange={handleAppearanceChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={saveSettings} disabled={loading}>
              {loading ? "Kaydediliyor..." : "Ayarları Kaydet"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
