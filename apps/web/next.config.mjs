/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ats/ui', '@ats/types', '@ats/validation'],
};

export default nextConfig;
