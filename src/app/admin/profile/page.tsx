"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserProvider";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminProfilePage() {
  const router = useRouter();
  const { user, loading, signOut, role } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar_url: "",
    role: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!user && !loading) {
      router.push("/login");
      return;
    }

    // Kullanıcı bilgilerini getir
    if (user) {
      checkAdminRole();
      fetchUserProfile();
    }
  }, [user, loading, router]);

  const checkAdminRole = async () => {
    // Admin değilse ana sayfaya yönlendir
    if (role !== "admin") {
      router.push("/");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setProfileData({
        name: data.name || "",
        email: user.email || "",
        avatar_url: data.avatar_url || "",
        role: data.role || "",
      });
    } catch (error) {
      console.error("Profil bilgileri getirme hatası:", error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const { name, avatar_url } = profileData;

      const { error } = await supabase
        .from("users")
        .update({
          name,
          avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      setSuccess("Profil bilgileriniz başarıyla güncellendi.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Profil güncelleme hatası:", error);
      setError("Profil güncellenirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const { newPassword, confirmPassword } = passwordData;

      if (newPassword !== confirmPassword) {
        throw new Error("Yeni şifreler eşleşmiyor");
      }

      if (newPassword.length < 6) {
        throw new Error("Şifre en az 6 karakter olmalıdır");
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setSuccess("Şifreniz başarıyla güncellendi.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Şifre güncelleme hatası:", error);
      setError(error.message || "Şifre güncellenirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
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
        <AdminHeader title="Profil Ayarları" />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Admin Profil Ayarları</h1>
            <p className="text-muted-foreground">
              Hesap bilgilerinizi ve şifrenizi yönetin
            </p>
          </div>

          {success && (
            <Alert className="mb-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-600 dark:text-green-400">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button
                      variant={activeTab === "profile" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("profile")}
                    >
                      Profil Bilgileri
                    </Button>
                    <Button
                      variant={activeTab === "password" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("password")}
                    >
                      Şifre Değiştir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Bilgileri</CardTitle>
                    <CardDescription>
                      Kişisel bilgilerinizi güncelleyin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          E-posta
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className="bg-muted/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium">
                          Rol
                        </label>
                        <Input
                          id="role"
                          name="role"
                          value={profileData.role}
                          disabled
                          className="bg-muted/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Ad Soyad
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="avatar_url"
                          className="text-sm font-medium"
                        >
                          Profil Resmi URL
                        </label>
                        <Input
                          id="avatar_url"
                          name="avatar_url"
                          value={profileData.avatar_url}
                          onChange={handleProfileChange}
                          placeholder="https://example.com/avatar.jpg"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="mt-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Kaydediliyor..."
                          : "Değişiklikleri Kaydet"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeTab === "password" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Şifre Değiştir</CardTitle>
                    <CardDescription>
                      Hesabınızın güvenliği için şifrenizi düzenli olarak
                      değiştirin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="currentPassword"
                          className="text-sm font-medium"
                        >
                          Mevcut Şifre
                        </label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="newPassword"
                          className="text-sm font-medium"
                        >
                          Yeni Şifre
                        </label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={6}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium"
                        >
                          Yeni Şifre (Tekrar)
                        </label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={6}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="mt-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
