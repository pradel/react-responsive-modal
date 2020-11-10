const highlight = require('remark-highlight.js');
const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [highlight],
  },
});

module.exports = withMDX();
