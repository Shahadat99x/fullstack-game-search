-- =============================================================================
-- SEED DATA: Game Search Application
-- Phase 2: 20 games with realistic variety
-- =============================================================================

INSERT INTO public.games (title, platform, region, image_url, price_eur, old_price_eur, discount_percent, cashback_eur, likes)
VALUES
  -- ============== REQUIRED GAMES ==============
  ('FIFA 23', 'EA App', 'GLOBAL', '/placeholder-game.png', 19.99, 59.99, 67, 0.50, 1245),
  ('Red Dead Redemption 2', 'Steam', 'GLOBAL', '/placeholder-game.png', 29.99, 59.99, 50, 0.75, 3420),
  ('Split Fiction', 'EA App', 'EUROPE', '/placeholder-game.png', 34.99, NULL, NULL, 0.87, 892),

  -- ============== STEAM GAMES ==============
  ('Elden Ring', 'Steam', 'GLOBAL', '/placeholder-game.png', 44.99, 59.99, 25, 1.12, 5678),
  ('God of War Ragnarök', 'Steam', 'GLOBAL', '/placeholder-game.png', 39.99, 59.99, 33, 1.00, 4521),
  ('Hogwarts Legacy', 'Steam', 'EUROPE', '/placeholder-game.png', 34.99, 69.99, 50, 0.87, 3890),
  ('Cyberpunk 2077', 'Steam', 'GLOBAL', '/placeholder-game.png', 24.99, 59.99, 58, 0.62, 6234),
  ('The Witcher 3: Wild Hunt', 'Steam', 'GLOBAL', '/placeholder-game.png', 9.99, 29.99, 67, 0.25, 8901),
  ('Baldur''s Gate 3', 'Steam', 'GLOBAL', '/placeholder-game.png', 54.99, NULL, NULL, 1.37, 7823),
  ('GTA V', 'Steam', 'GLOBAL', '/placeholder-game.png', 14.99, 29.99, 50, 0.37, 12456),

  -- ============== XBOX LIVE GAMES ==============
  ('Forza Horizon 5', 'Xbox Live', 'GLOBAL', '/placeholder-game.png', 39.99, 69.99, 43, 1.00, 2345),
  ('Starfield', 'Xbox Live', 'EUROPE', '/placeholder-game.png', 49.99, NULL, NULL, 1.25, 1567),
  ('Halo Infinite', 'Xbox Live', 'GLOBAL', '/placeholder-game.png', 29.99, 59.99, 50, 0.75, 3210),
  ('Sea of Thieves', 'Xbox Live', 'GLOBAL', '/placeholder-game.png', 19.99, 39.99, 50, 0.50, 4567),

  -- ============== PLAYSTATION NETWORK ==============
  ('Spider-Man 2', 'PlayStation Network', 'EUROPE', '/placeholder-game.png', 59.99, NULL, NULL, 1.50, 2890),
  ('The Last of Us Part II', 'PlayStation Network', 'GLOBAL', '/placeholder-game.png', 29.99, 49.99, 40, 0.75, 5432),
  ('Ghost of Tsushima', 'PlayStation Network', 'GLOBAL', '/placeholder-game.png', 34.99, 59.99, 42, 0.87, 4123),

  -- ============== OTHER PLATFORMS ==============
  ('Assassin''s Creed Mirage', 'Ubisoft Connect', 'EUROPE', '/placeholder-game.png', 29.99, 49.99, 40, 0.75, 1890),
  ('Diablo IV', 'Battle.net', 'GLOBAL', '/placeholder-game.png', 44.99, 69.99, 36, 1.12, 3456),
  ('Call of Duty: Modern Warfare III', 'Battle.net', 'GLOBAL', '/placeholder-game.png', 59.99, NULL, NULL, 1.50, 2678);
