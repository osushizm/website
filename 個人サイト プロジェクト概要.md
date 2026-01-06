# 個人サイト プロジェクト概要

このドキュメントでは、構築した個人サイトの全体像、実装されている機能、技術的な詳細、およびカスタマイズ方法について説明します。

## プロジェクトの目的

**ミニマル・低コスト・スタイリッシュ**をコンセプトに、個人のポートフォリオサイトを構築しました。ブログ機能と成果物紹介機能を備え、GitHubでコンテンツを管理し、Cloudflare Pagesで自動デプロイされる、モダンなWebサイトです。

## 実装された機能

### 1. ブログ機能

- **Markdownベース**: `src/content/blog/` ディレクトリにMarkdownファイルを配置するだけで記事を追加できます。
- **タグ機能**: 記事にタグを付けて分類できます。タグ一覧ページ、タグ別記事一覧ページも自動生成されます。
- **関連記事表示**: 記事詳細ページで、タグが共通する関連記事を自動的に表示します。
- **目次自動生成**: 記事内の見出し（h2, h3）から目次を自動生成します。
- **コードハイライト**: Shikiを使用したシンタックスハイライト。ダークモードに対応。
- **更新日時表示**: 記事の公開日と更新日を表示できます。

### 2. 成果物紹介機能

- **プロジェクト一覧**: カード形式で成果物を一覧表示します。
- **詳細ページ**: 各プロジェクトの詳細、使用技術、スクリーンショット、リンク（GitHub、デモ、関連記事）を表示します。
- **技術スタック表示**: 使用した技術をバッジ形式で表示します。

### 3. 閲覧数カウンター（動的機能）

- **Cloudflare D1**: エッジで動作するSQLiteデータベースを使用して閲覧数を保存します。
- **Cloudflare Functions**: `/api/view` エンドポイントで閲覧数をカウント・取得します。
- **Bot対策**: User-Agentチェックによる簡易的なbot対策を実装しています。

### 4. SEO/OGP対応

- **メタタグ**: 各ページで適切なtitle、description、OGP、Twitter Cardを設定しています。
- **Sitemap**: `@astrojs/sitemap`により自動生成されます。
- **RSSフィード**: ブログ記事のRSSフィードを `/rss.xml` で提供しています。
- **robots.txt**: 検索エンジンのクローラー向けに設定しています。

### 5. デザイン

- **Tailwind CSS**: ユーティリティファーストのCSSフレームワークを使用。
- **ダーク/ライトモード**: ユーザーの好みやシステム設定に応じてテーマを切り替えられます。
- **レスポンシブ**: モバイル、タブレット、デスクトップに対応したレイアウト。
- **ミニマルデザイン**: 余白を多く取り、タイポグラフィを重視したデザイン。

### 6. パフォーマンス

- **静的サイト生成（SSG）**: Astroによりビルド時にHTMLを生成し、高速に配信されます。
- **ゼロJavaScript**: 必要最小限のJavaScriptのみ使用（テーマ切替、モバイルメニューなど）。
- **Cloudflare CDN**: グローバルなエッジネットワークでコンテンツをキャッシュ・配信します。

## 技術スタック詳細

### フロントエンド

- **Astro 5.x**: 静的サイトジェネレーター。アイランドアーキテクチャにより、必要な部分のみJavaScriptを実行します。
- **Tailwind CSS 4.x**: ユーティリティファーストのCSSフレームワーク。カスタムカラーパレットとダークモードをサポート。
- **TypeScript**: 型安全なコード記述。Content Collectionsによりコンテンツも型安全に管理されます。

### バックエンド・インフラ

- **Cloudflare Pages**: 静的サイトホスティング。GitHubと連携し、プッシュするたびに自動ビルド・デプロイ。
- **Cloudflare Pages Functions**: サーバーレス関数。`/api/view` エンドポイントを提供します。
- **Cloudflare D1**: エッジで動作するSQLiteベースのデータベース。閲覧数を保存します。

### 開発ツール

- **pnpm**: 高速で効率的なパッケージマネージャ。
- **Wrangler**: Cloudflareの公式CLI。D1データベースの管理やローカル開発に使用します。

## ディレクトリ構成

```
personal-site/
├── src/
│   ├── components/          # 再利用可能なUIコンポーネント
│   │   ├── layout/          # レイアウトコンポーネント（Header, Footer, BaseLayout）
│   │   ├── blog/            # ブログ関連コンポーネント（BlogCard）
│   │   ├── works/           # 成果物関連コンポーネント（WorkCard）
│   │   └── common/          # 共通コンポーネント（ThemeToggle）
│   ├── content/             # コンテンツ（Markdown）
│   │   ├── config.ts        # Content Collectionsのスキーマ定義
│   │   ├── blog/            # ブログ記事
│   │   └── works/           # 成果物
│   ├── layouts/             # ページレイアウト（将来の拡張用）
│   ├── pages/               # ページ（ルーティング）
│   │   ├── index.astro      # トップページ
│   │   ├── about.astro      # プロフィールページ
│   │   ├── links.astro      # リンク集ページ
│   │   ├── 404.astro        # 404エラーページ
│   │   ├── blog/            # ブログページ
│   │   ├── works/           # 成果物ページ
│   │   ├── tags/            # タグページ
│   │   └── rss.xml.ts       # RSSフィード
│   ├── styles/
│   │   └── global.css       # グローバルスタイル
│   └── utils/               # ユーティリティ関数
│       ├── date.ts          # 日付フォーマット
│       ├── tags.ts          # タグ処理
│       └── github.ts        # GitHub API連携
├── functions/               # Cloudflare Pages Functions
│   └── api/
│       └── view.ts          # 閲覧数カウントAPI
├── migrations/              # D1マイグレーション
│   └── 0001_initial.sql     # 初期スキーマ
├── public/                  # 静的アセット
│   ├── robots.txt
│   ├── favicon.ico
│   └── images/              # 画像ファイル
├── astro.config.mjs         # Astro設定
├── wrangler.jsonc           # Cloudflare設定
├── tailwind.config.mjs      # Tailwind CSS設定
├── tsconfig.json            # TypeScript設定
├── package.json             # 依存関係
├── README.md                # プロジェクトREADME
└── DEPLOYMENT.md            # デプロイガイド
```

