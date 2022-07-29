const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const CompressionPlugin = require('compression-webpack-plugin')

const nextConfiguration = {
    i18n: {
        locales: ['en', 'cs'],
        defaultLocale: 'en'
    },
    async rewrites() {
        return [
            {
                source: '/about',
                destination: '/'
            }
        ]
    },
    experimental: {
        modern: false
    },

    compress: false,
    target: 'serverless', //will output independent pages that don't require a monolithic server. It's only compatible with next start or Serverless deployment platforms (like ZEIT Now) — you cannot use the custom server API.
    webpack: config => {
        // config.module.rules.push({
        //     test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        //     use: {
        //         loader: 'url-loader',
        //         options: {
        //             limit: 8192,
        //             publicPath: '/_next/static/',
        //             outputPath: 'static/',
        //             name: '[name].[ext]'
        //         }
        //     }
        // })
        // config.plugins.push(
        //     new CompressionPlugin({
        //         test: /\.js$/
        //         //|\.css$|\.html$/
        //     })
        // )
        return config
    }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

// module.exports = withBundleAnalyzer(
//   withPlugins([optimizedImages], nextConfiguration)
// );

module.exports = withPlugins(
    [
        optimizedImages,
        withBundleAnalyzer,
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.js(\?.*)?$/i
        })
    ],
    nextConfiguration
)
