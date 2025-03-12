"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabase";

type UserContextType = {
  user: any;
  role: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  signOut: () => Promise<any>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const auth = useSupabaseAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Kullanıcı giriş yaptığında rolünü al
    const checkUserRole = async () => {
      if (auth.user) {
        try {
          const response = await fetch("/api/check-admin-role", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: auth.user.id }),
          });

          const { data } = await response.json();
          if (data && data.role) {
            setRole(data.role);
          } else {
            setRole("user");
          }
        } catch (error) {
          console.error("Rol kontrolü hatası:", error);
          setRole("user");
        }
      } else {
        setRole(null);
      }
    };

    checkUserRole();
  }, [auth.user]);

  const value = {
    ...auth,
    role,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
