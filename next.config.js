/** @type {import('next').NextConfig} */

const { createProxyMiddleware } = require('http-proxy-middleware');
  
module.exports = {
  async rewrites() {
    return [
      // Proxy guest routes
      {
        source: '/guest/:path*',
        destination: 'http://web-app-backend-env.eba-fhgsij53.ap-southeast-2.elasticbeanstalk.com/guest/:path*',
      },
      // Proxy admin routes
      {
        source: '/admin/:path*',
        destination: 'http://web-app-backend-env.eba-fhgsij53.ap-southeast-2.elasticbeanstalk.com/admin/:path*',
      },
    ];
  },
  async serverMiddleware() {
    // Set up the proxy for guest routes
    this.middlewares.use('/guest', createProxyMiddleware({
      target: 'http://web-app-backend-env.eba-fhgsij53.ap-southeast-2.elasticbeanstalk.com',
      changeOrigin: true,
      pathRewrite: { '^/guest': '/guest' },
    }));

    // Set up the proxy for admin routes
    this.middlewares.use('/admin', createProxyMiddleware({
      target: 'http://web-app-backend-env.eba-fhgsij53.ap-southeast-2.elasticbeanstalk.com',
      changeOrigin: true,
      pathRewrite: { '^/admin': '/admin' },
    }));
  },
  reactStrictMode: true,
}
