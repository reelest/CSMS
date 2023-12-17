/** @type {import('next').NextConfig} */
const nextConfig = {
  ...require("./shared/bootstrap/next.config.js"),
  output: "export",
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
