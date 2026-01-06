---
title: "ポートフォリオサイト"
description: "AstroとCloudflareを使用して構築した、この個人ポートフォリオサイトです。パフォーマンスとデザインにこだわりました。"
date: 2024-01-15
tags: ["Webサイト", "個人開発"]
technologies: ["Astro", "Tailwind CSS", "Cloudflare Pages", "Cloudflare D1"]
links:
  github: "https://github.com/yourusername/personal-site"
  demo: "https://yourdomain.com"
coverImage: "/images/works/portfolio-site.png"
screenshots:
  - "/images/works/portfolio-screenshot-1.png"
  - "/images/works/portfolio-screenshot-2.png"
---

## プロジェクト概要

このサイトは、自身のスキルと成果物を紹介するために作成した個人ポートフォリオサイトです。静的サイトジェネレーターのAstroとCloudflareの各種サービスを全面的に採用し、高速かつモダンなサイトを目指しました。

## 主な機能

- **ブログ機能**: Markdownで記事を管理し、静的に生成されます。
- **成果物紹介**: これまでに作成したプロジェクトを一覧・詳細表示できます。
- **閲覧数カウンター**: Cloudflare D1とFunctionsを利用して、各記事の閲覧数を非同期でカウント・表示します。
- **レスポンシブデザイン**: モバイルからデスクトップまで、あらゆるデバイスで快適に閲覧できます。
- **ダークモード**: ユーザーの好みに合わせてテーマを切り替えられます。

## 技術的な挑戦

- **パフォーマンス最適化**: Lighthouseスコアで高得点を維持するため、画像最適化や不要なJavaScriptの排除を徹底しました。
- **エッジでの動的処理**: 閲覧数カウンターなど、従来はサーバーサイドで処理していた動的な機能をCloudflareのエッジで実装しました。
- **コンテンツ管理**: AstroのContent Collections機能を活用し、型安全なコンテンツ管理を実現しました。
