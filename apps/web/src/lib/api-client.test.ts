import { afterEach, describe, expect, it, vi } from "vitest";
import { getUsers } from "./api-client";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getUsers", () => {
  it("returns parsed users on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { id: 1, email: "alice@example.com", name: "Alice" },
        ],
      }),
    );

    const users = await getUsers();

    expect(users).toEqual([
      { id: 1, email: "alice@example.com", name: "Alice" },
    ]);
  });

  it("throws when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    await expect(getUsers()).rejects.toThrow();
  });
});
