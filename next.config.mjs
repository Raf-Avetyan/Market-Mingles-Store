/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'market-mingle-backend-b3bf644d7866.herokuapp.com',
				port: '3000'
			}
		]
	},
	experimental: { missingSuspenseWithCSRBailout: false }
}

export default nextConfig
