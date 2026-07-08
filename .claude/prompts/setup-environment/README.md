# 環境構築プロンプト（分割版・下書き）

> このディレクトリの中身はまだ実行しないこと。フェーズごとに1つずつ Claude Code に渡して実行し、各フェーズの「完了条件」を満たしたことを確認してから次のフェーズに進むこと。
> 会話の中で要件が更新され次第、該当するフェーズのファイル（および `00-context.md`）を随時編集して最新状態を保つ。

## 使い方

1. まず `00-context.md` を読み、プロジェクト全体の技術スタック・方針を把握する（各フェーズファイルもこれを前提にしている）。
2. `01-monorepo-and-docker.md` から順番に、1ファイルずつ Claude Code への依頼プロンプトとして渡して実行する。
3. 各フェーズ末尾の「完了条件」を実際に確認できてから、次のフェーズに進む。前フェーズが未確認のまま次に進まない。
4. 途中で問題が起きた場合は、そのフェーズの範囲内で解決してから次に進む（前提が壊れた状態で後続フェーズを実行しない）。

## フェーズ一覧

| # | ファイル | 内容 |
|---|---|---|
| - | [00-context.md](./00-context.md) | 全体の目的・技術スタック（全フェーズ共通の前提） |
| 1 | [01-monorepo-and-docker.md](./01-monorepo-and-docker.md) | pnpm workspace の雛形 + Docker基盤（Dockerfile/docker-compose） |
| 2 | [02-app-scaffolding.md](./02-app-scaffolding.md) | Next.js（apps/web）/ Hono（apps/api）のアプリ雛形をコンテナ経由で作成 |
| 3 | [03-database.md](./03-database.md) | Prisma + SQLite の導入・初期スキーマ |
| 4 | [04-shared-contract-and-integration.md](./04-shared-contract-and-integration.md) | packages/shared によるAPI契約 + FE→BE連携 |
| 5 | [05-cors-and-auth.md](./05-cors-and-auth.md) | CORS + JWT認証 |
| 6 | [06-lint-and-test.md](./06-lint-and-test.md) | ESLint/Prettier + テスト（Vitest / bun:test） |
| 7 | [07-ci-and-git.md](./07-ci-and-git.md) | GitHub Actions（lintのみ）+ git init/GitHub連携 |
