# フェーズ7: CI + git/GitHub連携

> 実行前に `00-context.md` を読むこと。また、フェーズ6（`06-lint-and-test.md`）が完了し、lint/テストがコンテナ経由で通ることを確認済みであることが前提。

## このフェーズのゴール

GitHub Actions による lint の自動実行を設定し、リポジトリを git 管理下に置いて GitHub と連携する。

## 手順

1. GitHub Actions のワークフローを作成する
   - `apps/web` / `apps/api` 両方に対して lint のみを実行する（build は含めない）
   - `apps/web` のジョブでは Node.js のセットアップ（`actions/setup-node` 等）を行う
   - `apps/api` のジョブでは `oven-sh/setup-bun` を使用する
   - CI は GitHub 提供のランナー上で完結するため、他フェーズで課しているコンテナ経由インストールの制約は適用しない
2. `git init` を実行し、適切な `.gitignore`（`node_modules`, `.next`, DB ファイル等を除外）を用意する
3. 初回コミットを作成する
4. 必要であれば GitHub 上にリポジトリを作成し、push する

## 完了条件

- push 時に GitHub Actions の CI（lint）が実行され、成功すること
- リポジトリが git 管理下にあり、初回コミットが作成されていること
- （GitHub 連携を行った場合）リモートリポジトリに push できていること
