/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/rick-and-morty',
        },
      ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rickandmortyapi.com',
                port: '',
                pathname: '/api/character/avatar/**',
            },
        ],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        rules: [
          {
            test: /\.svg$/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  icon: true,
                },
              },
            ],
          },
        ],
      });
  
      return config;
    },
  };

export default nextConfig;
