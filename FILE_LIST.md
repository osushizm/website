# 実装ファイル一覧

このドキュメントでは、プロジェクトで実装された主要なファイルとその役割を説明します。

## 設定ファイル

| ファイル | 説明 |
|---------|------|
| `astro.config.mjs` | Astroの設定ファイル。Cloudflareアダプター、sitemap、Tailwind CSSの設定を含む |
| `wrangler.jsonc` | Cloudflare設定ファイル。D1データベースのバインディング設定を含む |
| `tailwind.config.mjs` | Tailwind CSSの設定ファイル（自動生成） |
| `tsconfig.json` | TypeScriptの設定ファイル |
| `package.json` | プロジェクトの依存関係とスクリプト定義 |
| `.env.example` | 環境変数のサンプルファイル |

## コンテンツ管理

| ファイル | 説明 |
|---------|------|
| `src/content/config.ts` | Content Collectionsのスキーマ定義。ブログと成果物の型を定義 |
| `src/content/blog/first-post.md` | サンプルブログ記事1 |
| `src/content/blog/second-post.md` | サンプルブログ記事2 |
| `src/content/works/project-alpha.md` | サンプル成果物1 |
| `src/content/works/project-beta.md` | サンプル成果物2 |

## レイアウト・コンポーネント

| ファイル | 説明 |
|---------|------|
| `src/components/layout/BaseLayout.astro` | ベースレイアウト。HTML構造、メタタグ、OGP、テーマスクリプトを含む |
| `src/components/layout/Header.astro` | ヘッダーコンポーネント。ナビゲーション、モバイルメニュー |
| `src/components/layout/Footer.astro` | フッターコンポーネント。著作権表示、SNSリンク |
| `src/components/common/ThemeToggle.astro` | ダーク/ライトモード切替ボタン |
| `src/components/blog/BlogCard.astro` | ブログ記事カード。一覧ページで使用 |
| `src/components/works/WorkCard.astro` | 成果物カード。一覧ページで使用 |

## ページ

| ファイル | 説明 |
|---------|------|
| `src/pages/index.astro` | トップページ。最新ブログ3件、最新成果物3件、GitHub導線 |
| `src/pages/blog/index.astro` | ブログ一覧ページ。タグフィルタ、全記事表示 |
| `src/pages/blog/[slug].astro` | ブログ詳細ページ。目次、関連記事、閲覧数表示 |
| `src/pages/works/index.astro` | 成果物一覧ページ。タグフィルタ、全成果物表示 |
| `src/pages/works/[slug].astro` | 成果物詳細ページ。技術スタック、リンク、スクリーンショット |
| `src/pages/tags/index.astro` | タグ一覧ページ。全タグと記事数を表示 |
| `src/pages/tags/[tag].astro` | タグ別記事ページ。特定タグの記事と成果物を表示 |
| `src/pages/about.astro` | プロフィールページ。自己紹介、スキル、経歴、連絡先 |
| `src/pages/links.astro` | リンク集ページ。SNSやプラットフォームへのリンク |
| `src/pages/404.astro` | 404エラーページ |
| `src/pages/rss.xml.ts` | RSSフィード生成。ブログ記事のフィードを提供 |

## ユーティリティ

| ファイル | 説明 |
|---------|------|
| `src/utils/date.ts` | 日付フォーマット関数。date-fnsを使用 |
| `src/utils/tags.ts` | タグ処理関数。タグ一覧取得、タグ別記事取得、関連記事取得 |
| `src/utils/github.ts` | GitHub API連携関数。ピン留めリポジトリ取得（将来の拡張用） |

## スタイル

| ファイル | 説明 |
|---------|------|
| `src/styles/global.css` | グローバルスタイル。カラーパレット、ダークモード、proseスタイル、カードスタイル |

## API・データベース

| ファイル | 説明 |
|---------|------|
| `functions/api/view.ts` | 閲覧数カウントAPI。GET/POSTエンドポイント、bot対策 |
| `migrations/0001_initial.sql` | D1データベース初期スキーマ。viewsテーブル、form_messagesテーブル、search_indexテーブル |

## 静的アセット

| ファイル | 説明 |
|---------|------|
| `public/robots.txt` | 検索エンジンクローラー向け設定 |
| `public/images/og-default.png` | デフォルトOG画像（プレースホルダー） |
| `public/images/blog/` | ブログ記事用画像ディレクトリ |
| `public/images/works/` | 成果物用画像ディレクトリ |

## ドキュメント

| ファイル | 説明 |
|---------|------|
| `README.md` | プロジェクトREADME。セットアップ手順、デプロイ手順、コンテンツ管理方法 |
| `DEPLOYMENT.md` | 詳細なデプロイガイド。Cloudflare Pagesへのデプロイ手順 |
| `PROJECT_OVERVIEW.md` | プロジェクト概要。実装された機能、技術スタック、カスタマイズ方法 |

## 主要な実装ポイント

### 1. Content Collections

Astroの**Content Collections**機能を使用して、Markdownコンテンツを型安全に管理しています。`src/content/config.ts`でスキーマを定義し、`getCollection()`関数でコンテンツを取得します。

### 2. 静的サイト生成（SSG）

すべてのページはビルド時に静的HTMLとして生成されます。動的なルーティング（`[slug].astro`）も、`getStaticPaths()`関数を使用して静的に生成されます。

### 3. Cloudflare Pages Functions

`functions/api/view.ts`は、Cloudflare Pages Functionsとして動作します。D1データベースにアクセスし、閲覧数をカウント・取得します。

### 4. ダークモード

`localStorage`とTailwindの`dark:`クラスを使用して、ダークモードを実装しています。システム設定を初期値として尊重し、ユーザーの選択を保存します。

### 5. SEO/OGP

`BaseLayout.astro`で、各ページのメタタグ、OGP、Twitter Cardを設定しています。`@astrojs/sitemap`により、サイトマップが自動生成されます。

## 合計ファイル数

- **設定ファイル**: 6
- **コンテンツファイル**: 5
- **コンポーネント**: 6
- **ページ**: 11
- **ユーティリティ**: 3
- **スタイル**: 1
- **API/DB**: 2
- **ドキュメント**: 3

**合計**: 37ファイル（主要なファイルのみ）
