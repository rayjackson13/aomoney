import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      app: path.resolve('./src/app'),
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
      constants: path.resolve('./src/constants'),
      helpers: path.resolve('./src/helpers'),
      lang: path.resolve('./src/lang'),
      routes: path.resolve('./src/routes'),
      stores: path.resolve('./src/stores'),
      types: path.resolve('./src/types'),
    }
  }
};

export default config;
