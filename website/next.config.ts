import createMDX from '@next/mdx';
import remarkCodeImport from 'remark-code-import';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkCodeImport],
    rehypePlugins: [
      rehypeSlug,
      rehypeHighlight,
      [
        rehypeHeadings,
        {
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            className: 'anchor',
          },
          content: {
            type: 'element',
            tagName: 'svg',
            properties: {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 20 20',
              fill: 'currentColor',
            },
            children: [
              // Svg from https://heroicons.com/
              {
                type: 'element',
                tagName: 'path',
                properties: {
                  fillRule: 'evenodd',
                  d: 'M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z',
                  clipRule: 'evenodd',
                },
              },
            ],
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
