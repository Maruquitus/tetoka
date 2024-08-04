/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NODE_ENV === "production"
          ? "https://back-end-tetoka.vercel.app/:path*"
          : "http://localhost:3001/:path*",
      },
    ];
  },
};

export default nextConfig;
