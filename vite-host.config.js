import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: './host',
    server: {
      port: 5173,
    },
    plugins: [
      createHtmlPlugin({
        inject: {
          data: {
            iframeSrc: env.VITE_IFRAME_SRC || 'http://localhost:5174',
          },
        },
      }),
    ],
  };
});