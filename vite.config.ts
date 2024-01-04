import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    plugins: [
        mkcert(),
        tsconfigPaths(),
        react(),
        svgr({
            include: "**/*.svg",
        }),
    ],
    server: {
        port: 8443,
    },
});
