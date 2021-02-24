module.exports = {
    // async rewrites() {
    //     return [
    //         // Rewrite everything else to use `pages/index`
    //         {
    //             source: '/:path*',
    //             destination: '/',
    //         },
    //     ];
    // },
    images: {
        domains: ['images.unsplash.com'],
    },
    i18n: {
        locales: ['en', 'sv', 'fr'],
        defaultLocale: 'en',
    },
};
