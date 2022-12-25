import { resolve } from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": resolve(".", "src"),
    },
  },
  server: {
    host: "0.0.0.0",
  },
})
