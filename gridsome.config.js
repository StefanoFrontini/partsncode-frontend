// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Partsncode()",
  icon: {
    favicon: "./src/favicon.jpeg",
    touchicon: "./src/favicon.jpeg",
  },
  plugins: [
    {
      use: "@gridsome/source-strapi",
      options: {
        // apiURL: "http://localhost:1337",
        apiURL: "https://partsncode.herokuapp.com",
        queryLimit: 1000, // Defaults to 100
        contentTypes: ["Prodotto"],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: "",
          password: "",
        },
      },
    },
  ],
};
