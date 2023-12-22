/** @type {import('next').NextConfig} */
const nextConfig = {
  ...require("./shared/bootstrap/next.config.js"),
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
