---
title: "私の本棚名刺[hondana.me] 5冊で語る自己紹介 "
description: "フロントはVite + React + Tailwind、バックはCloudflare Pages Functions + D1 + Drizzleで構成。軽量・高速・運用しやすい構成をまとめます。"
date: 2024-01-10
updated: 2024-01-11
tags: ["React", "Vite", "TypeScript", "Cloudflare", "D1"]
draft: false
coverImage: "/images/hondana.png"
---
[hondana.me](https://hondana.me)

## はじめに

ポートフォリオサイトに「このシステムで使っている技術スタック」を載せるなら、読み手が一目で構成を把握できることが重要です。ここでは **My Bookshelf** の基本構成と概要を、フロント・バックエンド・インフラに分けて整理します。

## 基本構成（全体像）

- **フロントエンド**: Vite + React + TypeScript
- **UI/スタイル**: Tailwind CSS + Radix UI
- **状態管理・通信**: React Query + Fetch API
- **バックエンド**: Node.js/TypeScript（ローカル開発）
- **サーバーレス**: Cloudflare Pages Functions（本番）
- **DB**: Cloudflare D1（SQLite）
- **ORM**: Drizzle ORM
- **デプロイ**: Cloudflare Pages

## フロントエンドの概要

ViteとReactを採用し、ビルド速度と開発体験を重視しています。TypeScriptで型安全に保ちつつ、UIはTailwind CSSとRadix UIの組み合わせで**軽量かつ一貫したデザイン**を実現しています。データ取得はReact Queryでキャッシュ・更新を制御し、UIの応答性を高めています。

```tsx
// 例: React Queryでのデータ取得（概念図）
const { data, isLoading } = useQuery({
  queryKey: ["shelves"],
  queryFn: () => fetch("/api/bookshelf").then((res) => res.json()),
});
```

## バックエンドの概要

開発時はNode.js/TypeScriptでサーバーを起動し、本番はCloudflare Pages Functionsでエッジ実行します。APIはJSONベースで扱いやすく、フロントと連携しやすい設計です。

## データストア（D1 + Drizzle）

Cloudflare D1はSQLite互換のエッジDBで、軽量な書籍データやプロフィール情報の保存に最適です。Drizzle ORMを使ってSQLを型安全に扱い、運用の保守性を高めています。

```ts
// 例: Drizzleでの簡易クエリ（概念図）
const shelves = await db.select().from(shelvesTable).all();
```

## この構成のメリット

- **高速**: Viteの高速ビルド + Cloudflareのエッジ配信
- **低コスト**: サーバーレス運用でインフラ管理が最小限
- **拡張性**: React + TypeScript + Drizzleで機能追加が容易

## まとめ

My Bookshelfは、**フロントはVite + React、バックはCloudflare Pages Functions + D1**というモダンな構成で、パフォーマンスと運用性のバランスを取っています。ポートフォリオに掲載する際は、この構成を簡潔にまとめることで、読み手に技術選定の意図を伝えやすくなります。
