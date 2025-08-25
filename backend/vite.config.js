import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    server: {
        port: 4777,
    },
});