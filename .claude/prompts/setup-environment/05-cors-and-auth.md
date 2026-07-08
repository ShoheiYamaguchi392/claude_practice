# フェーズ5: CORS + 認証

> 実行前に `00-context.md` を読むこと。また、フェーズ4（`04-shared-contract-and-integration.md`）が完了し、FE→BEの疎通が確認できていることが前提。

## このフェーズのゴール

`apps/api` に CORS 設定と JWT 認証を実装し、FE から認証付きでアクセスできる状態にする。

## 手順

1. `apps/api` に `hono/cors` ミドルウェアを設定する
   - 許可オリジンを `apps/web` の開発用オリジンに限定する
   - `credentials: true` を設定し、Cookie 送受信に対応する
2. `apps/api` に `hono/jwt` ミドルウェアを導入し、以下を実装する
   - ログイン API（例: `POST /login`）: 認証成功時に JWT を発行し、httpOnly + Secure な Cookie に格納する
   - 保護対象のルート（例: 既存の `/users` 系ルートの一部、または新規ルート）に JWT 検証ミドルウェアを適用する
3. `apps/web` 側から、ログイン → 保護ルートへのアクセスという一連の流れを実際に呼び出して確認する

## 完了条件

- `apps/web` から `apps/api` への呼び出しが CORS エラーなく成功すること
- ログイン API で発行された JWT Cookie を用いて、保護ルートへのアクセスが成功すること
- 未認証（Cookie なし、または不正な JWT）の場合に、保護ルートへのアクセスが期待通り拒否されること
