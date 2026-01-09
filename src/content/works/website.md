---
title: "個人サイト | osushzim.com - Gitで管理する個人ページ"
description: "Astroの静的サイト生成能力とCloudflareのグローバルネットワークを組み合わせ、高速でスケーラブル、かつ低コストな個人サイトを構築する方法を解説します。"
date: 2024-01-10
tags: ["Astro", "Cloudflare", "Web開発"]
coverImage: "/images/bibouroku.png"
---
[osushizm.com](https://osushizm.com)

## はじめに

個人サイトやポートフォリオを公開する際、多くの開発者がパフォーマンス、運用コスト、そして更新の手軽さという課題に直面します。本記事では、静的サイトジェネレーターの **Astro** と、Cloudflareの提供するエッジコンピューティングプラットフォームを組み合わせることで、これらの課題をどのように解決できるかを探ります。

## 基本的構成（技術スタックの全体像）

- **フロントエンド/SSG**: Astro
- **ホスティング**: Cloudflare Pages
- **サーバーレス**: Cloudflare Pages Functions
- **データストア**: Cloudflare D1（SQLite）
- **配信**: Cloudflare CDN

この構成により、静的コンテンツは高速に配信され、必要な箇所だけAPIで動的に拡張できます。

## なぜAstroなのか？

Astroは、「アイランドアーキテクチャ」というユニークなアプローチを採用した静的サイトジェネレーターです。主な特徴は以下の通りです。

- **ゼロJavaScriptがデフォルト**: ページはデフォルトでJavaScriptを含まないHTMLとして出力され、非常に高速に読み込まれます。
- **UIフレームワーク非依存**: React, Vue, Svelteなど、好みのUIフレームワークを必要なコンポーネント（アイランド）にのみ適用できます。
- **コンテンツ重視**: MarkdownやMDXのサポートが手厚く、ブログやドキュメントサイトの構築に適しています。

これらの特徴により、Lighthouseスコアで高得点を狙える、パフォーマンスに優れたサイトを容易に構築できます。

```jsx
// 必要なコンポーネントのみインタラクティブにする例
import InteractiveComponent from '../components/InteractiveComponent.jsx';

<main>
  <p>この部分は静的なHTMLです。</p>
  <InteractiveComponent client:load />
</main>
```

## Cloudflare Pages + D1の威力

Cloudflare Pagesは、静的サイトのホスティングに特化したサービスです。Gitリポジトリと連携させるだけで、ビルドからデプロイまでを自動化できます。

- **グローバルCDN**: コンテンツはCloudflareの広大なエッジネットワークにキャッシュされ、世界中のどこからでも高速にアクセスできます。
- **Cloudflare Functions**: サーバーレス関数をプロジェクトに簡単に追加でき、動的な機能（API、フォーム処理など）を実装できます。
- **Cloudflare D1**: エッジで動作するSQLiteベースのデータベース。閲覧数カウンターや簡単なデータ保存に最適です。

### D1を使った閲覧数カウンターの実装

以下は、Cloudflare Pages FunctionsとD1を使って閲覧数をカウントするAPIのエンドポイントの簡単な例です。

```typescript
// functions/api/view.ts
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { slug } = await context.request.json();
  
  await context.env.DB.prepare(
    `INSERT INTO views (slug, count) VALUES (?, 1)
     ON CONFLICT(slug) DO UPDATE SET count = count + 1`
  ).bind(slug).run();
  
  return new Response(JSON.stringify({ success: true }));
};
```

## この構成の概要

Astroは静的生成に強く、Cloudflareはグローバル配信とエッジ実行に強みがあります。両者を組み合わせることで、**高速・低コスト・拡張性**を兼ね備えた個人サイトを実現できます。

- **高速**: Astroの静的HTML + Cloudflare CDN
- **低コスト**: Cloudflare Pagesの無料枠で運用可能
- **拡張性**: Functions + D1で必要な機能だけ追加

## まとめ

AstroとCloudflareスタックの組み合わせは、「ミニマム・低コスト・スタイリッシュ」な個人サイトを実現するための強力な選択肢です。開発者はコンテンツ作成に集中でき、インフラの管理から解放されます。ぜひ、あなたの次のプロジェクトでこのモダンな構成を試してみてください。
