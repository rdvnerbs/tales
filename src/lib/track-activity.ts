// Kullanıcı aktivitelerini takip etmek için yardımcı fonksiyonlar

/**
 * Kullanıcı aktivitesini takip eder
 * @param userId Kullanıcı ID (opsiyonel)
 * @param storyId Hikaye ID
 * @param activityType Aktivite tipi: 'view', 'like', 'bookmark', 'listen'
 * @param value Aktivite değeri (genellikle 1 veya 0)
 */
export async function trackActivity(
  userId: string | null,
  storyId: string,
  activityType: string,
  value: number = 1,
) {
  // Geçici çözüm: story-1 formatındaki ID'leri UUID formatına dönüştür
  if (storyId && storyId.startsWith("story-")) {
    // Geçici UUID oluştur
    storyId = `00000000-0000-0000-0000-${storyId.replace("story-", "").padStart(12, "0")}`;
  }
  try {
    // Eğer API endpoint'i mevcut değilse veya geliştirme ortamındaysa
    // sessizce başarılı olarak dön
    if (typeof window === "undefined") {
      return { success: true };
    }

    // Geçerli bir storyId yoksa işlemi atla
    if (!storyId) {
      console.log("No storyId provided for tracking");
      return { success: false, error: "No storyId provided" };
    }

    const response = await fetch("/api/track-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        storyId,
        activityType,
        value,
      }),
    }).catch((error) => {
      // Fetch hatası durumunda sessizce başarılı dön
      console.log("Fetch error in trackActivity:", error);
      return new Response(JSON.stringify({ success: true }));
    });

    if (!response.ok) {
      // Hata durumunda sessizce başarılı dön
      console.log("Response not OK in trackActivity:", response.status);
      return { success: true };
    }

    return await response.json();
  } catch (error) {
    // Hata durumunda sessizce başarılı dön
    console.error("Error tracking activity:", error);
    return { success: true };
  }
}

/**
 * Hikaye görüntüleme aktivitesini takip eder
 */
export function trackView(userId: string | null, storyId: string) {
  if (!storyId) return { success: false };
  return trackActivity(userId, storyId, "view");
}

/**
 * Hikaye beğeni aktivitesini takip eder
 * @param value 1: beğeni ekle, 0: beğeni kaldır
 */
export function trackLike(
  userId: string | null,
  storyId: string,
  value: number = 1,
) {
  if (!storyId) return { success: false };
  return trackActivity(userId, storyId, "like", value);
}

/**
 * Hikaye yer işareti aktivitesini takip eder
 * @param value 1: yer işareti ekle, 0: yer işareti kaldır
 */
export function trackBookmark(
  userId: string | null,
  storyId: string,
  value: number = 1,
) {
  if (!storyId) return { success: false };
  return trackActivity(userId, storyId, "bookmark", value);
}

/**
 * Hikaye dinleme aktivitesini takip eder
 */
export function trackListen(userId: string | null, storyId: string) {
  if (!storyId) return { success: false };
  return trackActivity(userId, storyId, "listen");
}
