/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['marketmingles.s3.eu-north-1.amazonaws.com']
	},
	experimental: { missingSuspenseWithCSRBailout: false }
}

export default nextConfig
