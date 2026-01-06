# 個人サイト アーキテクチャ設計書

## 1. 技術スタック

### フロントエンド
- **フレームワーク**: Astro 4.x
  - 静的サイト生成（SSG）に最適
  - Cloudflare Pagesとの相性が良い
  - パフォーマンスに優れる（デフォルトでゼロJS）
  - Markdown/MDXのネイティブサポート
- **スタイリング**: Tailwind CSS
- **コードハイライト**: Shiki（Astro組み込み）
- **アイコン**: lucide-react または heroicons

### バックエンド
- **ホスティング**: Cloudflare Pages
- **サーバーレス**: Cloudflare Pages Functions
- **データベース**: Cloudflare D1（SQLite互換）
- **ストレージ**: 画像はまずリポジトリ管理、将来的にR2対応可能な設計

### パッケージマネージャ
- **pnpm**: 高速で効率的

## 2. ディレクトリ構成

```
personal-site/
├── src/
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── BaseLayout.astro
│   │   ├── blog/
│   │   │   ├── BlogCard.astro
│   │   │   ├── BlogList.astro
│   │   │   ├── TableOfContents.astro
│   │   │   └── RelatedPosts.astro
│   │   ├── works/
│   │   │   ├── WorkCard.astro
│   │   │   └── WorkList.astro
│   │   ├── common/
│   │   │   ├── ThemeToggle.astro
│   │   │   ├── SearchBox.astro
│   │   │   ├── TagList.astro
│   │   │   └── Pagination.astro
│   │   └── seo/
│   │       ├── SEO.astro
│   │       └── OGImage.astro
│   ├── content/             # コンテンツコレクション（Git管理）
│   │   ├── config.ts        # スキーマ定義
│   │   ├── blog/
│   │   │   ├── first-post.md
│   │   │   └── second-post.md
│   │   └── works/
│   │       ├── project-alpha.md
│   │       └── project-beta.md
│   ├── layouts/
│   │   ├── BlogPost.astro
│   │   └── WorkDetail.astro
│   ├── pages/               # ルーティング
│   │   ├── index.astro      # トップページ
│   │   ├── about.astro      # プロフィール
│   │   ├── links.astro      # SNSリンク集
│   │   ├── blog/
│   │   │   ├── index.astro  # ブログ一覧
│   │   │   └── [slug].astro # ブログ詳細
│   │   ├── works/
│   │   │   ├── index.astro  # 成果物一覧
│   │   │   └── [slug].astro # 成果物詳細
│   │   ├── tags/
│   │   │   ├── index.astro  # タグ一覧
│   │   │   └── [tag].astro  # タグ別記事
│   │   ├── rss.xml.ts       # RSSフィード
│   │   ├── sitemap.xml.ts   # サイトマップ
│   │   └── 404.astro        # 404エラーページ
│   ├── styles/
│   │   └── global.css       # グローバルスタイル
│   ├── utils/
│   │   ├── date.ts          # 日付フォーマット
│   │   ├── tags.ts          # タグ処理
│   │   └── github.ts        # GitHub API連携
│   └── env.d.ts
├── functions/               # Cloudflare Pages Functions
│   └── api/
│       ├── view.ts          # 閲覧数カウント
│       └── contact.ts       # お問い合わせフォーム（オプション）
├── public/
│   ├── robots.txt
│   ├── favicon.ico
│   └── images/
│       └── og-default.png
├── migrations/              # D1マイグレーション
│   └── 0001_initial.sql
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── wrangler.toml            # Cloudflare設定
├── package.json
└── README.md
```

## 3. ページ構成とUI設計

### 3.1 トップページ（/）
**レイアウト**:
- ヒーローセクション: 名前、キャッチフレーズ、簡潔な自己紹介
- 最近のブログ3件（カード形式、サムネイル・タイトル・日付・抜粋）
- 最近の成果物3件（カード形式、サムネイル・タイトル・タグ）
- GitHubへのCTA（プロフィールリンク、ピン留めリポジトリ表示）

**デザイン要素**:
- 余白を多く取る（max-w-4xl中央配置）
- タイポグラフィ重視（見出しは大きく、本文は読みやすく）
- ダーク/ライト切替ボタン（右上）

### 3.2 ブログ一覧（/blog）
**機能**:
- 全記事の一覧表示（新しい順）
- タグフィルタリング
- 検索ボックス（クライアントサイド、将来的にAPI化可能）
- ページネーション（10件/ページ）

**UI**:
- カードグリッド（2カラム、モバイルは1カラム）
- 各カード: サムネイル、タイトル、日付、タグ、抜粋

### 3.3 ブログ詳細（/blog/[slug]）
**機能**:
- Markdownレンダリング
- 目次（h2, h3から自動生成）
- コードハイライト（Shiki）
- 更新日時表示
- 関連記事（タグベース）
- 閲覧数表示（D1から取得）

**UI**:
- 記事本文は最大幅を制限（prose）
- 目次は右サイドバー（デスクトップ）またはトップ（モバイル）
- シンタックスハイライトのテーマはダーク/ライトに連動

### 3.4 成果物一覧（/works）
**機能**:
- 全成果物の一覧表示
- タグフィルタリング
- 検索機能

**UI**:
- カードグリッド（3カラム、タブレット2、モバイル1）
- 各カード: スクリーンショット、タイトル、概要、技術タグ

### 3.5 成果物詳細（/works/[slug]）
**機能**:
- プロジェクト概要
- スクリーンショット（複数可）
- 使用技術一覧
- リンク集（GitHub、デモ、関連記事）

**UI**:
- 大きなヒーロー画像
- 技術スタックはバッジ表示
- リンクは目立つボタン

