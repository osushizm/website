-- 閲覧数テーブル
CREATE TABLE IF NOT EXISTS views (
  slug TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_views_updated_at ON views(updated_at);

-- お問い合わせフォーム（将来の拡張用）
CREATE TABLE IF NOT EXISTS form_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- 検索インデックス（将来の拡張用）
CREATE TABLE IF NOT EXISTS search_index (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'blog' or 'work'
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_search_type ON search_index(type);
CREATE INDEX IF NOT EXISTS idx_search_slug ON search_index(slug);
