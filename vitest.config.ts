import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/*.d.ts", "**/*.spec.{ts,tsx}", "**/*.test.{ts,tsx}"],
    },
  },
});
