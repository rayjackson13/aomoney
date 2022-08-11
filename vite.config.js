import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      api: path.resolve('./src/api'),
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
      constants: path.resolve('./src/constants'),
      stores: path.resolve('./src/stores'),
      utils: path.resolve('./src/utils')
    }
  }
};

export default config;
