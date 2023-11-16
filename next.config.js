/** @type {import('next').NextConfig} */

const rewrites = () => [
  {
    source: '/guest',
    destination: 'http://web-app-backend-env.eba-fhgsij53.ap-southeast-2.elasticbeanstalk.com',
  },
  {
    source: '/admin',
    destination: 'http://web-app-backend-env.eba-fhgsij53.ap-southeast-2.elasticbeanstalk.com',
  },
]


const nextConfig = {
  reactStrictMode: true,
  rewrites: rewrites()
}

module.exports = nextConfig
