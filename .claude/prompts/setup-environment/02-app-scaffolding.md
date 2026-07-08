# フェーズ2: アプリ雛形の作成（Next.js / Hono）

> 実行前に `00-context.md` を読むこと。また、フェーズ1（`01-monorepo-and-docker.md`）が完了し、`docker compose up` で空コンテナが起動することを確認済みであることが前提。

## このフェーズのゴール

`apps/web`（Next.js）と `apps/api`（Hono）それぞれの実アプリを、コンテナ経由でスキャフォールドし、個別に起動確認する。まだ相互連携（FE→BE呼び出し）や DB・認証は実装しない。

## 手順

1. コンテナ経由で `apps/web` の Next.js プロジェクトを初期化する
   - `docker compose run --rm web pnpm create next-app ...` の形で実行する
   - TypeScript, App Router, `src/` ディレクトリを有効化する
   - 実装は `apps/web/src/app` 配下に配置する
2. コンテナ経由で `apps/api` の Hono プロジェクトを初期化し、REST API のルーティング雛形を作成する
   - ディレクトリ構成は Hono の一般的な形に従う（Prisma 関連はフェーズ3で追加するため、ここでは `prisma/` は作らなくてよい）

     ```
     apps/api/
       src/
         index.ts    # エントリーポイント（Hono アプリの起動・ルーター登録）
         routes/      # リソースごとのルーター（例: health.ts）
       package.json
       tsconfig.json
     ```
   - 動作確認用に、疎通確認だけを行う簡単なヘルスチェックルート（例: `GET /health`）を用意する
3. Dockerfile / docker-compose.yml のプレースホルダー起動コマンド（フェーズ1で `sleep infinity` 等にしていた場合）を、実際の開発サーバー起動コマンドに戻す

## 完了条件

- `docker compose up` で `apps/web` が起動し、ブラウザで Next.js のトップページが表示できること
- `docker compose up` で `apps/api` が起動し、`GET /health` 等に対して期待通りのレスポンスが返ること
- どちらもホットリロードが機能すること（ソース変更が即座に反映される）
- スキャフォールド作業がすべて `docker compose run` 経由で行われ、ホスト上で直接インストール系コマンドを実行していないこと
