-- Kategorileri ekle
INSERT INTO categories (name, description, image, count, age_group) VALUES
('Klasik Masallar', 'Nesillerdir anlatılan sevilen klasik masallar', 'https://images.unsplash.com/photo-1618945524163-32451704cbb8?w=300&q=80', 5, 'hepsi'),
('Hayvan Masalları', 'Hayvanların başrolde olduğu eğlenceli hikayeler', 'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=300&q=80', 3, '3-6'),
('Prenses Hikayeleri', 'Prensesler ve sihirli krallıklar hakkında masallar', 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=300&q=80', 3, '6-9'),
('Macera Masalları', 'Heyecan dolu maceralar ve keşifler', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80', 3, '9-12'),
('Öğretici Masallar', 'Değerli hayat dersleri içeren hikayeler', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80', 3, '6-9'),
('Yerel Masallar', 'Anadolu kültüründen gelen geleneksel hikayeler', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=300&q=80', 3, 'hepsi');

-- Hikayeleri ekle
INSERT INTO stories (title, description, content, cover_image, category, read_time) VALUES
('Kırmızı Başlıklı Kız', 'Büyükannesini ziyarete giden küçük bir kızın orman macerasını anlatan klasik bir masal.', '<p>Bir zamanlar, küçük bir köyde Kırmızı Başlıklı Kız adında sevimli bir kız çocuğu yaşarmış. Annesi ona kırmızı bir başlık hediye etmiş ve kız bu başlığı o kadar çok severmiş ki, her yere takıp gidermiş. Bu yüzden herkes ona Kırmızı Başlıklı Kız dermiş.</p><p>Bir gün annesi ona, "Kırmızı Başlıklı Kız, büyükannen hasta. Ona bu çörek ve şarabı götür" demiş. "Ama dikkatli ol, ormandan geçerken yoldan ayrılma ve yabancılarla konuşma."</p><p>Kırmızı Başlıklı Kız yola çıkmış. Ormanda ilerlerken, karşısına kötü kalpli bir kurt çıkmış. Kurt ona nereye gittiğini sormuş. Kırmızı Başlıklı Kız, büyükannesinin hasta olduğunu ve ona yiyecek götürdüğünü söylemiş.</p>', 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=300&q=80', 'Klasik Masallar', 8),
('Uyuyan Güzel', 'Kötü bir büyü sonucu uykuya dalan ve bir prensin öpücüğüyle uyanan prensesin hikayesi.', '<p>Bir varmış bir yokmuş, bir zamanlar bir kral ve kraliçe varmış. Uzun yıllar çocukları olmamış ve sonunda bir kızları olmuş. Doğum gününde büyük bir kutlama düzenlemişler ve ülkedeki tüm perileri davet etmişler.</p><p>Ancak bir peri davet edilmemiş ve çok kızmış. Kutlamaya gelmiş ve bebeğe bir lanet okumuş: "On altı yaşına geldiğinde, bir iğneye dokunacak ve ölecek!"</p>', 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&q=80', 'Klasik Masallar', 10),
('Hansel ve Gretel', 'Ormanda kaybolan ve şekerden yapılmış bir eve rastlayan iki kardeşin macerası.', '<p>Bir zamanlar, ormanın kenarında yaşayan fakir bir oduncu, karısı ve iki çocuğu varmış. Çocukların adları Hansel ve Gretel imiş. Oduncu o kadar fakirmiş ki, ailesini besleyecek yeterli yiyeceği yokmuş.</p>', 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&q=80', 'Klasik Masallar', 7),
('Tavşan ile Kaplumbağa', 'Hızlı tavşan ile yavaş kaplumbağa arasındaki yarışın hikayesi.', '<p>Bir zamanlar, çok hızlı koşan ve bununla övünen bir tavşan varmış. Her zaman diğer hayvanlarla alay eder, özellikle de yavaş hareket eden kaplumbağaya çok takılırmış.</p>', 'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?w=300&q=80', 'Hayvan Masalları', 5),
('Keloğlan ve Sihirli Taş', 'Keloğlan''ın bulduğu sihirli taşla başından geçen maceraları anlatan bir Türk halk masalı.', '<p>Bir varmış bir yokmuş, evvel zaman içinde kalbur saman içinde, bir köyde Keloğlan adında bir delikanlı yaşarmış. Keloğlan''ın saçları dökülmüş olduğundan ona bu isim verilmiş.</p>', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&q=80', 'Yerel Masallar', 6);

-- İstatistikleri ekle
INSERT INTO stats (story_id, views, likes, bookmarks, listens) 
SELECT id, 
  FLOOR(RANDOM() * 1000 + 100)::INTEGER, 
  FLOOR(RANDOM() * 200 + 50)::INTEGER, 
  FLOOR(RANDOM() * 100 + 20)::INTEGER, 
  FLOOR(RANDOM() * 300 + 80)::INTEGER 
FROM stories;
