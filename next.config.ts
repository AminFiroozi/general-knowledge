import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			// Add your image hosting domains here:
			// { protocol: "https", hostname: "your-s3-bucket.s3.amazonaws.com" },
		],
	},
};

export default nextConfig;
