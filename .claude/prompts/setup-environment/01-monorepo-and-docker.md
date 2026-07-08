# フェーズ1: モノレポ雛形 + Docker基盤

> 実行前に `00-context.md` を読み、全体の技術スタックを前提として把握すること。

## このフェーズのゴール

アプリの実装コードはまだ存在しない状態で、モノレポの骨格と Docker 基盤だけを先に整え、`docker compose up` で `web` / `api` の空コンテナが問題なく起動することを確認する。ここで Node.js（`apps/web`）/ Bun（`apps/api`）のハイブリッド構成・コンテナ経由の運用の土台を検証してから、以降のフェーズでアプリ実装を積み上げる。

## 手順

1. リポジトリ直下に pnpm workspace の雛形を作成する
   - `pnpm-workspace.yaml`
   - ルートの `package.json`
   - 空の `apps/web` / `apps/api` / `packages/shared` ディレクトリ
   - この時点では依存関係のインストールは行わない
2. Docker の設定を作成する
   - `apps/web` 用 Dockerfile（Node.js ベースイメージ）
   - `apps/api` 用 Dockerfile（`oven/bun` ベースイメージ）
   - 両者をまとめる `docker-compose.yml`
     - ソースディレクトリをボリュームマウントし、ホットリロードに対応させる
     - `node_modules` はホストと混在しないよう、コンテナ内にのみ存在する形にする（named volume 等を使う）
3. この段階ではアプリの実体がまだないため、`docker compose up` で起動確認する際は、各サービスのコマンドを一時的に `sleep infinity` 等のプレースホルダーにしてよい（Dockerfile/docker-compose の疎通確認が目的であり、アプリ起動確認は次フェーズで行う）

## 完了条件

- `docker compose up` で `web` / `api` の両コンテナがエラーなく起動すること
- `docker compose run --rm web node --version`、`docker compose run --rm api bun --version` がそれぞれ想定のランタイムで実行できること
- ホストマシン上で `pnpm install` 等のインストール系コマンドを一切実行していないこと
