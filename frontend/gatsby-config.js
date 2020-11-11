/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: 'http://localhost:5000',
        contentTypes: [
          'Lecturers',
          'Użytkownicy'
        ],
        queryLimit: 1000,
      },
    },
  ],
}
