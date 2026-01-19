-- =============================================================================
-- SEED DATA: Game Search Application
-- 6 Base Titles with realistic marketplace offers
-- Total: 51 offers with full filter data
-- =============================================================================

-- Clear existing data
TRUNCATE public.games CASCADE;

INSERT INTO public.games (title, platform, region, country, product_type, operating_system, genre, image_url, price_eur, old_price_eur, discount_percent, cashback_eur, likes)
VALUES
  -- =============================================================================
  -- SPLIT FICTION (13 offers) - Genre: Adventure
  -- =============================================================================
  ('Split Fiction EA App Key GLOBAL', 'EA App', 'GLOBAL', 'Lithuania', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 40.93, 49.99, 18, 4.50, 626),
  ('Split Fiction EA App Key EUROPE', 'EA App', 'EUROPE', 'Poland', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 39.49, 49.99, 21, 4.35, 512),
  ('Split Fiction Steam Key GLOBAL', 'Steam', 'GLOBAL', 'Germany', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 38.99, 49.99, 22, 4.29, 1523),
  ('Split Fiction Steam Key EUROPE', 'Steam', 'EUROPE', 'France', 'Game', 'Mac', 'Adventure', '/images/games/split-fiction.jpg', 37.50, 49.99, 25, 4.13, 892),
  ('Split Fiction Xbox Series X|S GLOBAL', 'Xbox Live', 'GLOBAL', 'Spain', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 35.15, 49.99, 30, 3.87, 1039),
  ('Split Fiction Xbox Series X|S EUROPE', 'Xbox Live', 'EUROPE', 'Italy', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 34.14, 49.99, 32, 3.76, 500),
  ('Split Fiction PlayStation 5 Key GLOBAL', 'PlayStation Network', 'GLOBAL', 'United Kingdom', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 44.99, 59.99, 25, 4.95, 612),
  ('Split Fiction PlayStation 5 Key EUROPE', 'PlayStation Network', 'EUROPE', 'United States', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 42.99, 59.99, 28, 4.73, 734),
  ('Split Fiction Nintendo Switch Key EUROPE', 'Nintendo eShop', 'EUROPE', 'Lithuania', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 36.25, NULL, NULL, 3.99, 288),
  ('Split Fiction Deluxe Edition EA App GLOBAL', 'EA App', 'GLOBAL', 'Poland', 'DLC', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 54.99, 69.99, 21, 6.05, 445),
  ('Split Fiction Ultimate Edition Steam GLOBAL', 'Steam', 'GLOBAL', 'Germany', 'DLC', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 64.99, 79.99, 19, 7.15, 321),
  ('Split Fiction + Season Pass Bundle EA App', 'EA App', 'GLOBAL', 'France', 'DLC', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 72.99, 89.99, 19, 8.03, 198),
  ('Split Fiction Standard Edition Origin EUROPE', 'EA App', 'EUROPE', 'Spain', 'Game', 'Windows', 'Adventure', '/images/games/split-fiction.jpg', 33.49, 44.99, 26, 3.68, 567),

  -- =============================================================================
  -- FIFA 23 (10 offers) - Genre: Sports
  -- =============================================================================
  ('FIFA 23 EA App Key GLOBAL', 'EA App', 'GLOBAL', 'Italy', 'Game', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 19.99, 59.99, 67, 2.20, 1245),
  ('FIFA 23 EA App Key EUROPE', 'EA App', 'EUROPE', 'United Kingdom', 'Game', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 18.49, 59.99, 69, 2.03, 1087),
  ('FIFA 23 Steam Key GLOBAL', 'Steam', 'GLOBAL', 'United States', 'Game', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 21.99, 59.99, 63, 2.42, 1456),
  ('FIFA 23 Steam Key EUROPE', 'Steam', 'EUROPE', 'Lithuania', 'Game', 'Mac', 'Sports', '/images/games/fifa-23.jpg', 17.99, 59.99, 70, 1.98, 987),
  ('FIFA 23 Xbox One Key GLOBAL', 'Xbox Live', 'GLOBAL', 'Poland', 'Game', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 22.99, 59.99, 62, 2.53, 876),
  ('FIFA 23 Xbox One Key EUROPE', 'Xbox Live', 'EUROPE', 'Germany', 'Game', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 20.49, 59.99, 66, 2.25, 654),
  ('FIFA 23 PlayStation 4 Key GLOBAL', 'PlayStation Network', 'GLOBAL', 'France', 'Game', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 24.99, 59.99, 58, 2.75, 1123),
  ('FIFA 23 PlayStation 4 Key EUROPE', 'PlayStation Network', 'EUROPE', 'Spain', 'Game', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 23.49, 59.99, 61, 2.58, 945),
  ('FIFA 23 Ultimate Edition EA App GLOBAL', 'EA App', 'GLOBAL', 'Italy', 'DLC', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 29.99, 89.99, 67, 3.30, 567),
  ('FIFA 23 Ultimate Edition Steam EUROPE', 'Steam', 'EUROPE', 'United Kingdom', 'DLC', 'Windows', 'Sports', '/images/games/fifa-23.jpg', 27.99, 89.99, 69, 3.08, 432),

  -- =============================================================================
  -- RED DEAD REDEMPTION 2 (10 offers) - Genre: Action
  -- =============================================================================
  ('Red Dead Redemption 2 Steam Key GLOBAL', 'Steam', 'GLOBAL', 'United States', 'Game', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 29.99, 59.99, 50, 3.30, 3420),
  ('Red Dead Redemption 2 Steam Key EUROPE', 'Steam', 'EUROPE', 'Lithuania', 'Game', 'Linux', 'Action', '/images/games/red-dead-redemption-2.jpg', 27.99, 59.99, 53, 3.08, 2987),
  ('Red Dead Redemption 2 Rockstar Key GLOBAL', 'Rockstar', 'GLOBAL', 'Poland', 'Game', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 24.99, 59.99, 58, 2.75, 2156),
  ('Red Dead Redemption 2 Rockstar Key EUROPE', 'Rockstar', 'EUROPE', 'Germany', 'Game', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 23.49, 59.99, 61, 2.58, 1876),
  ('Red Dead Redemption 2 PlayStation 4 Key GLOBAL', 'PlayStation Network', 'GLOBAL', 'France', 'Game', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 24.99, 49.99, 50, 2.75, 2890),
  ('Red Dead Redemption 2 PlayStation 4 Key EUROPE', 'PlayStation Network', 'EUROPE', 'Spain', 'Game', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 22.99, 49.99, 54, 2.53, 2345),
  ('Red Dead Redemption 2 Xbox One Key GLOBAL', 'Xbox Live', 'GLOBAL', 'Italy', 'Game', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 26.99, 49.99, 46, 2.97, 1987),
  ('Red Dead Redemption 2 Xbox One Key EUROPE', 'Xbox Live', 'EUROPE', 'United Kingdom', 'Game', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 24.49, 49.99, 51, 2.69, 1654),
  ('Red Dead Redemption 2 Ultimate Edition Steam GLOBAL', 'Steam', 'GLOBAL', 'United States', 'DLC', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 39.99, 89.99, 56, 4.40, 1234),
  ('Red Dead Redemption 2 Ultimate Edition Rockstar EUROPE', 'Rockstar', 'EUROPE', 'Lithuania', 'DLC', 'Windows', 'Action', '/images/games/red-dead-redemption-2.jpg', 36.99, 89.99, 59, 4.07, 987),

  -- =============================================================================
  -- GTA V (6 offers) - Genre: Action
  -- =============================================================================
  ('GTA V Steam Key GLOBAL', 'Steam', 'GLOBAL', 'Poland', 'Game', 'Windows', 'Action', '/images/games/Grand Theft Auto V.jpg', 14.99, 29.99, 50, 1.65, 12456),
  ('GTA V Steam Key EUROPE', 'Steam', 'EUROPE', 'Germany', 'Game', 'Linux', 'Action', '/images/games/Grand Theft Auto V.jpg', 13.49, 29.99, 55, 1.48, 9876),
  ('GTA V Rockstar Key GLOBAL', 'Rockstar', 'GLOBAL', 'France', 'Game', 'Windows', 'Action', '/images/games/Grand Theft Auto V.jpg', 12.99, 29.99, 57, 1.43, 8765),
  ('GTA V Xbox One Key GLOBAL', 'Xbox Live', 'GLOBAL', 'Spain', 'Game', 'Windows', 'Action', '/images/games/Grand Theft Auto V.jpg', 16.99, 29.99, 43, 1.87, 6543),
  ('GTA V PlayStation 4 Key GLOBAL', 'PlayStation Network', 'GLOBAL', 'Italy', 'Game', 'Windows', 'Action', '/images/games/Grand Theft Auto V.jpg', 17.99, 29.99, 40, 1.98, 7890),
  ('GTA V Premium Edition Steam GLOBAL', 'Steam', 'GLOBAL', 'United Kingdom', 'DLC', 'Windows', 'Action', '/images/games/Grand Theft Auto V.jpg', 19.99, 39.99, 50, 2.20, 5432),

  -- =============================================================================
  -- THE WITCHER 3: WILD HUNT (6 offers) - Genre: RPG
  -- =============================================================================
  ('The Witcher 3: Wild Hunt Steam Key GLOBAL', 'Steam', 'GLOBAL', 'United States', 'Game', 'Windows', 'RPG', '/images/games/The Witcher 3.jpg', 9.99, 29.99, 67, 1.10, 8901),
  ('The Witcher 3: Wild Hunt Steam Key EUROPE', 'Steam', 'EUROPE', 'Lithuania', 'Game', 'Mac', 'RPG', '/images/games/The Witcher 3.jpg', 8.99, 29.99, 70, 0.99, 7654),
  ('The Witcher 3: Wild Hunt GOG Key GLOBAL', 'GOG', 'GLOBAL', 'Poland', 'Game', 'Linux', 'RPG', '/images/games/The Witcher 3.jpg', 7.99, 29.99, 73, 0.88, 6543),
  ('The Witcher 3: Wild Hunt Xbox One Key GLOBAL', 'Xbox Live', 'GLOBAL', 'Germany', 'Game', 'Windows', 'RPG', '/images/games/The Witcher 3.jpg', 12.99, 29.99, 57, 1.43, 4321),
  ('The Witcher 3: Wild Hunt PlayStation 4 Key GLOBAL', 'PlayStation Network', 'GLOBAL', 'France', 'Game', 'Windows', 'RPG', '/images/games/The Witcher 3.jpg', 14.99, 29.99, 50, 1.65, 5678),
  ('The Witcher 3: Wild Hunt GOTY Edition Steam GLOBAL', 'Steam', 'GLOBAL', 'Spain', 'DLC', 'Windows', 'RPG', '/images/games/The Witcher 3.jpg', 14.99, 49.99, 70, 1.65, 9876),

  -- =============================================================================
  -- FORZA HORIZON 5 (6 offers) - Genre: Racing
  -- =============================================================================
  ('Forza Horizon 5 Xbox Live Key GLOBAL', 'Xbox Live', 'GLOBAL', 'Italy', 'Game', 'Windows', 'Racing', '/images/games/Forza Horizon 5.png', 39.99, 69.99, 43, 4.40, 2345),
  ('Forza Horizon 5 Xbox Live Key EUROPE', 'Xbox Live', 'EUROPE', 'United Kingdom', 'Game', 'Windows', 'Racing', '/images/games/Forza Horizon 5.png', 37.49, 69.99, 46, 4.12, 1987),
  ('Forza Horizon 5 Steam Key GLOBAL', 'Steam', 'GLOBAL', 'United States', 'Game', 'Windows', 'Racing', '/images/games/Forza Horizon 5.png', 42.99, 69.99, 39, 4.73, 3456),
  ('Forza Horizon 5 Steam Key EUROPE', 'Steam', 'EUROPE', 'Lithuania', 'Game', 'Windows', 'Racing', '/images/games/Forza Horizon 5.png', 40.49, 69.99, 42, 4.45, 2876),
  ('Forza Horizon 5 Premium Edition Xbox GLOBAL', 'Xbox Live', 'GLOBAL', 'Poland', 'DLC', 'Windows', 'Racing', '/images/games/Forza Horizon 5.png', 59.99, 99.99, 40, 6.60, 1234),
  ('Forza Horizon 5 Deluxe Edition Steam GLOBAL', 'Steam', 'GLOBAL', 'Germany', 'DLC', 'Windows', 'Racing', '/images/games/Forza Horizon 5.png', 54.99, 89.99, 39, 6.05, 987);
