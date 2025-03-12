"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, User } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

import AuthCheck from "@/components/AuthCheck";

export default function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    avatar_url: "",
  });

  useEffect(() => {
    fetchUsers();
    setLoading(false);
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Kullanıcıları getirme hatası:", error);
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
      email: "",
      role: "user",
      avatar_url: "",
    });
  };

  const handleAddUser = async () => {
    try {
      // Kullanıcı ekle
      const { data, error } = await supabase.from("users").insert([
        {
          id: crypto.randomUUID(),
          ...formData,
        },
      ]);

      if (error) throw error;

      fetchUsers();
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Kullanıcı ekleme hatası:", error);
    }
  };

  const handleEditUser = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update(formData)
        .eq("id", currentUser.id);

      if (error) throw error;

      fetchUsers();
      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Kullanıcı güncelleme hatası:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      // Önce kullanıcı hikaye ilişkilerini sil
      const { error: userStoryError } = await supabase
        .from("user_stories")
        .delete()
        .eq("user_id", currentUser.id);

      if (userStoryError) throw userStoryError;

      // Sonra kullanıcıyı sil
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", currentUser.id);

      if (error) throw error;

      fetchUsers();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Kullanıcı silme hatası:", error);
    }
  };

  const openEditDialog = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      avatar_url: user.avatar_url || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user) => {
    setCurrentUser(user);
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
          <AdminHeader title="Kullanıcılar" />

          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Kullanıcılar</h1>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    <span>Yeni Kullanıcı</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Ad Soyad
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
                      <label htmlFor="email" className="text-sm font-medium">
                        E-posta
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">
                        Rol
                      </label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) =>
                          handleSelectChange("role", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rol seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Kullanıcı</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
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
                        value={formData.avatar_url}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">İptal</Button>
                    </DialogClose>
                    <Button onClick={handleAddUser}>Ekle</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Soyad</TableHead>
                      <TableHead>E-posta</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Kayıt Tarihi</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {user.avatar_url ? (
                                <img
                                  src={user.avatar_url}
                                  alt={user.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                  <User size={14} />
                                </div>
                              )}
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${user.role === "admin" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"}`}
                            >
                              {user.role === "admin" ? "Admin" : "Kullanıcı"}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString(
                              "tr-TR",
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(user)}
                              >
                                <Pencil size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => openDeleteDialog(user)}
                                disabled={user.role === "admin"} // Admin kullanıcıları silinemez
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
                          Henüz kullanıcı bulunmuyor.
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
                  <DialogTitle>Kullanıcı Düzenle</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-name" className="text-sm font-medium">
                      Ad Soyad
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
                    <label htmlFor="edit-email" className="text-sm font-medium">
                      E-posta
                    </label>
                    <Input
                      id="edit-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-role" className="text-sm font-medium">
                      Rol
                    </label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        handleSelectChange("role", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rol seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Kullanıcı</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="edit-avatar_url"
                      className="text-sm font-medium"
                    >
                      Profil Resmi URL
                    </label>
                    <Input
                      id="edit-avatar_url"
                      name="avatar_url"
                      value={formData.avatar_url}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">İptal</Button>
                  </DialogClose>
                  <Button onClick={handleEditUser}>Kaydet</Button>
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
                  <DialogTitle>Kullanıcı Sil</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Bu kullanıcıyı silmek istediğinizden emin misiniz?</p>
                  <p className="font-medium mt-2">{currentUser?.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentUser?.email}
                  </p>
                  <p className="text-sm text-destructive mt-2">
                    Not: Bu işlem geri alınamaz ve kullanıcının tüm verileri
                    silinecektir.
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">İptal</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDeleteUser}>
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
