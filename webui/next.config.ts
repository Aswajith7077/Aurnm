import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.shadcnstudio.com", "github.com"],
  },
};

export default withNextVideo(nextConfig);
