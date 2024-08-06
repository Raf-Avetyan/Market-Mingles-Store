/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'marketmingles.s3.eu-north-1.amazonaws.com'
			}
		]
	},
	experimental: { missingSuspenseWithCSRBailout: false }
}

export default nextConfig
