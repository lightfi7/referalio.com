/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST_API: '',
    JWT_SECRET: 'Referalio',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
