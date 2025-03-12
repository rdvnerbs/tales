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
import { Card, CardContent } from "@/components/ui/card";
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

import AuthCheck from "@/components/AuthCheck";

export default function AdminCategories() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    age_group: "hepsi",
  });

  const ageGroups = [
    { value: "hepsi", label: "Tüm Yaş Grupları" },
    { value: "3-6", label: "3-6 Yaş" },
    { value: "6-9", label: "6-9 Yaş" },
    { value: "9-12", label: "9-12 Yaş" },
  ];

  useEffect(() => {
    // Doğrudan kategorileri getir, kimlik doğrulama kontrolü yapma
    fetchCategories();
    setLoading(false);
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
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
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: "",
      age_group: "hepsi",
    });
  };

  const handleAddCategory = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([formData])
        .select();

      if (error) throw error;

      fetchCategories();
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Kategori ekleme hatası:", error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const { error } = await supabase
        .from("categories")
        .update(formData)
        .eq("id", currentCategory.id);

      if (error) throw error;

      fetchCategories();
      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Kategori güncelleme hatası:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", currentCategory.id);

      if (error) throw error;

      fetchCategories();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Kategori silme hatası:", error);
    }
  };

  const openEditDialog = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      age_group: category.age_group || "hepsi",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category) => {
    setCurrentCategory(category);
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
    <AuthCheck adminOnly={true}>
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />

        <div className="flex-1">
          <AdminHeader title="Kategoriler" />

          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Kategoriler</h1>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    <span>Yeni Kategori</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Kategori Ekle</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Kategori Adı
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
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
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="image" className="text-sm font-medium">
                        Resim URL
                      </label>
                      <Input
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="age_group"
                        className="text-sm font-medium"
                      >
                        Yaş Grubu
                      </label>
                      <Select
                        value={formData.age_group}
                        onValueChange={(value) =>
                          handleSelectChange("age_group", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Yaş grubu seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageGroups.map((group) => (
                            <SelectItem key={group.value} value={group.value}>
                              {group.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">İptal</Button>
                    </DialogClose>
                    <Button onClick={handleAddCategory}>Ekle</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kategori Adı</TableHead>
                      <TableHead>Açıklama</TableHead>
                      <TableHead>Yaş Grubu</TableHead>
                      <TableHead>Hikaye Sayısı</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">
                            {category.name}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {category.description}
                          </TableCell>
                          <TableCell>
                            {ageGroups.find(
                              (g) => g.value === category.age_group,
                            )?.label || "Tüm Yaş Grupları"}
                          </TableCell>
                          <TableCell>{category.count || 0}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  router.push(`/category/${category.id}`)
                                }
                              >
                                <Eye size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(category)}
                              >
                                <Pencil size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => openDeleteDialog(category)}
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
                          colSpan={5}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Henüz kategori bulunmuyor.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kategori Düzenle</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-name" className="text-sm font-medium">
                      Kategori Adı
                    </label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
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
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-image" className="text-sm font-medium">
                      Resim URL
                    </label>
                    <Input
                      id="edit-image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="edit-age_group"
                      className="text-sm font-medium"
                    >
                      Yaş Grubu
                    </label>
                    <Select
                      value={formData.age_group}
                      onValueChange={(value) =>
                        handleSelectChange("age_group", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Yaş grubu seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map((group) => (
                          <SelectItem key={group.value} value={group.value}>
                            {group.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">İptal</Button>
                  </DialogClose>
                  <Button onClick={handleEditCategory}>Kaydet</Button>
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
                  <DialogTitle>Kategori Sil</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Bu kategoriyi silmek istediğinizden emin misiniz?</p>
                  <p className="font-medium mt-2">{currentCategory?.name}</p>
                  <p className="text-sm text-destructive mt-2">
                    Not: Bu kategoriye ait hikayeler de silinecektir.
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">İptal</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDeleteCategory}>
                    Sil
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </AuthCheck>
  );
}
