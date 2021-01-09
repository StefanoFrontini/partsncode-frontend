// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "AncoCar",
  siteDescription:
    "Vendita Spazzole e Portaspazzole Motorini Avviamento e Alternatori Auto storiche e d’epoca",
  siteUrl: "https://www.ancocar.com/",
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
    {
      use: "gridsome-plugin-gtm",
      options: {
        id: "GTM-M3L7LHN",
        enabled: true,
        debug: false,
      },
    },
  ],
};
