/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Set when the site is served from a sub-path (GitHub project page),
  // e.g. https://<user>.github.io/vireo → NEXT_PUBLIC_BASE_PATH=/vireo
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
