# フェーズ6: Lint/Format + テスト

> 実行前に `00-context.md` を読むこと。また、フェーズ5（`05-cors-and-auth.md`）が完了していることが前提。

## このフェーズのゴール

workspace 全体に ESLint / Prettier を導入し、`apps/web` / `apps/api` それぞれにテスト基盤とサンプルテストを用意する。

## 手順

1. コンテナ経由で ESLint / Prettier を workspace 全体に導入・設定する
2. コンテナ経由で `apps/web` に Vitest を導入し、サンプルのテストを1件配置する（例: fetch ラッパーや簡単なコンポーネントのテスト）
3. コンテナ経由で `apps/api` に Bun 組み込みのテストランナー（`bun:test`）の設定を行い、サンプルのテストを1件配置する（例: `/health` や `/users` ルートのテスト）

## 完了条件

- `docker compose run --rm web pnpm lint` が workspace 全体でエラーなく通ること
- `docker compose run --rm web pnpm test`（Vitest）がサンプルテストを含めて正常に実行できること
- `docker compose run --rm api bun test` がサンプルテストを含めて正常に実行できること
- すべてコンテナ経由で実行され、ホスト上で直接インストール系コマンドを実行していないこと
