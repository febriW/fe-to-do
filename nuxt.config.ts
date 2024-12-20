// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxtjs-naive-ui', '@nuxtjs/tailwindcss'],
  css: ['~/assets/styles/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  build: {
    transpile: ['vueuc'],
  },
})