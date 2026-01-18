-- =============================================================================
-- SEED DATA: Game Search Application
-- Updated with 13 Split Fiction variants + other games
-- =============================================================================

-- Clear existing data
TRUNCATE public.games CASCADE;

INSERT INTO public.games (title, platform, region, image_url, price_eur, old_price_eur, discount_percent, cashback_eur, likes)
VALUES
  -- ============== SPLIT FICTION (13 variants) ==============
  ('Split Fiction EA App Key (PC) GLOBAL', 'EA App', 'GLOBAL', '/images/games/split-fiction.jpg', 40.93, 49.99, 18, 4.50, 626),
  ('Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE', 'Xbox Live', 'EUROPE', '/images/games/split-fiction.jpg', 34.14, 49.99, 32, 3.76, 500),
  ('Split Fiction (Xbox Series X|S) XBOX LIVE Key GLOBAL', 'Xbox Live', 'GLOBAL', '/images/games/split-fiction.jpg', 35.15, 49.99, 30, 3.87, 1039),
  ('Split Fiction (Nintendo Switch 2) eShop Key EUROPE', 'Nintendo eShop', 'EUROPE', '/images/games/split-fiction.jpg', 36.25, NULL, NULL, 3.99, 288),
  ('Split Fiction Steam Key GLOBAL', 'Steam', 'GLOBAL', '/images/games/split-fiction.jpg', 38.99, 49.99, 22, 4.29, 1523),
  ('Split Fiction Steam Key EUROPE', 'Steam', 'EUROPE', '/images/games/split-fiction.jpg', 37.50, 49.99, 25, 4.13, 892),
  ('Split Fiction PlayStation 5 Key EUROPE', 'PlayStation Network', 'EUROPE', '/images/games/split-fiction.jpg', 42.99, 59.99, 28, 4.73, 734),
  ('Split Fiction PlayStation 5 Key GLOBAL', 'PlayStation Network', 'GLOBAL', '/images/games/split-fiction.jpg', 44.99, 59.99, 25, 4.95, 612),
  ('Split Fiction Deluxe Edition EA App Key GLOBAL', 'EA App', 'GLOBAL', '/images/games/split-fiction.jpg', 54.99, 69.99, 21, 6.05, 445),
  ('Split Fiction Ultimate Edition Steam Key GLOBAL', 'Steam', 'GLOBAL', '/images/games/split-fiction.jpg', 64.99, 79.99, 19, 7.15, 321),
  ('Split Fiction + Season Pass Bundle PC', 'EA App', 'GLOBAL', '/images/games/split-fiction.jpg', 72.99, 89.99, 19, 8.03, 198),
  ('Split Fiction Xbox Game Pass Edition', 'Xbox Live', 'GLOBAL', '/images/games/split-fiction.jpg', 29.99, 39.99, 25, 3.30, 876),
  ('Split Fiction Standard Edition Origin Key', 'EA App', 'EUROPE', '/images/games/split-fiction.jpg', 33.49, 44.99, 26, 3.68, 567),

  -- ============== REQUIRED GAMES ==============
  ('FIFA 23 EA App Key GLOBAL', 'EA App', 'GLOBAL', '/images/games/fifa-23.jpg', 19.99, 59.99, 67, 2.20, 1245),
  ('FIFA 23 Steam Key EUROPE', 'Steam', 'EUROPE', '/images/games/fifa-23.jpg', 17.99, 59.99, 70, 1.98, 987),
  ('Red Dead Redemption 2 Steam Key GLOBAL', 'Steam', 'GLOBAL', '/images/games/red-dead-redemption-2.jpg', 29.99, 59.99, 50, 3.30, 3420),
  ('Red Dead Redemption 2 PlayStation 4 Key', 'PlayStation Network', 'GLOBAL', '/images/games/red-dead-redemption-2.jpg', 24.99, 49.99, 50, 2.75, 2890),

  -- ============== OTHER POPULAR GAMES ==============
  ('Elden Ring Steam Key GLOBAL', 'Steam', 'GLOBAL', '/placeholder-game.png', 44.99, 59.99, 25, 4.95, 5678),
  ('God of War Ragnarök Steam Key GLOBAL', 'Steam', 'GLOBAL', '/placeholder-game.png', 39.99, 59.99, 33, 4.40, 4521),
  ('Hogwarts Legacy Steam Key EUROPE', 'Steam', 'EUROPE', '/placeholder-game.png', 34.99, 69.99, 50, 3.85, 3890),
  ('Cyberpunk 2077 Steam Key GLOBAL', 'Steam', 'GLOBAL', '/placeholder-game.png', 24.99, 59.99, 58, 2.75, 6234),
  ('The Witcher 3: Wild Hunt Steam Key GLOBAL', 'Steam', 'GLOBAL', '/placeholder-game.png', 9.99, 29.99, 67, 1.10, 8901),
  ('Baldur''s Gate 3 Steam Key GLOBAL', 'Steam', 'GLOBAL', '/placeholder-game.png', 54.99, NULL, NULL, 6.05, 7823),
  ('GTA V Steam Key GLOBAL', 'Steam', 'GLOBAL', '/placeholder-game.png', 14.99, 29.99, 50, 1.65, 12456),
  ('Forza Horizon 5 Xbox Live Key GLOBAL', 'Xbox Live', 'GLOBAL', '/placeholder-game.png', 39.99, 69.99, 43, 4.40, 2345),
  ('Starfield Xbox Live Key EUROPE', 'Xbox Live', 'EUROPE', '/placeholder-game.png', 49.99, NULL, NULL, 5.50, 1567),
  ('Halo Infinite Xbox Live Key GLOBAL', 'Xbox Live', 'GLOBAL', '/placeholder-game.png', 29.99, 59.99, 50, 3.30, 3210),
  ('Spider-Man 2 PlayStation Network Key EUROPE', 'PlayStation Network', 'EUROPE', '/placeholder-game.png', 59.99, NULL, NULL, 6.60, 2890),
  ('Call of Duty: Modern Warfare III Battle.net Key', 'Battle.net', 'GLOBAL', '/placeholder-game.png', 59.99, NULL, NULL, 6.60, 2678),
  ('Diablo IV Battle.net Key GLOBAL', 'Battle.net', 'GLOBAL', '/placeholder-game.png', 44.99, 69.99, 36, 4.95, 3456);
