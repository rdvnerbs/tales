"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./UserProvider";

interface AuthCheckProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function AuthCheck({
  children,
  adminOnly = false,
}: AuthCheckProps) {
  const router = useRouter();
  const { user, loading, role } = useUser();
  const [isAdmin, setIsAdmin] = useState(role === "admin");
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        if (!user) {
          // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
          router.push("/login");
        } else if (adminOnly) {
          // Admin kontrolü yap
          if (role === "admin") {
            setIsAdmin(true);
          } else {
            // Admin değilse ana sayfaya yönlendir
            router.push("/");
          }
        }
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [user, loading, router, adminOnly, role]);

  // Yükleme durumunda veya kontrol devam ediyorsa yükleme göster
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Admin kontrolü gerekiyorsa ve kullanıcı admin değilse null döndür
  if (adminOnly && !isAdmin) {
    return null;
  }

  // Kullanıcı giriş yapmışsa ve gerekli kontroller geçildiyse içeriği göster
  return <>{children}</>;
}
