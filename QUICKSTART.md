# クイックスタートガイド

このガイドでは、最速で個人サイトをローカルで起動し、Cloudflare Pagesにデプロイする手順を説明します。

## 🚀 5分でローカル起動

### 1. 依存関係をインストール

```bash
cd personal-site
pnpm install
```

### 2. 開発サーバーを起動

```bash
pnpm run dev
```

ブラウザで `http://localhost:4321` を開くと、サイトが表示されます。

**注意**: この段階では、閲覧数カウンター機能は動作しません（D1データベースが未設定のため）。静的なページの表示は問題なく動作します。

## ☁️ 10分でCloudflare Pagesにデプロイ

### ステップ1: GitHubにプッシュ

```bash
# GitHubで新しいリポジトリを作成してから実行
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/personal-site.git
git branch -M main
git push -u origin main
```

### ステップ2: Cloudflare Pagesでプロジェクト作成

1. [Cloudflareダッシュボード](https://dash.cloudflare.com/)にログイン
2. **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
3. GitHubリポジトリを選択
4. ビルド設定:
   - **Build command**: `pnpm build`
   - **Build output directory**: `/dist`
5. **Save and Deploy**

### ステップ3: D1データベースを作成

```bash
# Wranglerをインストール
pnpm add -D wrangler

# Cloudflareにログイン
pnpm exec wrangler login

# D1データベースを作成
pnpm exec wrangler d1 create personal-site-db

# 表示されたdatabase_idをメモ
```

### ステップ4: D1をPagesにバインド

1. Cloudflare Pagesのプロジェクト設定を開く
2. **Settings** > **Functions** > **D1 database bindings**
3. **Add binding**:
   - **Variable name**: `DB`
   - **D1 Database**: `personal-site-db` を選択
4. **Save**

### ステップ5: マイグレーションを実行

```bash
pnpm exec wrangler d1 migrations apply personal-site-db
```

### ステップ6: 再デプロイ

Cloudflare Pagesのダッシュボードで、最新のデプロイを **Retry deployment** します。

## ✅ 完了！

サイトが公開されました。Cloudflare Pagesが提供するURLにアクセスして確認してください。

## 📝 次にやること

### コンテンツをカスタマイズ

1. **サイト情報を変更**:
   - `astro.config.mjs` の `site` を変更
   - `.env.example` をコピーして `.env` を作成し、サイト情報を入力
   - `src/components/layout/Header.astro` のサイト名を変更
   - `src/components/layout/Footer.astro` のSNSリンクを変更

2. **プロフィールを編集**:
   - `src/pages/about.astro` を編集

3. **ブログ記事を追加**:
   - `src/content/blog/` に新しい `.md` ファイルを追加
   - サンプル記事（`first-post.md`、`second-post.md`）を参考にする

4. **成果物を追加**:
   - `src/content/works/` に新しい `.md` ファイルを追加
   - サンプル成果物（`project-alpha.md`、`project-beta.md`）を参考にする

### デザインをカスタマイズ

- `src/styles/global.css` でカラーパレットを変更
- Tailwindのユーティリティクラスでレイアウトを調整

### カスタムドメインを設定

Cloudflare Pagesのプロジェクト設定で、**Custom domains** からカスタムドメインを追加できます。

## 📚 詳細なドキュメント

- **README.md**: 詳細なセットアップ手順
- **DEPLOYMENT.md**: デプロイの詳細ガイド
- **PROJECT_OVERVIEW.md**: プロジェクト概要とカスタマイズ方法
- **ARCHITECTURE.md**: アーキテクチャ設計書

## 🆘 トラブルシューティング

### ビルドエラーが発生する

- Node.jsバージョンを18以上に設定してください
- Cloudflare Pagesの環境変数で `NODE_VERSION=18` を設定

### D1データベースに接続できない

- D1バインディングが正しく設定されているか確認
- マイグレーションが実行されているか確認

### 画像が表示されない

- 画像は `public/images/` に配置してください
- Markdownから参照する際は `/images/...` のように絶対パスで指定

## 💡 ヒント

- コンテンツを追加したら、Gitにプッシュするだけで自動デプロイされます
- ローカルで確認してからプッシュすることをおすすめします
- ダークモードは右上のボタンで切り替えられます

Happy coding! 🎉
