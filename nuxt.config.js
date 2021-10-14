export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'testberichtnuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'swiper/swiper.scss',
    '@/assets/css/app.css',
    '@/assets/css/icomoon.css',
    '@/assets/css/tailwind.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-awesome-swiper' },
    { src: '@/plugins/vue-intl-numberformat', mode: 'client' },
    { src: '@/plugins/vue-star-rating', mode: 'client' },
    { src: '@/plugins/vue-css-percentage-circle', mode: 'client' },
    { src: '@/plugins/vuejs-paginate', mode: 'client' },
    { src: '@/plugins/vue-slider-component', mode: 'client' },
    { src: '@/plugins/vue-text-highlight', mode: 'client' },
    { src: '@/plugins/v-lazy-image' },
    { src: '@/plugins/vue-currency-input' },
    { src: '@/plugins/vue-scrollactive' },
    { src: '@/plugins/vue-youtube' },
    { src: '@/plugins/vue-instant-page', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    '@nuxtjs/pwa',
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyBC6XxuQ_k8YOkc2Z0viBO5L1CVleWxrwo",
      authDomain: "iron-pottery-164514.firebaseapp.com",
      projectId: "iron-pottery-164514",
      storageBucket: "iron-pottery-164514.appspot.com",
      // messagingSenderId: '<messagingSenderId>',
      // appId: '<appId>',
      // measurementId: '<measurementId>'
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
          // onAuthStateChangedMutation: 'auth/ON_AUTH_STATE_CHANGED_MUTATION',
          // subscribeManually: false
        },
        ssr: true
      },
      firestore: false,
      functions: false,
      storage: false,
      database: false,
      messaging: false,
      performance: false,
      analytics: false,
      remoteConfig: false
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    }
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  router: {
  }
}
