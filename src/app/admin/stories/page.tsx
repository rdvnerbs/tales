"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminStories() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    cover_image: "",
    category_id: "",
    category: "",
    read_time: 5,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      // Kullanıcının admin olup olmadığını kontrol et
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (userError || userData?.role !== "admin") {
        await supabase.auth.signOut();
        router.push("/login");
        return;
      }

      fetchStories();
      fetchCategories();
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from("stories")
        .select("*, categories(name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error("Hikayeleri getirme hatası:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Kategorileri getirme hatası:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    // Kategori ID seçildiğinde kategori adını da al
    if (name === "category_id") {
      const selectedCategory = categories.find((cat) => cat.id === value);
      if (selectedCategory) {
        setFormData((prev) => ({ ...prev, category: selectedCategory.name }));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      cover_image: "",
      category_id: "",
      category: "",
      read_time: 5,
    });
  };

  const handleAddStory = async () => {
    try {
      const { data, error } = await supabase
        .from("stories")
        .insert([formData])
        .select();

      if (error) throw error;

      fetchStories();
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Hikaye ekleme hatası:", error);
    }
  };

  const handleEditStory = async () => {
    try {
      const { error } = await supabase
        .from("stories")
        .update(formData)
        .eq("id", currentStory.id);

      if (error) throw error;

      fetchStories();
      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Hikaye güncelleme hatası:", error);
    }
  };

  const handleDeleteStory = async () => {
    try {
      const { error } = await supabase
        .from("stories")
        .delete()
        .eq("id", currentStory.id);

      if (error) throw error;

      fetchStories();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Hikaye silme hatası:", error);
    }
  };

  const openEditDialog = (story) => {
    setCurrentStory(story);
    setFormData({
      title: story.title,
      description: story.description || "",
      content: story.content || "",
      cover_image: story.cover_image || "",
      category_id: story.category_id || "",
      category: story.category || "",
      read_time: story.read_time || 5,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (story) => {
    setCurrentStory(story);
    setIsDeleteDialogOpen(true);
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
        <AdminHeader title="Hikayeler" />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Hikayeler</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  <span>Yeni Hikaye</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Hikaye Ekle</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Başlık
                      </label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="category_id"
                        className="text-sm font-medium"
                      >
                        Kategori
                      </label>
                      <Select
                        value={formData.category_id}
                        onValueChange={(value) =>
                          handleSelectChange("category_id", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Açıklama
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">
                      İçerik (HTML)
                    </label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={8}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="cover_image"
                        className="text-sm font-medium"
                      >
                        Kapak Resmi URL
                      </label>
                      <Input
                        id="cover_image"
                        name="cover_image"
                        value={formData.cover_image}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="read_time"
                        className="text-sm font-medium"
                      >
                        Okuma Süresi (dk)
                      </label>
                      <Input
                        id="read_time"
                        name="read_time"
                        type="number"
                        value={formData.read_time}
                        onChange={handleInputChange}
                        min="1"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">İptal</Button>
                  </DialogClose>
                  <Button onClick={handleAddStory}>Ekle</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Okuma Süresi</TableHead>
                    <TableHead>Görüntülenme</TableHead>
                    <TableHead>Beğeni</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stories.length > 0 ? (
                    stories.map((story) => (
                      <TableRow key={story.id}>
                        <TableCell className="font-medium">
                          {story.title}
                        </TableCell>
                        <TableCell>
                          {story.category ||
                            (story.categories && story.categories.name)}
                        </TableCell>
                        <TableCell>{story.read_time || 5} dk</TableCell>
                        <TableCell>{story.views || 0}</TableCell>
                        <TableCell>{story.likes || 0}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/story/${story.id}`)}
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(story)}
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => openDeleteDialog(story)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        Henüz hikaye bulunmuyor.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Hikaye Düzenle</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-title" className="text-sm font-medium">
                      Başlık
                    </label>
                    <Input
                      id="edit-title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="edit-category_id"
                      className="text-sm font-medium"
                    >
                      Kategori
                    </label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) =>
                        handleSelectChange("category_id", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="edit-description"
                    className="text-sm font-medium"
                  >
                    Açıklama
                  </label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-content" className="text-sm font-medium">
                    İçerik (HTML)
                  </label>
                  <Textarea
                    id="edit-content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={8}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="edit-cover_image"
                      className="text-sm font-medium"
                    >
                      Kapak Resmi URL
                    </label>
                    <Input
                      id="edit-cover_image"
                      name="cover_image"
                      value={formData.cover_image}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="edit-read_time"
                      className="text-sm font-medium"
                    >
                      Okuma Süresi (dk)
                    </label>
                    <Input
                      id="edit-read_time"
                      name="read_time"
                      type="number"
                      value={formData.read_time}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">İptal</Button>
                </DialogClose>
                <Button onClick={handleEditStory}>Kaydet</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hikaye Sil</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Bu hikayeyi silmek istediğinizden emin misiniz?</p>
                <p className="font-medium mt-2">{currentStory?.title}</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">İptal</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDeleteStory}>
                  Sil
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
