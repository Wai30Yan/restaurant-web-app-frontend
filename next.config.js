/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_URL}/:path*`,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
}


// async serverMiddleware() {
//   // Set up the proxy for guest routes
//   this.middlewares.use('/guest', createProxyMiddleware({
//     target: 'http://web-app-backend-env.eba-fhgsij53.ap-southeast-2.elasticbeanstalk.com',
//     changeOrigin: true,
//     pathRewrite: { '^/guest': '/guest' },
//   }));

//   // Set up the proxy for admin routes
//   this.middlewares.use('/admin', createProxyMiddleware({
//     target: 'http://web-app-backend-env.eba-fhgsij53.ap-southeast-2.elasticbeanstalk.com',
//     changeOrigin: true,
//     pathRewrite: { '^/admin': '/admin' },
//   }));
// },
