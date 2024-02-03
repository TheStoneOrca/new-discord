/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      "pk_test_ZmxlZXQtYW5lbW9uZS02NS5jbGVyay5hY2NvdW50cy5kZXYk",
    CLERK_SECRET_KEY: "sk_test_oKSFLOyRLXiVUtg3KH1wS86zVl42kzsDmkp5OahkR3",
    WEBHOOK_SECRET: "whsec_zLwVfE/dD6wd2FA3z5p0Dc3kaByygnbZ",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