### 3.6 プロフィール（/about）
**内容**:
- 自己紹介
- スキルセット（カテゴリ別）
- 経歴（簡潔に）
- 連絡先（メールはスパム対策済み、SNSリンク）

### 3.7 リンク集（/links）
**内容**:
- GitHub
- Twitter/X
- LinkedIn
- その他SNS
- 各リンクはカード形式で統一

## 4. コンテンツ管理方式

### 4.1 Astro Content Collections
- `src/content/config.ts`でスキーマを定義
- Zodでバリデーション
- TypeScript型安全性

**ブログのfrontmatter**:
```yaml
---
title: "記事タイトル"
description: "記事の概要"
date: 2024-01-15
updated: 2024-01-20
tags: ["JavaScript", "Astro"]
draft: false
coverImage: "/images/blog/cover.jpg"
---
```

**成果物のfrontmatter**:
```yaml
---
title: "プロジェクト名"
description: "プロジェクトの概要"
date: 2024-01-15
tags: ["React", "TypeScript"]
technologies: ["React", "Next.js", "Tailwind CSS"]
links:
  github: "https://github.com/username/repo"
  demo: "https://demo.example.com"
  article: "/blog/project-article"
coverImage: "/images/works/project.jpg"
screenshots:
  - "/images/works/project-1.jpg"
  - "/images/works/project-2.jpg"
---
```

### 4.2 更新フロー
1. ローカルで`src/content/blog/`または`src/content/works/`に.mdファイルを追加
2. Git commit & push
3. Cloudflare Pagesが自動ビルド・デプロイ

### 4.3 将来の拡張（管理画面）
- D1にコンテンツテーブルを追加
- Cloudflare Workersで管理API作成
- 認証はCloudflare Access
- 現在のGit管理と併存可能な設計

## 5. D1データベース設計

### 5.1 MVPスキーマ

```sql
-- 閲覧数テーブル
CREATE TABLE IF NOT EXISTS views (
  slug TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_views_updated_at ON views(updated_at);
```

### 5.2 将来の拡張用テーブル（オプション）

```sql
-- お問い合わせフォーム
CREATE TABLE IF NOT EXISTS form_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- 検索インデックス（全文検索用）
CREATE TABLE IF NOT EXISTS search_index (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'blog' or 'work'
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

## 6. Cloudflare Pages Functions API設計

### 6.1 閲覧数カウントAPI

**エンドポイント**: `POST /api/view`

**リクエスト**:
```json
{
  "slug": "blog/first-post"
}
```

**レスポンス**:
```json
{
  "count": 42
}
```

**実装要点**:
- D1のUPSERT（INSERT OR REPLACE）を使用
- 簡易bot対策（User-Agentチェック）
- レート制限（同一IPから1分に1回まで）

### 6.2 お問い合わせAPI（オプション）

**エンドポイント**: `POST /api/contact`

**リクエスト**:
```json
{
  "name": "山田太郎",
  "email": "yamada@example.com",
  "message": "お問い合わせ内容",
  "turnstile_token": "xxx"
}
```

**レスポンス**:
```json
{
  "success": true
}
```

**実装要点**:
- Cloudflare Turnstileで認証
- D1に保存
- Email Routingで通知（オプション）

## 7. SEO/OGP対応

### 7.1 メタタグ
- 各ページで適切なtitle/description
- OGP（og:title, og:description, og:image, og:type）
- Twitter Card
- canonical URL

### 7.2 サイトマップ
- `src/pages/sitemap.xml.ts`で動的生成
- 全ページ・全記事・全成果物を含む

### 7.3 RSSフィード
- `src/pages/rss.xml.ts`で生成
- ブログ記事のみ対象
- Atom形式

### 7.4 robots.txt
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## 8. パフォーマンス最適化

- **画像最適化**: Astroの`<Image />`コンポーネント使用
- **フォント**: システムフォントスタック優先、必要ならフォント最適化
- **CSS**: Tailwind CSSのPurge機能で未使用スタイル削除
- **JS**: 必要最小限（テーマ切替、検索のみ）
- **キャッシュ**: Cloudflare Pagesのデフォルトキャッシュ活用

## 9. ダークモード実装

- Tailwindの`dark:`クラス使用
- `localStorage`でユーザー設定保存
- システム設定を初期値として尊重
- トグルボタンはヘッダーに配置

## 10. レスポンシブデザイン

- **ブレークポイント**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **モバイルファースト**で設計
- タッチ操作を考慮したボタンサイズ

## 11. デプロイフロー

1. GitHubリポジトリ作成
2. Cloudflare Pagesでプロジェクト作成
3. GitHubリポジトリと連携
4. ビルド設定:
   - ビルドコマンド: `pnpm build`
   - 出力ディレクトリ: `dist`
   - Node.jsバージョン: 18以上
5. 環境変数設定（必要に応じて）
6. D1データベース作成・バインディング
7. 自動デプロイ有効化

## 12. 環境変数

```env
# 開発環境
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_SITE_TITLE=Your Name
PUBLIC_GITHUB_USERNAME=yourusername

# 本番環境（Cloudflare Pages）
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_SITE_TITLE=Your Name
PUBLIC_GITHUB_USERNAME=yourusername
```

## 13. 今後の拡張可能性

- **R2統合**: 画像をR2に移行、CDN配信
- **管理画面**: Cloudflare Workers + D1で構築
- **コメント機能**: Giscus統合
- **アナリティクス**: Cloudflare Web Analytics
- **検索機能強化**: Algolia/Pagefindなど
- **多言語対応**: Astroのi18n機能

---

この設計に基づいて実装を進めます。次のフェーズでコードを生成します。
