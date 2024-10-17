export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2,
    },
  },
  css: ['~/assets/design-system/main.scss'],
  devtools: {
    enabled: true,
  },
  modules: [
    ['nuxt-vuefire', {
      credential: './service-account.json',
      ssr: true,
    }],
  ],
  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: 'misebox.app',
      projectId: 'misebox-78f9c',
      storageBucket: 'misebox-78f9c.appspot.com',
      messagingSenderId: '102749723716',
      appId: '1:102749723716:web:8ecc4b081c505e11017011',
    },
    auth: {
      enabled: true,
      sessionCookies: true,
    },
  },
  plugins: ['~/plugins/heroicons.js', '~/plugins/firebase.js'],
  runtimeConfig: {
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    },
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    },
  },
  imports: {
    dirs: ['composables/**', 'components/**', 'assets/**'],
  },
});
