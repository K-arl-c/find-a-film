import { defineConfig } from 'vite';

export default defineConfig({
    base:'/find-a-film/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',  
        addMovie: './addMovie.html',
        review: './src/review.html',
      }
    }
  }
});
