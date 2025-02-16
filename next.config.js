/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'raw.githubusercontent.com','avatars.githubusercontent.com'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.githubusercontent.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '*public.blob.vercel-storage.com',
                port: '',
                pathname: '**',
            },
        ],
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/signin',
            permanent: true, // Define como redirecionamento permanente (301)
          },
        ];
      },
}

module.exports = nextConfig
