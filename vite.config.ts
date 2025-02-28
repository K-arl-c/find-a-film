import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        base: './index.html',  
        addMovie: './addMovie.html',
        review: './src/review.html',
      }
    }
  }
});
