// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/general-knowledge",
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
