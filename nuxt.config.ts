// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
      apiPrefix: process.env.NUXT_PUBLIC_API_PREFIX || '/api/v1'
    }
  },

  fonts: {
    providers: {
      google: false,
      googleicons: false
    }
  },

  icon: {
    provider: 'iconify',
    serverBundle: 'local'
  },

  app: {
    head: {
      title: '模拟面试系统',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '模拟面试系统 - 提升你的面试技能' }
      ]
    }
  }
})
