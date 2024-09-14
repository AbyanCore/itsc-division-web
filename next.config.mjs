/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
  }
};

export default nextConfig;
