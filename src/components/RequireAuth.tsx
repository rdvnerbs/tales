"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./UserProvider";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const { user, loading } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
        router.push("/login");
      }
      setIsChecking(false);
    }
  }, [user, loading, router]);

  // Yükleme durumunda veya kontrol devam ediyorsa yükleme göster
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Kullanıcı giriş yapmışsa içeriği göster
  return user ? <>{children}</> : null;
}
