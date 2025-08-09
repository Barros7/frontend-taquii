/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  images: {
    domains: ['res.cloudinary.com', 'avatars.githubusercontent.com', 'cdn.jsdelivr.net', 'loremflickr.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV !== 'production';
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || (isDev ? 'http://localhost:8000' : 'https://backend-taquii.onrender.com');
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
    ];
  }
};

export default nextConfig;