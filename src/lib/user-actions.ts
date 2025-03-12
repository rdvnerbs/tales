import { supabase } from "./supabase-client";

/**
 * Kullanıcının bir hikayeyi favorilere eklemesi/çıkarması
 */
export async function toggleFavorite(
  userId: string,
  storyId: string,
  isFavorite: boolean,
) {
  if (!userId || !storyId)
    return { success: false, error: "Kullanıcı veya hikaye ID'si eksik" };

  try {
    // Hikaye ID'sini UUID formatına dönüştür
    let formattedStoryId = storyId;
    if (storyId.startsWith("story-")) {
      formattedStoryId = `00000000-0000-0000-0000-${storyId.replace("story-", "").padStart(12, "0")}`;
    }

    // Kullanıcı-hikaye ilişkisini kontrol et
    const { data: existingRelation, error: checkError } = await supabase
      .from("user_stories")
      .select("*")
      .eq("user_id", userId)
      .eq("story_id", formattedStoryId)
      .maybeSingle();

    if (checkError) {
      console.error("Favori kontrol hatası:", checkError);
      return { success: false, error: checkError };
    }

    // İlişki varsa güncelle, yoksa oluştur
    if (existingRelation) {
      const { error: updateError } = await supabase
        .from("user_stories")
        .update({
          is_favorite: isFavorite,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingRelation.id);

      if (updateError) {
        console.error("Favori güncelleme hatası:", updateError);
        return { success: false, error: updateError };
      }
    } else {
      const { error: insertError } = await supabase
        .from("user_stories")
        .insert({
          user_id: userId,
          story_id: formattedStoryId,
          is_favorite: isFavorite,
          is_bookmarked: false,
          progress: 0,
          last_read_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error("Favori ekleme hatası:", insertError);
        return { success: false, error: insertError };
      }
    }

    // İstatistikleri güncelle
    const functionName = isFavorite
      ? "increment_story_likes"
      : "decrement_story_likes";
    const { error: statsError } = await supabase.rpc(functionName, {
      story_id: formattedStoryId,
    });

    if (statsError) {
      console.error("İstatistik güncelleme hatası:", statsError);
      // İstatistik hatası olsa bile işlemi başarılı say
    }

    return { success: true };
  } catch (error) {
    console.error("Favori işlemi hatası:", error);
    return { success: false, error };
  }
}

/**
 * Kullanıcının bir hikayeyi yer işaretlerine eklemesi/çıkarması
 */
export async function toggleBookmark(
  userId: string,
  storyId: string,
  isBookmarked: boolean,
) {
  if (!userId || !storyId)
    return { success: false, error: "Kullanıcı veya hikaye ID'si eksik" };

  try {
    // Hikaye ID'sini UUID formatına dönüştür
    let formattedStoryId = storyId;
    if (storyId.startsWith("story-")) {
      formattedStoryId = `00000000-0000-0000-0000-${storyId.replace("story-", "").padStart(12, "0")}`;
    }

    // Kullanıcı-hikaye ilişkisini kontrol et
    const { data: existingRelation, error: checkError } = await supabase
      .from("user_stories")
      .select("*")
      .eq("user_id", userId)
      .eq("story_id", formattedStoryId)
      .maybeSingle();

    if (checkError) {
      console.error("Yer işareti kontrol hatası:", checkError);
      return { success: false, error: checkError };
    }

    // İlişki varsa güncelle, yoksa oluştur
    if (existingRelation) {
      const { error: updateError } = await supabase
        .from("user_stories")
        .update({
          is_bookmarked: isBookmarked,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingRelation.id);

      if (updateError) {
        console.error("Yer işareti güncelleme hatası:", updateError);
        return { success: false, error: updateError };
      }
    } else {
      const { error: insertError } = await supabase
        .from("user_stories")
        .insert({
          user_id: userId,
          story_id: formattedStoryId,
          is_favorite: false,
          is_bookmarked: isBookmarked,
          progress: 0,
          last_read_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error("Yer işareti ekleme hatası:", insertError);
        return { success: false, error: insertError };
      }
    }

    // İstatistikleri güncelle
    const functionName = isBookmarked
      ? "increment_story_bookmarks"
      : "decrement_story_bookmarks";
    const { error: statsError } = await supabase.rpc(functionName, {
      story_id: formattedStoryId,
    });

    if (statsError) {
      console.error("İstatistik güncelleme hatası:", statsError);
      // İstatistik hatası olsa bile işlemi başarılı say
    }

    return { success: true };
  } catch (error) {
    console.error("Yer işareti işlemi hatası:", error);
    return { success: false, error };
  }
}

/**
 * Kullanıcının favori hikayelerini getir
 */
export async function getUserFavorites(userId: string) {
  if (!userId)
    return { success: false, error: "Kullanıcı ID'si eksik", data: [] };

  try {
    const { data, error } = await supabase
      .from("user_stories")
      .select("story_id, stories(*)")
      .eq("user_id", userId)
      .eq("is_favorite", true);

    if (error) {
      console.error("Favori hikayeleri getirme hatası:", error);
      return { success: false, error, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Favori hikayeleri getirme hatası:", error);
    return { success: false, error, data: [] };
  }
}

/**
 * Kullanıcının yer işaretli hikayelerini getir
 */
export async function getUserBookmarks(userId: string) {
  if (!userId)
    return { success: false, error: "Kullanıcı ID'si eksik", data: [] };

  try {
    const { data, error } = await supabase
      .from("user_stories")
      .select("story_id, stories(*)")
      .eq("user_id", userId)
      .eq("is_bookmarked", true);

    if (error) {
      console.error("Yer işaretli hikayeleri getirme hatası:", error);
      return { success: false, error, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Yer işaretli hikayeleri getirme hatası:", error);
    return { success: false, error, data: [] };
  }
}

/**
 * Kullanıcının hikaye durumunu kontrol et (favori ve yer işareti)
 */
export async function checkUserStoryStatus(userId: string, storyId: string) {
  if (!userId || !storyId) {
    return {
      success: false,
      error: "Kullanıcı veya hikaye ID'si eksik",
      isFavorite: false,
      isBookmarked: false,
    };
  }

  try {
    // Hikaye ID'sini UUID formatına dönüştür
    let formattedStoryId = storyId;
    if (storyId.startsWith("story-")) {
      formattedStoryId = `00000000-0000-0000-0000-${storyId.replace("story-", "").padStart(12, "0")}`;
    }

    const { data, error } = await supabase
      .from("user_stories")
      .select("is_favorite, is_bookmarked")
      .eq("user_id", userId)
      .eq("story_id", formattedStoryId)
      .maybeSingle();

    if (error) {
      console.error("Hikaye durumu kontrol hatası:", error);
      return { success: false, error, isFavorite: false, isBookmarked: false };
    }

    return {
      success: true,
      isFavorite: data?.is_favorite || false,
      isBookmarked: data?.is_bookmarked || false,
    };
  } catch (error) {
    console.error("Hikaye durumu kontrol hatası:", error);
    return { success: false, error, isFavorite: false, isBookmarked: false };
  }
}
