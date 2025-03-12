-- Geçici UUID'ler oluştur
ALTER TABLE public.user_activities ALTER COLUMN story_id DROP NOT NULL;
ALTER TABLE public.stats ALTER COLUMN story_id DROP NOT NULL;

-- Örnek hikayeler için UUID'ler oluştur
INSERT INTO public.stories (id, title, description, cover_image, category, content)
VALUES 
('00000000-0000-0000-0000-000000000001', 'Kırmızı Başlıklı Kız', 'Büyükannesini ziyarete giden küçük bir kızın orman macerasını anlatan klasik bir masal.', 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=800&q=80', 'Klasik Masallar', '<p>Bir zamanlar, küçük bir köyde Kırmızı Başlıklı Kız adında sevimli bir kız çocuğu yaşarmış...</p>'),
('00000000-0000-0000-0000-000000000002', 'Uyuyan Güzel', 'Kötü bir büyü sonucu uykuya dalan ve bir prensin öpücüğüyle uyanan prensesin hikayesi.', 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=800&q=80', 'Klasik Masallar', '<p>Bir varmış bir yokmuş, bir zamanlar bir kral ve kraliçe varmış...</p>'),
('00000000-0000-0000-0000-000000000003', 'Hansel ve Gretel', 'Ormanda kaybolan ve şekerden yapılmış bir eve rastlayan iki kardeşin macerası.', 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80', 'Klasik Masallar', '<p>Bir zamanlar, ormanın kenarında yaşayan fakir bir oduncu ve iki çocuğu varmış...</p>'),
('00000000-0000-0000-0000-000000000004', 'Rapunzel', 'Uzun saçlı bir kızın kuleden kurtulma hikayesi.', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80', 'Klasik Masallar', '<p>Bir zamanlar, bir adam ve karısı varmış. Uzun zamandır bir çocuk sahibi olmak istiyorlarmış...</p>'),
('00000000-0000-0000-0000-000000000005', 'Külkedisi', 'Üvey annesi ve kız kardeşleri tarafından kötü davranılan genç bir kızın balo hikayesi.', 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&q=80', 'Klasik Masallar', '<p>Bir zamanlar, zengin bir adamın güzel ve iyi kalpli bir kızı varmış...</p>')
ON CONFLICT (id) DO NOTHING;

-- İstatistik kayıtları oluştur
INSERT INTO public.stats (id, story_id, views, likes, bookmarks, listens)
VALUES 
(gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 120, 45, 30, 60),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 95, 38, 25, 42),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000003', 85, 32, 18, 35),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000004', 75, 28, 15, 30),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000005', 110, 50, 35, 55)
ON CONFLICT DO NOTHING;
