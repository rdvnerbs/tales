// Çoklu dil desteği için basit bir i18n çözümü

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Desteklenen diller
export const supportedLanguages = [
  { code: "tr", name: "Türkçe" },
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
];

// Çeviriler
const translations: Translations = {
  tr: {
    // Genel
    "app.name": "Masal Dünyası",
    "app.description": "Çocuklar için interaktif masal okuma uygulaması",
    "app.footer": "© 2023 Masal Dünyası. Tüm hakları saklıdır.",

    // Ana sayfa
    "home.popular": "Popüler Masallar",
    "home.popular.description": "En çok okunan ve sevilen masallar",
    "home.categories": "Kategoriler",
    "home.categories.viewAll": "Tümünü Gör",
    "home.recentlyRead": "Son Okuduklarınız",
    "home.recentlyRead.empty": "Henüz hiç hikaye okumadınız.",
    "home.recentlyRead.explore": "Hikayeleri Keşfedin",
    "home.recentlyRead.continue": "Devam Et",
    "home.recentlyRead.completed": "Tamamlandı",

    // Hikaye
    "story.readButton": "Okumaya Başla",
    "story.backButton": "Geri Dön",
    "story.category": "Kategori",
    "story.relatedStories": "Benzer Masallar",
    "story.previousStory": "Önceki Masal",
    "story.nextStory": "Sonraki Masal",
    "story.readTab": "Oku",
    "story.listenTab": "Dinle",
    "story.watchTab": "İzle",
    "story.fontSize": "Yazı Boyutu",

    // Kategoriler
    "categories.title": "Kategoriler",
    "categories.stories": "masal",

    // Favoriler ve Yer İşaretleri
    "favorites.title": "Favorilerim",
    "favorites.empty": "Henüz favori masalınız bulunmuyor.",
    "favorites.empty.description":
      "Beğendiğiniz masalları favorilere eklemek için kalp simgesine tıklayın.",
    "bookmarks.title": "Yer İşaretlerim",
    "bookmarks.empty": "Henüz yer işareti eklediğiniz masal bulunmuyor.",
    "bookmarks.empty.description":
      "Daha sonra okumak istediğiniz masalları yer işaretlerine eklemek için yer işareti simgesine tıklayın.",

    // Arama
    "search.title": "Arama Sonuçları",
    "search.placeholder": "Masal ara...",
    "search.results": "için sonuç bulundu",
    "search.noResults": "Aramanızla eşleşen masal bulunamadı.",
    "search.noResults.description":
      "Farklı anahtar kelimeler deneyebilir veya kategorilere göz atabilirsiniz.",

    // Admin
    "admin.dashboard": "Dashboard",
    "admin.stories": "Hikayeler",
    "admin.categories": "Kategoriler",
    "admin.users": "Kullanıcılar",
    "admin.settings": "Ayarlar",
    "admin.analytics": "Analitik",

    // Butonlar
    "button.add": "Ekle",
    "button.edit": "Düzenle",
    "button.delete": "Sil",
    "button.save": "Kaydet",
    "button.cancel": "İptal",
    "button.confirm": "Onayla",
    "button.viewAll": "Tümünü Gör",
  },
  en: {
    // General
    "app.name": "Fairy Tale World",
    "app.description": "Interactive fairy tale reading app for children",
    "app.footer": "© 2023 Fairy Tale World. All rights reserved.",

    // Home page
    "home.popular": "Popular Stories",
    "home.popular.description": "Most read and loved stories",
    "home.categories": "Categories",
    "home.categories.viewAll": "View All",
    "home.recentlyRead": "Recently Read",
    "home.recentlyRead.empty": "You haven't read any stories yet.",
    "home.recentlyRead.explore": "Explore Stories",
    "home.recentlyRead.continue": "Continue",
    "home.recentlyRead.completed": "Completed",

    // Story
    "story.readButton": "Start Reading",
    "story.backButton": "Go Back",
    "story.category": "Category",
    "story.relatedStories": "Related Stories",
    "story.previousStory": "Previous Story",
    "story.nextStory": "Next Story",
    "story.readTab": "Read",
    "story.listenTab": "Listen",
    "story.watchTab": "Watch",
    "story.fontSize": "Font Size",

    // Categories
    "categories.title": "Categories",
    "categories.stories": "stories",

    // Favorites and Bookmarks
    "favorites.title": "My Favorites",
    "favorites.empty": "You don't have any favorite stories yet.",
    "favorites.empty.description":
      "Click on the heart icon to add stories to your favorites.",
    "bookmarks.title": "My Bookmarks",
    "bookmarks.empty": "You don't have any bookmarked stories yet.",
    "bookmarks.empty.description":
      "Click on the bookmark icon to add stories to your bookmarks for later reading.",

    // Search
    "search.title": "Search Results",
    "search.placeholder": "Search for stories...",
    "search.results": "results found for",
    "search.noResults": "No stories found matching your search.",
    "search.noResults.description":
      "You can try different keywords or browse categories.",

    // Admin
    "admin.dashboard": "Dashboard",
    "admin.stories": "Stories",
    "admin.categories": "Categories",
    "admin.users": "Users",
    "admin.settings": "Settings",
    "admin.analytics": "Analytics",

    // Buttons
    "button.add": "Add",
    "button.edit": "Edit",
    "button.delete": "Delete",
    "button.save": "Save",
    "button.cancel": "Cancel",
    "button.confirm": "Confirm",
    "button.viewAll": "View All",
  },
  // Diğer diller için çeviriler eklenebilir
};

// Varsayılan dil
let currentLanguage = "tr";

/**
 * Dil değiştirme fonksiyonu
 * @param lang Dil kodu
 */
export function setLanguage(lang: string) {
  if (translations[lang]) {
    currentLanguage = lang;
    // Dil değiştiğinde localStorage'a kaydet
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
    // Dil değiştiğinde sayfayı yeniden yükle veya bir event yayınla
    document.dispatchEvent(new Event("languageChanged"));
    return true;
  }
  return false;
}

/**
 * Mevcut dili döndürür
 */
export function getLanguage(): string {
  // Tarayıcı tarafında çalışıyorsa localStorage'dan dil tercihini al
  if (typeof window !== "undefined") {
    const savedLang = localStorage.getItem("language");
    if (savedLang && translations[savedLang]) {
      currentLanguage = savedLang;
    }
  }
  return currentLanguage;
}

/**
 * Çeviri fonksiyonu
 * @param key Çeviri anahtarı
 * @param params Değiştirilecek parametreler
 */
export function t(key: string, params: Record<string, string> = {}): string {
  const lang = getLanguage();
  let text = translations[lang]?.[key] || translations["tr"][key] || key;

  // Parametreleri değiştir
  Object.keys(params).forEach((param) => {
    text = text.replace(`{${param}}`, params[param]);
  });

  return text;
}

/**
 * Sayfa yüklendiğinde dil tercihini kontrol et
 */
export function initLanguage() {
  if (typeof window !== "undefined") {
    const savedLang = localStorage.getItem("language");
    if (savedLang && translations[savedLang]) {
      currentLanguage = savedLang;
    } else {
      // Tarayıcı dilini kontrol et
      const browserLang = navigator.language.split("-")[0];
      if (translations[browserLang]) {
        currentLanguage = browserLang;
        localStorage.setItem("language", browserLang);
      }
    }
  }
}
