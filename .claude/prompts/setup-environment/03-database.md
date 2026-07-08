# フェーズ3: データベース（Prisma + SQLite）

> 実行前に `00-context.md` を読むこと。また、フェーズ2（`02-app-scaffolding.md`）が完了し、`apps/api` が単体でコンテナ起動できていることが前提。

## このフェーズのゴール

`apps/api`（Bun ランタイム）に Prisma を導入し、SQLite に接続する初期スキーマを定義・マイグレーションする。Bun 上での Prisma 動作を実機で確認する（既知の互換性リスクがある領域のため、このフェーズで動作を見極める）。

## 手順

1. コンテナ経由で `apps/api` に Prisma を導入する（`docker compose run --rm api ...` の形で、`prisma init` 相当の操作を行う）
2. `apps/api/prisma/schema.prisma` に、Prisma 公式クイックスタートに準拠した定番構成として、`User` が複数の `Post` を持つ 1 対多のシンプルなモデルを定義する

   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model User {
     id    Int     @id @default(autoincrement())
     email String  @unique
     name  String?
     posts Post[]
   }

   model Post {
     id        Int     @id @default(autoincrement())
     title     String
     content   String?
     published Boolean @default(false)
     author    User    @relation(fields: [authorId], references: [id])
     authorId  Int
   }
   ```
3. コンテナ経由でマイグレーションを実行し、SQLite の DB ファイルを生成する
4. `apps/api/src/lib/prisma.ts` に `PrismaClient` のシングルトンを用意する
5. 疎通確認用に、`User` を1件作成・取得する簡単なルート（例: `GET /users`, `POST /users`）を追加する

## 完了条件

- コンテナ内（Bun ランタイム）で Prisma のマイグレーション・クライアント生成・クエリ実行がすべて問題なく動作すること
- `POST /users` で作成したデータが `GET /users` で取得できること
- すべての Prisma 関連コマンドが `docker compose run` 経由で実行されていること
