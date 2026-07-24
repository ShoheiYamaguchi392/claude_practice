"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button/Button";

type TimerStatus = "stopped" | "running" | "paused";

function formatMmSs(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function TimerPage() {
  const [inputValue, setInputValue] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [status, setStatus] = useState<TimerStatus>("stopped");
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setStatus("stopped");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);

  function handleStart() {
    if (status === "paused") {
      setStatus("running");
      return;
    }

    const seconds = Number(inputValue);
    if (!Number.isInteger(seconds) || seconds <= 0) {
      setError("1以上の整数を入力してください");
      return;
    }

    setError(null);
    setRemainingSeconds(seconds);
    setStatus("running");
  }

  function handlePause() {
    setStatus("paused");
  }

  function handleReset() {
    setStatus("stopped");
    setRemainingSeconds(0);
    setInputValue("");
    setError(null);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>タイマー</h1>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={status !== "stopped"}
          placeholder="秒数"
        />
      </div>
      <p data-testid="remaining-time">{formatMmSs(remainingSeconds)}</p>
      <Button onClick={handleStart} disabled={status === "running"}>
        {status === "paused" ? "再開" : "開始"}
      </Button>
      <Button onClick={handlePause} disabled={status !== "running"}>
        一時停止
      </Button>
      <Button
        onClick={handleReset}
        disabled={status === "stopped" && remainingSeconds === 0}
      >
        リセット
      </Button>
      {error && (
        <p data-testid="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </main>
  );
}
