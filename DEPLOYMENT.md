# デプロイガイド

このドキュメントでは、個人サイトをCloudflare Pagesにデプロイする詳細な手順を説明します。

## 前提条件

- GitHubアカウント
- Cloudflareアカウント（無料プランでOK）
- ローカル環境にNode.js 18以上とpnpmがインストールされていること

## ステップ1: GitHubリポジトリの準備

### 1.1 GitHubでリポジトリを作成

1. [GitHub](https://github.com/)にログインします。
2. 右上の「+」ボタンから「New repository」を選択します。
3. リポジトリ名を入力（例: `personal-site`）し、「Create repository」をクリックします。

### 1.2 ローカルプロジェクトをプッシュ

```bash
cd personal-site

# Gitリポジトリを初期化（まだの場合）
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit"

# リモートリポジトリを追加
git remote add origin https://github.com/yourusername/personal-site.git

# プッシュ
git branch -M main
git push -u origin main
```

## ステップ2: Cloudflare D1データベースの作成

### 2.1 Wranglerをインストール

```bash
pnpm add -D wrangler
```

### 2.2 Cloudflareにログイン

```bash
pnpm exec wrangler login
```

ブラウザが開き、Cloudflareへのログインが求められます。ログイン後、ターミナルに戻ります。

### 2.3 本番用D1データベースを作成

```bash
pnpm exec wrangler d1 create personal-site-db
```

実行すると、以下のような出力が表示されます。

```
✅ Successfully created DB 'personal-site-db'!

[[d1_databases]]
binding = "DB"
database_name = "personal-site-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

この `database_id` を **メモしておいてください**。後で使用します。

### 2.4 wrangler.jsonc を更新

`wrangler.jsonc` ファイルを開き、`database_id` を実際のIDに置き換えます。

```json
{
  "main": "dist/_worker.js/index.js",
  "name": "personal-site",
  "compatibility_date": "2026-01-06",
  "compatibility_flags": [
    "nodejs_compat",
    "global_fetch_strictly_public"
  ],
  "assets": {
    "binding": "ASSETS",
    "directory": "./dist"
  },
  "observability": {
    "enabled": true
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "personal-site-db",
      "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  ]
}
```

### 2.5 マイグレーションを実行

```bash
pnpm exec wrangler d1 migrations apply personal-site-db
```

これで、本番データベースにテーブルが作成されます。

## ステップ3: Cloudflare Pagesでプロジェクトを作成

### 3.1 Cloudflareダッシュボードにアクセス

1. [Cloudflareダッシュボード](https://dash.cloudflare.com/)にログインします。
2. 左側のメニューから **Workers & Pages** を選択します。
3. **Create application** ボタンをクリックします。

### 3.2 Pagesプロジェクトを作成

1. **Pages** タブを選択します。
2. **Connect to Git** をクリックします。
3. GitHubアカウントとの連携を承認します（初回のみ）。
4. デプロイしたいリポジトリ（`personal-site`）を選択し、**Begin setup** をクリックします。

### 3.3 ビルド設定を入力

以下の設定を入力します。

- **Project name**: `personal-site`（任意の名前でOK）
- **Production branch**: `main`
- **Framework preset**: `Astro`
- **Build command**: `pnpm build`
- **Build output directory**: `/dist`

**Save and Deploy** をクリックします。

### 3.4 最初のデプロイを待つ

初回デプロイが開始されます。数分待つと、デプロイが完了します。

## ステップ4: D1データベースをバインディング

デプロイが完了したら、D1データベースをPagesプロジェクトにバインドします。

### 4.1 プロジェクト設定を開く

1. デプロイされたプロジェクトのページで、**Settings** タブをクリックします。
2. 左側のメニューから **Functions** を選択します。

### 4.2 D1バインディングを追加

1. **D1 database bindings** セクションまでスクロールします。
2. **Add binding** をクリックします。
3. 以下のように設定します。
   - **Variable name**: `DB`
   - **D1 Database**: `personal-site-db` を選択
4. **Save** をクリックします。

### 4.3 再デプロイ

バインディングを追加した後、再デプロイが必要です。

1. **Deployments** タブに移動します。
2. 最新のデプロイの右側にある **...** ボタンをクリックし、**Retry deployment** を選択します。

これで、閲覧数カウンターAPIが正常に動作するようになります。

## ステップ5: カスタムドメインの設定（オプション）

### 5.1 Cloudflareでドメインを取得

Cloudflareでドメインを取得している場合、簡単にカスタムドメインを設定できます。

1. Pagesプロジェクトの **Custom domains** タブを開きます。
2. **Set up a custom domain** をクリックします。
3. 取得したドメイン（例: `yourdomain.com`）を入力します。
4. Cloudflareが自動的にDNSレコードを設定します。

### 5.2 外部ドメインの場合

外部レジストラで取得したドメインの場合、DNSレコードを手動で設定する必要があります。

1. Cloudflare Pagesで提供されるCNAMEレコードをコピーします。
2. ドメインレジストラのDNS設定画面で、CNAMEレコードを追加します。

## ステップ6: 環境変数の設定（必要に応じて）

環境変数を設定する場合、以下の手順で行います。

1. Pagesプロジェクトの **Settings** > **Environment variables** を開きます。
2. **Add variable** をクリックし、変数名と値を入力します。
3. **Save** をクリックします。

例:
- `PUBLIC_SITE_TITLE`: あなたの名前
- `PUBLIC_GITHUB_USERNAME`: GitHubユーザー名

## ステップ7: 自動デプロイの確認

Cloudflare Pagesは、GitHubリポジトリにプッシュするたびに自動的にデプロイを実行します。

1. ローカルでコンテンツを編集します（例: ブログ記事を追加）。
2. 変更をコミット・プッシュします。
   ```bash
   git add .
   git commit -m "Add new blog post"
   git push
   ```
3. Cloudflare Pagesのダッシュボードで、新しいデプロイが開始されることを確認します。

## トラブルシューティング

### ビルドエラーが発生する

- **Node.jsバージョン**: Cloudflare Pagesのビルド設定で、Node.jsバージョンが18以上に設定されているか確認してください。
  - **Settings** > **Builds & deployments** > **Build configurations** > **Environment variables** で、`NODE_VERSION` を `18` または `20` に設定します。

### D1データベースに接続できない

- D1バインディングが正しく設定されているか確認してください。
- `wrangler.jsonc` の `database_id` が正しいか確認してください。
- マイグレーションが実行されているか確認してください。

### カスタムドメインが反映されない

- DNSレコードの伝播には最大48時間かかる場合があります。
- Cloudflareのダッシュボードで、DNSレコードが正しく設定されているか確認してください。

## まとめ

以上で、Cloudflare Pagesへのデプロイが完了しました。これで、あなたの個人サイトが世界中からアクセス可能になります。コンテンツを更新するたびに、自動的にサイトが再ビルド・デプロイされるため、運用は非常に簡単です。

何か問題が発生した場合は、[Cloudflareのドキュメント](https://developers.cloudflare.com/pages/)や[Astroのドキュメント](https://docs.astro.build/)を参照してください。
