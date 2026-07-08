# フェーズ4: API契約の共有 + FE→BE連携

> 実行前に `00-context.md` を読むこと。また、フェーズ3（`03-database.md`）が完了し、`apps/api` の `/users` 系ルートが動作していることが前提。

## このフェーズのゴール

`packages/shared` に FE/BE 双方が参照する API 契約を定義し、`apps/web` から `apps/api` を呼び出せる状態にする。

## 手順

1. `packages/shared` に API 契約を定義する
   - リクエスト/レスポンス型
   - Zod スキーマ（バリデーション用）
   - 共通定数（あれば）
   - Next.js 固有の UI/hooks や Hono 固有のミドルウェア・DBアクセス層はここに置かない
2. `apps/web` / `apps/api` の双方から `packages/shared` を workspace 依存として参照できるようにする
3. `apps/web` に `apps/api` を呼び出す fetch ラッパー（API クライアント）を用意する。`packages/shared` の型を利用し、レスポンスの型安全性を確保する
4. `apps/web` の適当なページ（例: トップページ）から `apps/api` の `GET /users` を呼び出し、取得したデータを画面に表示する

## 完了条件

- `docker compose up` の状態で、`apps/web` のページから `apps/api` のデータが表示できること
- `packages/shared` で定義した型が `apps/web` / `apps/api` の両方から矛盾なく利用できていること（型エラーがないこと）
