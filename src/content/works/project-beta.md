---
title: "タスク管理アプリ"
description: "ReactとNode.jsで構築した、シンプルなタスク管理アプリケーション。ユーザー認証とリアルタイム更新機能を備えています。"
date: 2023-11-01
tags: ["Webアプリ", "個人開発"]
technologies: ["React", "Node.js", "Express", "PostgreSQL", "WebSocket"]
links:
  github: "https://github.com/otackstack/task-manager-app"
  demo: "https://task-app.osushizm.com"
  article: "/blog/developing-task-app"
coverImage: "/images/placeholder.svg"
screenshots:
  - "/images/placeholder.svg"
  - "/images/placeholder.svg"
---

## プロジェクト概要

日々のタスクを効率的に管理するためのWebアプリケーションです。直感的なUIとリアルタイム性を重視して開発しました。

## 主な機能

- **ユーザー認証**: JWT（JSON Web Token）を使用した安全なログイン機能。
- **タスク管理**: タスクの追加、編集、削除、完了ステータスの切り替えが可能。
- **プロジェクト分類**: タスクをプロジェクトごとに分類して管理できます。
- **リアルタイム更新**: WebSocketを利用し、複数のデバイスやブラウザでタスクリストがリアルタイムに同期されます。

## 技術的な特徴

- **フロントエンド**: ReactとContext APIを使用して状態管理を実装。UIコンポーネントはTailwind CSSでスタイリング。
- **バックエンド**: Node.jsとExpressでREST APIを構築。データベースはPostgreSQLを使用し、PrismaをORマッパーとして採用。
- **リアルタイム通信**: `socket.io`ライブラリを使用し、サーバーとクライアント間の双方向通信を実現。
