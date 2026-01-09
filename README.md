# 個人サイト (Astro + Cloudflare)
！
ミニマル・低コスト・スタイリッシュをコンセプトに、AstroとCloudflareスタックで構築された個人ポートフォリオサイトです。

## ✨ 主な機能

- **ブログ機能**: Markdownベースのブログ。タグ、関連記事、目次、コードハイライトをサポート。
- **成果物紹介**: プロジェクトをカード形式で紹介。概要、技術スタック、各種リンクを掲載。
- **動的コンテンツ**: Cloudflare D1とFunctionsを利用した閲覧数カウンター。
- **SEO対策**: OGP、JSON-LD、sitemap.xml、rss.xml、robots.txtを完備。
- **パフォーマンス**: Astroによる静的生成とCloudflareのCDNで高速表示。
- **デザイン**: Tailwind CSSによるミニマルデザイン。ダーク/ライトモード切替対応。
- **レスポンシブ**: モバイルからデスクトップまで対応。

## 🛠️ 技術スタック

- **フレームワーク**: [Astro](https://astro.build/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **ホスティング**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **サーバーレス**: [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- **データベース**: [Cloudflare D1](https://developers.cloudflare.com/d1/)
- **パッケージマネージャ**: pnpm

## 📂 ディレクトリ構成

```
personal-site/
├── src/
│   ├── components/      # UIコンポーネント
│   ├── content/         # ブログ記事、成果物 (Markdown)
│   ├── layouts/         # ページレイアウト
│   ├── pages/           # ページ (ルーティング)
│   ├── styles/          # グローバルCSS
│   └── utils/           # ユーティリティ関数
├── functions/           # Cloudflare Pages Functions (API)
├── migrations/          # D1データベースマイグレーション
├── public/              # 静的アセット
├── astro.config.mjs     # Astro設定
├── wrangler.toml        # Cloudflare設定
└── README.md
```

## 🚀 ローカル開発環境のセットアップ

### 1. リポジトリをクローン

```bash
git clone <your-repository-url>
cd personal-site
```

### 2. 依存関係をインストール

```bash
pnpm install
```

### 3. 環境変数を設定

`.env.example` をコピーして `.env` ファイルを作成し、内容を編集します。

```bash
cp .env.example .env
```

```.env
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_SITE_TITLE=あなたの名前
PUBLIC_GITHUB_USERNAME=your_github_username
```

### 4. Cloudflare D1データベースをローカルで準備

ローカルで開発するには、Wrangler CLIが必要です。

```bash
# Wranglerをインストール (プロジェクトに開発依存として追加)
pnpm add -D wrangler

# ローカルでD1データベースを作成 (初回のみ)
pnpm exec wrangler d1 create personal-site-db-local
```

`wrangler.toml` にローカル用の設定を追記します。`database_id` は上のコマンドで表示されたIDに置き換えてください。

```toml
# wrangler.toml の末尾に追加

[[d1_databases]]
binding = "DB"
database_name = "personal-site-db-local"
database_id = "your-local-db-id"
preview_database_id = "your-local-db-id"
```

### 5. D1マイグレーションを実行

```bash
# ローカルDBに対してマイグレーションを実行
pnpm exec wrangler d1 migrations apply personal-site-db-local --local
```

### 6. 開発サーバーを起動

```bash
pnpm run dev
```

ブラウザで `http://localhost:4321` を開くと、サイトが表示されます。

## ☁️ Cloudflare Pagesへのデプロイ

### 1. GitHubリポジトリを作成・プッシュ

このプロジェクトを自身のGitHubアカウントにプッシュします。

### 2. Cloudflare Pagesでプロジェクト作成

1. [Cloudflareダッシュボード](https://dash.cloudflare.com/)にログインします。
2. **Workers & Pages** > **Create application** > **Pages** > **Connect to Git** を選択します。
3. デプロイしたいGitHubリポジトリを選択し、**Begin setup** をクリックします。

### 3. ビルド設定

- **Project name**: 任意の名前に設定
- **Production branch**: `main`
- **Framework preset**: `Astro`
- **Build command**: `pnpm build`
- **Build output directory**: `/dist`

### 4. D1データベースの作成とバインディング

1. デプロイする前に、本番用のD1データベースを作成します。
   ```bash
   # ターミナルで実行
   pnpm exec wrangler d1 create personal-site-db
   ```
2. 表示された `database_id` をメモしておきます。
3. Cloudflare Pagesのプロジェクト設定画面に戻り、**Settings** > **Functions** > **D1 database bindings** に進みます。
4. **Add binding** をクリックし、以下のように設定します。
   - **Variable name**: `DB`
   - **D1 Database**: 先ほど作成したデータベース (`personal-site-db`) を選択
5. **Save and Deploy** をクリックして、最初のデプロイを実行します。

### 5. 本番DBにマイグレーションを実行

最初のデプロイが完了したら、本番データベースにテーブルを作成します。

```bash
pnpm exec wrangler d1 migrations apply personal-site-db
```

これで、サイトが公開され、閲覧数カウンターも機能するようになります。

## ✍️ コンテンツの管理

### ブログ記事の追加

`src/content/blog/` ディレクトリに新しいMarkdownファイル (`.md`) を追加します。
ファイル冒頭のfrontmatterに必要な情報を記述してください。

```markdown
---
title: "新しい記事のタイトル"
description: "記事の簡単な説明"
date: YYYY-MM-DD
tags: ["タグ1", "タグ2"]
draft: false # trueにすると下書きになり、公開されません
coverImage: "/images/blog/cover.png"
---

ここに本文を記述します...
```

### 成果物の追加

`src/content/works/` ディレクトリに新しいMarkdownファイル (`.md`) を追加します。

```markdown
---
title: "プロジェクト名"
description: "プロジェクトの概要"
date: YYYY-MM-DD
tags: ["タグ1"]
technologies: ["React", "Node.js"]
links:
  github: "https://github.com/..."
  demo: "https://demo.example.com"
coverImage: "/images/works/cover.png"
---

ここにプロジェクトの詳細を記述します...
```

コンテンツを追加・編集した後、変更をGitリポジトリにプッシュすると、Cloudflare Pagesが自動的にサイトを再ビルド・デプロイします。
