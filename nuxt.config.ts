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
      credential: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Use environment variable
      ssr: true,
    }],
  ],
  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
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
