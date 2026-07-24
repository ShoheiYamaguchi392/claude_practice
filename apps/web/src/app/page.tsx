import Link from "next/link";
import { getUsers } from "@/lib/api-client";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default async function Home() {
  const users = await getUsers();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Nextjs Training</h1>
        <div className={styles.intro}>
          <h2>Pages</h2>
          <ul>
            <li>
              <Link href="/hello-world">/hello-world</Link>:Hello World
            </li>
            <li>
              <Link href="/login">/login</Link>:ログイン
            </li>
            <li>
              <Link href="/timer">/timer</Link>:タイマー
            </li>
          </ul>
        </div>
        <div className={styles.intro}>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.email}
                {user.name ? ` (${user.name})` : ""}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.intro}>
          <h2>Figmaから生成</h2>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button>Button</Button>
            <Button disabled>Button</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
