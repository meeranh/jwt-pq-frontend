import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: false
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore favicon errors
        if (path === '/favicon.png' || path === '/favicon.ico') {
          return;
        }
        throw new Error(message);
      }
    }
  }
};

export default config;
