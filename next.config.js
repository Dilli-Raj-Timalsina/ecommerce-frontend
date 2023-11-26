/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.dummyjson.com',
				port: '',
				pathname: '/*',
			},
			{
				protocol: 'https',
				hostname: "lh3.googleusercontent.com"
			}, {
				protocol: 'https',
				hostname: "platform-lookaside.fbsbx.com"
			}, {
				protocol: 'https',
				hostname: '**'
			},
		],
	},
	experimental: {
		serverActions: true
	}
}

module.exports = nextConfig