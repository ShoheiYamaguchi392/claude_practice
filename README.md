# claude-practice

Next.js（`apps/web`）と Hono（`apps/api`）で構成された pnpm workspaces モノレポ。開発はすべて Docker コンテナ経由で行い、ホストマシン上で直接 `pnpm install` 等のインストール系コマンドは実行しない。

## 初回のセットアップ方法（最初の1回だけ）

1. `apps/api/.env` を作成し、`DATABASE_URL` と `JWT_SECRET` を設定する（`.env` はgitignore対象のため各自作成が必要）
2. `docker compose build` — `web` / `api` のイメージをビルドする
3. `docker compose run --rm web pnpm install` — workspace全体の依存関係をコンテナ内（named volume）にインストールする
4. `docker compose run --rm --workdir /workspace/apps/api api bun --bun run prisma migrate deploy` — 既存マイグレーションを適用し `dev.db` を生成する（`prisma` バイナリは `apps/api/node_modules/.bin` にのみ存在するため、`--workdir` でカレントディレクトリを `apps/api` に切り替える必要がある）
5. `docker compose run --rm --workdir /workspace/apps/api api bun --bun run prisma generate` — Prisma Clientを生成する

## 実装前の起動方法

- VSCode系のIDEで「Reopen in Container」して、、`.devcontainer/web` または `.devcontainer/api` を選択する（`postCreateCommand` で依存関係のインストールが自動実行される）

## 実装後の終了方法

- IDEで「Remote: Close Remote Connection」か「Dev Containers: Reopen Folder Locally」を実行
