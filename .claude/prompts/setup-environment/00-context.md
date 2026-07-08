# 全体の目的・技術スタック（全フェーズ共通の前提）

> このファイルは実行手順を持たない。各フェーズのプロンプトを実行する前に、必ずこの内容を読んで前提として踏まえること。

## 目的（Overview）

このリポジトリに、Next.js（FE）と Hono（BE）を分離した TypeScript 製 Web アプリケーションの開発環境を、pnpm workspaces によるモノレポ構成で一から構築する。

## 技術スタック

- リポジトリ構成: モノレポ（pnpm workspaces）
  - `apps/web`: Next.js（App Router、FE）
  - `apps/api`: Hono（BE、REST API）
  - `packages/shared`: FE/BE 双方が参照する API 契約のみを置く（リクエスト/レスポンス型、Zod スキーマ、共通定数など）。Next.js 固有の UI/hooks や Hono 固有のミドルウェア・DBアクセス層はここに置かず、それぞれ `apps/web` / `apps/api` にローカルに閉じる
- 言語: TypeScript（FE/BE共通）
- パッケージマネージャ: pnpm（`apps/web` / `apps/api` 共通。インストールは pnpm に統一する）
- 実行ランタイム: ハイブリッド構成
  - `apps/web`（Next.js）: Node.js で実行（Next.js のビルド/最適化との互換性を優先）
  - `apps/api`（Hono）: Bun で実行（Hono と相性が良く、Docker/CI のサポートも充実しているため）
  - バージョンは Node.js / Bun ともに、問題（互換性の不具合等）がない限り実行時点の最新安定版を採用する。問題が判明した場合のみ、原因が解消される既知の安定バージョンに固定する
- API通信方式: REST（`apps/web` から `apps/api` を HTTP 経由で呼び出す）
- データベース: SQLite
- ORM: Prisma（`apps/api` 側に配置し、DBアクセスは BE に集約する）
- コンテナ化: Docker を日常開発の主手段とする（`web` / `api` をそれぞれコンテナ化し docker-compose でまとめる）。`docker compose up` でホットリロード込みの開発サーバーを起動する運用を前提とし、ホスト側での直接実行（`pnpm dev` / `bun run dev`）は必須の開発手段としない
- パッケージインストールの方針: Docker の設定（Dockerfile / docker-compose.yml）を完了させてから、依存関係のインストールを伴う作業に着手する。すべてのインストール作業は `docker compose run --rm <service> <command>` の形でコンテナ内で実行し、ホストマシン上で直接 `pnpm install` / `pnpm create` / `bun add` 等を実行しない（GitHub Actions の CI 環境は GitHub 提供のランナー上で完結するため、この制約の対象外とする）
- Lint / Format: ESLint / Prettier
- テスト:
  - `apps/web`（Node.js）: Vitest
  - `apps/api`（Bun）: Bun 組み込みのテストランナー（`bun:test`。追加の依存を必要としない）
- CI: GitHub Actions
- バージョン管理: git init + GitHub 連携
- CORS: `hono/cors` ミドルウェアを `apps/api` に適用し、許可オリジンを `apps/web` の開発用オリジンに限定する。`credentials: true` を設定し Cookie 送受信に対応する
- 認証: `hono/jwt` ミドルウェアによる JWT 認証。ログイン API で JWT を発行し、httpOnly + Secure な Cookie に格納する。保護対象のルートはミドルウェアで JWT を検証する
- デプロイ先: 今回のスコープ外（別途プロンプトで指示する）
