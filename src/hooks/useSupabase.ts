import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mevcut oturumu kontrol et
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);

      // Oturum değişikliklerini dinle
      const {
        data: { subscription },
      } = await supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    };

    checkUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Kullanıcı rolünü kontrol et
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (userError) throw userError;

      return { user: data.user, role: userData?.role || "user", error: null };
    } catch (error) {
      console.error("Giriş hatası:", error);
      return { user: null, role: null, error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      // Kullanıcı profili oluştur
      if (data.user) {
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email,
          name,
          role: "user", // Varsayılan olarak normal kullanıcı
        });

        if (profileError) throw profileError;
      }

      return { user: data.user, error: null };
    } catch (error) {
      console.error("Kayıt hatası:", error);
      return { user: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error("Çıkış hatası:", error);
      return { error };
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
