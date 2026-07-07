import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm], // GitHub-flavored markdown - the docs use tables
    rehypePlugins: [rehypeSlug], // heading ids so the doc nav can anchor-link
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
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
