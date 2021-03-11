/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
    mount: {
        src: '/',
        public: '/',
    },
    routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
    devOptions: {
        port: 3000,
        src: 'src',
        bundle: false,
        routes: 'index.html',
        open: 'none',
    },
    buildOptions: {
        baseUrl: '/',
    },
    optimize: {
        minify: true,
        bundle: true,
        splitting: false,
        treeshake: true,
        manifest: true,
        target: 'es2020',
    },
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-sass',
        [
            'snowpack-plugin-terser',
            {
                /**
                 * @see Plugin Options below
                 */
                terserOptions: {
                    compress: {
                        arguments: true,
                        passes: 2,
                        unsafe_arrows: true,
                    },
                },
            },
        ],
    ],
};
