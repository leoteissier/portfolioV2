import config from "./developer.json";
const siteTitle = `${config.name} | ${config.role}`
require('dotenv').config()

/*
 * Nuxt 3 Config File
 Usage: https://nuxt.com/docs/api/configuration/nuxt-config
 */
let nuxtConfig = defineNuxtConfig({

    /**
     * * App Config
     * app config: https://nuxt.com/docs/api/configuration/nuxt-config#app
     * head config: https://nuxt.com/docs/api/configuration/nuxt-config#head
     * meta config: https://nuxt.com/docs/getting-started/seo-meta
     * pageTransition config: https://nuxt.com/docs/getting-started/transitions#transitions
     */
    app: {
        head: {
            title: siteTitle,
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'A awesome developer portfolio design.' },
                { hid: 'og:title', property: 'og:title', content: siteTitle },
                { hid: 'og:description', property: 'og:description', content: 'A awesome developer portfolio design.' },
                { hid: 'og:image', property: 'og:image', content: 'demo-share.jpg' },
                { hid: 'og:url', property: 'og:url', content: 'https://developer-portfolio-v1.netlify.app/' },
                { name: 'theme-color', content: '#010C15' },
            ],
        },
    },

    /**
     * * Nuxt 3 Modules
     * Official modules: https://nuxt.com/modules
     */
    modules: [
        '@nuxtjs/tailwindcss',
        ['nuxt-mail', {
            message: {
                to: 'mmi21c14@mmi-troyes.fr',
            },
            smtp: {
                host: "smtp.mmi-troyes.fr",
                port: 587,
            },
        }],
    ],

    components: {
        dirs: [
            '~/components',
        ],
    },
    /**
     * * Tailwind CSS Config
     * Options: https://tailwindcss.nuxt.dev/getting-started/options/
     * Docs: https://tailwindcss.nuxt.dev
     */
    tailwindcss: {
        cssPath: '~/assets/tailwind.css',
        configPath: 'tailwind.config',
        exposeConfig: true, // true to resolve the tailwind config in runtime. https://tailwindcss.nuxt.dev/getting-started/options/#exposeconfig
        injectPosition: 0,
        viewer: false,
    },

    /**
     * * Runtime Config (Environment Variables)
     * Usage: https://nuxt.com/docs/guide/going-further/runtime-config
     */
    runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: '123',
        // Keys within public are also exposed client-side
        public: {
            apiBase: '/api',
            dev: config
        }
    },
});

export default nuxtConfig
