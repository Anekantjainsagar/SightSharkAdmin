/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "source.roboflow.com",
      "i.pinimg.com",
      "encrypted-tbn0.gstatic.com",
      "storage.googleapis.com",
      "lookerstudio.google.com",
    ],
  },
};

export default nextConfig;