## カスタマイズ方法

### 1. サイト情報の変更

以下のファイルを編集して、サイト情報を変更します。

#### `astro.config.mjs`

```javascript
export default defineConfig({
  site: 'https://yourdomain.com', // あなたのドメインに変更
  // ...
});
```

#### `.env` ファイル

```env
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_SITE_TITLE=あなたの名前
PUBLIC_GITHUB_USERNAME=your_github_username
```

#### `src/components/layout/Header.astro`

ヘッダーのサイト名を変更します。

```astro
<a href="/" class="text-2xl font-bold no-underline hover:no-underline">
  あなたの名前
</a>
```

#### `src/components/layout/Footer.astro`

フッターの著作権表示やSNSリンクを変更します。

### 2. デザインのカスタマイズ

#### カラーパレットの変更

`src/styles/global.css` でカラーパレットを変更できます。

```css
:root {
  --color-bg: 255 255 255;
  --color-text: 17 24 39;
  --color-primary: 59 130 246; /* プライマリカラー */
  --color-secondary: 107 114 128;
  --color-border: 229 231 235;
  --color-card: 249 250 251;
}
```

#### フォントの変更

`src/styles/global.css` でフォントファミリーを変更できます。

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
}
```

### 3. ページの追加

新しいページを追加するには、`src/pages/` ディレクトリに `.astro` ファイルを作成します。

例: `/contact` ページを追加する場合

```astro
<!-- src/pages/contact.astro -->
---
import BaseLayout from '../components/layout/BaseLayout.astro';
---

<BaseLayout title="お問い合わせ">
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">お問い合わせ</h1>
    <p>お問い合わせフォームをここに実装します。</p>
  </div>
</BaseLayout>
```

ヘッダーのナビゲーションに追加するには、`src/components/layout/Header.astro` を編集します。

```astro
const navItems = [
  { href: '/', label: 'ホーム' },
  { href: '/blog', label: 'ブログ' },
  { href: '/works', label: '成果物' },
  { href: '/about', label: 'プロフィール' },
  { href: '/contact', label: 'お問い合わせ' }, // 追加
  { href: '/links', label: 'リンク' },
];
```

### 4. コンテンツの追加

#### ブログ記事の追加

`src/content/blog/` に新しい `.md` ファイルを作成します。

```markdown
---
title: "記事タイトル"
description: "記事の説明"
date: 2024-01-20
tags: ["タグ1", "タグ2"]
draft: false
coverImage: "/images/blog/cover.png"
---

記事の本文をここに記述します。
```

#### 成果物の追加

`src/content/works/` に新しい `.md` ファイルを作成します。

```markdown
---
title: "プロジェクト名"
description: "プロジェクトの説明"
date: 2024-01-20
tags: ["タグ1"]
technologies: ["React", "Node.js"]
links:
  github: "https://github.com/..."
  demo: "https://demo.example.com"
coverImage: "/images/works/cover.png"
---

プロジェクトの詳細をここに記述します。
```

### 5. 画像の管理

画像は `public/images/` ディレクトリに配置します。

- ブログ記事の画像: `public/images/blog/`
- 成果物の画像: `public/images/works/`
- その他の画像: `public/images/`

Markdownやコンポーネントから参照する際は、`/images/...` のように絶対パスで指定します。

## 将来の拡張可能性

このサイトは、将来的に以下のような機能を追加できるように設計されています。

### 1. 管理画面

Cloudflare WorkersとD1を使用して、ブラウザからコンテンツを投稿・編集できる管理画面を構築できます。認証はCloudflare Accessを利用します。

### 2. 画像のR2移行

現在、画像はGitリポジトリで管理していますが、Cloudflare R2（オブジェクトストレージ）に移行することで、大容量の画像を効率的に管理できます。

### 3. コメント機能

[Giscus](https://giscus.app/)などの外部サービスを統合することで、記事へのコメント機能を追加できます。

### 4. 全文検索

[Pagefind](https://pagefind.app/)やAlgoliaを統合することで、サイト内の全文検索機能を追加できます。

### 5. アナリティクス

Cloudflare Web Analyticsを有効にすることで、プライバシーに配慮したアクセス解析が可能です。

## まとめ

このプロジェクトは、モダンなWeb技術を活用し、高速でスケーラブル、かつ低コストな個人サイトを実現しています。Gitでコンテンツを管理し、自動デプロイされるため、運用の手間も最小限です。ぜひ、あなた自身のポートフォリオサイトとしてカスタマイズしてください。
