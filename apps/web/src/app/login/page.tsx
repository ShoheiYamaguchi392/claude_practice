"use client";

import { useState } from "react";
import { getMe, login } from "@/lib/browser-api-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    try {
      const user = await login(email);
      setResult(`Logged in as ${user.email}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function handleFetchMe() {
    setError(null);
    setResult(null);
    try {
      const user = await getMe();
      setResult(`/users/me -> ${JSON.stringify(user)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleFetchMe}>Fetch /users/me</button>
      {result && <p data-testid="result">{result}</p>}
      {error && (
        <p data-testid="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </main>
  );
}
