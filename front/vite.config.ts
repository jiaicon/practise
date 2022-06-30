import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import styleImport from "vite-plugin-style-import";
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },

  build: {
    polyfillDynamicImport: false,
    outDir: path.join(__dirname, './../server/front'),
    rollupOptions: {
      output: {
        // Don't generate vendor bundle
        // This enfoces vite to bundle everything into one single file
        manualChunks: {
          "arco-design": ["@arco-design/web-react"],
        },
      },
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // Customize antd stylings here
        modifyVars: {
          // arcoblue-6 is the primary-color :)
          "arcoblue-6": "#1DA57A",
        },
      },
    },
  },

  plugins: [
    reactRefresh(),

    styleImport({
      libs: [
        // Dynamic import @arco-design styles
        {
          libraryName: "@arco-design/web-react",
          esModule: true,
          resolveStyle: (name) =>
            `@arco-design/web-react/es/${name}/style/index`,
        },
        {
          libraryName: "@arco-design/web-react/icon",
          libraryNameChangeCase: "pascalCase",
          resolveStyle: (name) =>
            `@arco-design/web-react/icon/react-icon/${name}`,
          resolveComponent: (name) =>
            `@arco-design/web-react/icon/react-icon/${name}`,
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:7004',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
