/**
 * Ziyaretçi bilgilerini takip eder
 */
export async function trackVisitor() {
  try {
    // Eğer API endpoint'i mevcut değilse veya geliştirme ortamındaysa
    // sessizce başarılı olarak dön
    if (typeof window === "undefined") {
      return { success: true };
    }

    // Tarayıcı bilgilerini al
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const referrer = document.referrer;
    const page = window.location.pathname;

    // IP adresini almak için harici bir servis kullanılabilir
    // Burada basitlik için sabit bir değer kullanıyoruz
    const ip = "127.0.0.1";

    try {
      const response = await fetch("/api/track-visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip,
          userAgent,
          language,
          referrer,
          page,
        }),
      });

      if (!response.ok) {
        console.log("Response not OK in trackVisitor:", response.status);
        return { success: false };
      }

      return await response.json();
    } catch (fetchError) {
      console.log("Fetch error in trackVisitor:", fetchError);
      return { success: false, error: fetchError };
    }
  } catch (error) {
    // Hata durumunda sessizce başarılı dön
    console.error("Error tracking visitor:", error);
    return { success: false, error: error };
  }
}
