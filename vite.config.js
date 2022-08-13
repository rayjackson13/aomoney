import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
      constants: path.resolve('./src/constants'),
      helpers: path.resolve('./src/helpers'),
      routes: path.resolve('./src/routes'),
      stores: path.resolve('./src/stores'),
      types: path.resolve('./src/types'),
    }
  }
};

export default config;
