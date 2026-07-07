import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    env: {
        STRIPE_KEY: process.env.STRIPE_KEY, // pulls from .env file
    },
    webpack: (config, { dev }) => {
        if (dev) {
            // pdf-lib-table is yalc-pushed into node_modules during local dev;
            // webpack treats node_modules as immutable unless managedPaths is cleared
            config.snapshot = { ...config.snapshot, managedPaths: [] };
        }
        return config;
    },
};

export default withMDX(nextConfig);
