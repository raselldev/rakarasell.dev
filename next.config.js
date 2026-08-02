/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    // next/image optimization needs sharp, which can't run in the Cloudflare
    // Workers runtime. Serve original files unoptimized instead.
    unoptimized: true,
  },
};

module.exports = nextConfig;

// Enables `next dev` to pick up the local Cloudflare bindings/vars declared
// in wrangler.jsonc during development.
if (process.env.NODE_ENV === "development") {
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}
