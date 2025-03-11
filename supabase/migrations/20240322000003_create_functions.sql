-- Hikaye görüntülenme sayısını artırmak için fonksiyon
CREATE OR REPLACE FUNCTION increment_story_views(story_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Hikaye tablosundaki görüntülenme sayısını artır
  UPDATE stories SET views = views + 1 WHERE id = story_id;
  
  -- İstatistik tablosundaki görüntülenme sayısını artır
  UPDATE stats SET views = views + 1 WHERE story_id = story_id;
  
  -- Eğer istatistik kaydı yoksa oluştur
  IF NOT FOUND THEN
    INSERT INTO stats (story_id, views) VALUES (story_id, 1);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Hikaye beğeni sayısını artırmak için fonksiyon
CREATE OR REPLACE FUNCTION increment_story_likes(story_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Hikaye tablosundaki beğeni sayısını artır
  UPDATE stories SET likes = likes + 1 WHERE id = story_id;
  
  -- İstatistik tablosundaki beğeni sayısını artır
  UPDATE stats SET likes = likes + 1 WHERE story_id = story_id;
  
  -- Eğer istatistik kaydı yoksa oluştur
  IF NOT FOUND THEN
    INSERT INTO stats (story_id, likes) VALUES (story_id, 1);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Hikaye beğeni sayısını azaltmak için fonksiyon
CREATE OR REPLACE FUNCTION decrement_story_likes(story_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Hikaye tablosundaki beğeni sayısını azalt (0'dan küçük olmamasını sağla)
  UPDATE stories SET likes = GREATEST(0, likes - 1) WHERE id = story_id;
  
  -- İstatistik tablosundaki beğeni sayısını azalt
  UPDATE stats SET likes = GREATEST(0, likes - 1) WHERE story_id = story_id;
END;
$$ LANGUAGE plpgsql;

-- Hikaye yer işareti sayısını artırmak için fonksiyon
CREATE OR REPLACE FUNCTION increment_story_bookmarks(story_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Hikaye tablosundaki yer işareti sayısını artır
  UPDATE stories SET bookmarks = bookmarks + 1 WHERE id = story_id;
  
  -- İstatistik tablosundaki yer işareti sayısını artır
  UPDATE stats SET bookmarks = bookmarks + 1 WHERE story_id = story_id;
  
  -- Eğer istatistik kaydı yoksa oluştur
  IF NOT FOUND THEN
    INSERT INTO stats (story_id, bookmarks) VALUES (story_id, 1);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Hikaye yer işareti sayısını azaltmak için fonksiyon
CREATE OR REPLACE FUNCTION decrement_story_bookmarks(story_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Hikaye tablosundaki yer işareti sayısını azalt (0'dan küçük olmamasını sağla)
  UPDATE stories SET bookmarks = GREATEST(0, bookmarks - 1) WHERE id = story_id;
  
  -- İstatistik tablosundaki yer işareti sayısını azalt
  UPDATE stats SET bookmarks = GREATEST(0, bookmarks - 1) WHERE story_id = story_id;
END;
$$ LANGUAGE plpgsql;

-- Hikaye dinleme sayısını artırmak için fonksiyon
CREATE OR REPLACE FUNCTION increment_story_listens(story_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Hikaye tablosundaki dinleme sayısını artır
  UPDATE stories SET listens = listens + 1 WHERE id = story_id;
  
  -- İstatistik tablosundaki dinleme sayısını artır
  UPDATE stats SET listens = listens + 1 WHERE story_id = story_id;
  
  -- Eğer istatistik kaydı yoksa oluştur
  IF NOT FOUND THEN
    INSERT INTO stats (story_id, listens) VALUES (story_id, 1);
  END IF;
END;
$$ LANGUAGE plpgsql;
