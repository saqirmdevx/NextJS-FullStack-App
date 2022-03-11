/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/naming-convention
const moduleExports = {
  reactStrictMode: true,
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config
  },
}

module.exports = moduleExports
