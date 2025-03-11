import { supabase } from "./supabase-client";

// Kategorileri getir
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Kategorileri getirme hatası:", error);
    return [];
  }

  return data;
}

// Belirli bir kategoriyi getir
export async function getCategory(id: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Kategori getirme hatası:", error);
    return null;
  }

  return data;
}

// Hikayeleri getir
export async function getStories() {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Hikayeleri getirme hatası:", error);
    return [];
  }

  return data;
}

// Popüler hikayeleri getir
export async function getPopularStories(limit = 5) {
  const { data, error } = await supabase
    .from("stories")
    .select("*, stats!inner(*)")
    .order("views", { foreignTable: "stats", ascending: false })
    .limit(limit);

  if (error) {
    console.error("Popüler hikayeleri getirme hatası:", error);
    return [];
  }

  return data;
}

// Belirli bir hikayeyi getir
export async function getStory(id: string) {
  const { data, error } = await supabase
    .from("stories")
    .select("*, stats(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Hikaye getirme hatası:", error);
    return null;
  }

  // Görüntülenme sayısını artır
  await incrementStoryViews(id);

  return data;
}

// Belirli bir kategoriye ait hikayeleri getir
export async function getStoriesByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Kategori hikayelerini getirme hatası:", error);
    return [];
  }

  return data;
}

// Hikaye görüntülenme sayısını artır
export async function incrementStoryViews(storyId: string) {
  const { error } = await supabase.rpc("increment_story_views", {
    story_id: storyId,
  });

  if (error) {
    console.error("Görüntülenme sayısını artırma hatası:", error);
  }
}

// Hikaye beğeni sayısını artır/azalt
export async function toggleStoryLike(
  storyId: string,
  userId: string,
  isLiked: boolean,
) {
  // Kullanıcı hikaye ilişkisini güncelle
  const { error: userStoryError } = await supabase.from("user_stories").upsert({
    user_id: userId,
    story_id: storyId,
    is_favorite: isLiked,
  });

  if (userStoryError) {
    console.error(
      "Kullanıcı hikaye ilişkisi güncelleme hatası:",
      userStoryError,
    );
    return false;
  }

  // İstatistikleri güncelle
  const { error: statsError } = await supabase.rpc(
    isLiked ? "increment_story_likes" : "decrement_story_likes",
    { story_id: storyId },
  );

  if (statsError) {
    console.error("Beğeni sayısını güncelleme hatası:", statsError);
    return false;
  }

  return true;
}

// Hikaye yer işareti sayısını artır/azalt
export async function toggleStoryBookmark(
  storyId: string,
  userId: string,
  isBookmarked: boolean,
) {
  // Kullanıcı hikaye ilişkisini güncelle
  const { error: userStoryError } = await supabase.from("user_stories").upsert({
    user_id: userId,
    story_id: storyId,
    is_bookmarked: isBookmarked,
  });

  if (userStoryError) {
    console.error(
      "Kullanıcı hikaye ilişkisi güncelleme hatası:",
      userStoryError,
    );
    return false;
  }

  // İstatistikleri güncelle
  const { error: statsError } = await supabase.rpc(
    isBookmarked ? "increment_story_bookmarks" : "decrement_story_bookmarks",
    { story_id: storyId },
  );

  if (statsError) {
    console.error("Yer işareti sayısını güncelleme hatası:", statsError);
    return false;
  }

  return true;
}

// Kullanıcının favori hikayelerini getir
export async function getUserFavoriteStories(userId: string) {
  const { data, error } = await supabase
    .from("user_stories")
    .select("stories(*)")
    .eq("user_id", userId)
    .eq("is_favorite", true);

  if (error) {
    console.error("Favori hikayeleri getirme hatası:", error);
    return [];
  }

  return data.map((item) => item.stories);
}

// Kullanıcının yer işaretli hikayelerini getir
export async function getUserBookmarkedStories(userId: string) {
  const { data, error } = await supabase
    .from("user_stories")
    .select("stories(*)")
    .eq("user_id", userId)
    .eq("is_bookmarked", true);

  if (error) {
    console.error("Yer işaretli hikayeleri getirme hatası:", error);
    return [];
  }

  return data.map((item) => item.stories);
}

// Kullanıcının son okuduğu hikayeleri getir
export async function getUserRecentlyReadStories(userId: string, limit = 3) {
  const { data, error } = await supabase
    .from("user_stories")
    .select("stories(*), progress, last_read_at")
    .eq("user_id", userId)
    .gt("progress", 0)
    .order("last_read_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Son okunan hikayeleri getirme hatası:", error);
    return [];
  }

  return data.map((item) => ({
    ...item.stories,
    progress: item.progress,
    lastReadAt: item.last_read_at,
  }));
}

// Hikaye arama
export async function searchStories(query: string) {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .or(
      `title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`,
    );

  if (error) {
    console.error("Hikaye arama hatası:", error);
    return [];
  }

  return data;
}
