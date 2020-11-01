// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allStrapiProdotto {
        edges {
          node{
            id
            codice
            
          }
        }
      }
    }`);
    const parsedCodice = (codice) => {      
      const pattern = /[a-zA-Z\d]/g;
      const new_str = codice.match(pattern);
      const result = new_str.join('');      
      return result
    }
    


    data.allStrapiProdotto.edges.forEach(({ node }) => {
      createPage({
        path: `/prodotti/prodotto/codice=${parsedCodice(node.codice)}`,
        component: './src/templates/Prodotto.vue',
        context: {
          id: node.id
        }
      })
    })
  })
}
