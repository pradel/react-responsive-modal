module.exports = {
  siteMetadata: {
    title: 'react-responsive-modal',
    description: 'Simple responsive modal for react',
    author: 'Léo Pradel',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../README.md`,
        name: "readme",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-prismjs",
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
  ],
};
