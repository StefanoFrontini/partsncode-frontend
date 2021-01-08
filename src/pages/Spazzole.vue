<template>
  <Layout>
    <div class="page">
      <Header />
      <h1 class="h1">Spazzole</h1>
      <form v-on:submit.prevent class="search-form">
        <label class="label" for="search-id">Filtra per codice</label>
        <input
          id="search-id"
          v-model="userInput"
          type="search"
          class="search"
        />
        <br />
        <small class="help">Inserisci qui il codice che cerchi</small>
        <p v-if="output.length === 1">
          La ricerca coincide con {{ output.length }} spazzola
        </p>
        <p v-else>La ricerca coincide con {{ output.length }} spazzole</p>
      </form>

      <transition-group name="fade" tag="div" class="box-container">
        <ProdottoCard
          v-for="edge in output"
          :key="edge.node.id"
          :prodotto="edge.node"
          :userInput="userInput"
        />
      </transition-group>

      <!--    <div v-for="img in edge.node.altre_immagini" :key="img.id">
                <g-image :src="img.url" />
                <p>Applicazioni: {{ edge.node.applicazioni }}</p>
                <p>Codici alternativi: {{ edge.node.codici_alternativi }}</p>
                </div> -->

      <!--  </div> -->
    </div>
  </Layout>
</template>

<page-query>

query {
    prodotti: allStrapiProdotto{
      edges{
        node{
          id
          codice
          codici_alternativi
          descrizione
          applicazioni
          immagine_principale {
            url
          }
          altre_immagini {
            url
          }
          categories{
            id
            nome
          }
          prezzo

        }
      }
    }

}

</page-query>

<static-query>
query {
  metadata {
    siteName
    siteUrl
    siteDescription
  }
}
</static-query>

<script>
import Header from "~/components/Header.vue";
import ProdottoCard from "~/components/ProdottoCard.vue";

export default {
  components: {
    Header,
    ProdottoCard,
  },
  metaInfo() {
    return {
      title: "Spazzole e Porta Spazzole",
      titleTemplate: "%s",
      meta: [
        {
          key: "description",
          name: "description",
          content: "Elenco spazzole e porta spazzole",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Elenco spazzole e porta spazzole | AncoCar",
        },
        {
          property: "og:description",
          content: "Elenco spazzole e porta spazzole",
        },
        {
          property: "og:url",
          content: `${this.$static.metadata.siteUrl}/spazzole/`,
        },
        { property: "og:image", content: `${this.ogImageUrl}` },

        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Elenco spazzole e porta spazzole | AncoCar",
        },
        {
          name: "twitter:description",
          content: "Elenco spazzole e porta spazzole",
        },
        {
          name: "twitter:site",
          content: `${this.$static.metadata.siteUrl}/spazzole/`,
        },
        { name: "twitter:creator", content: "AncoCar" },
        { name: "twitter:image", content: `${this.ogImageUrl}` },
      ],
    };
  },
  data: () => ({
    userInput: "",
    output: [],
    link: "/",
  }),
  methods: {
    findMatches(wordToMatch, prodotti) {
      return this.$page.prodotti.edges.filter((edge) => {
        const regex = new RegExp(wordToMatch, "gi");
        return edge.node.codice.match(regex);
      });
    },
  },

  watch: {
    userInput: {
      immediate: true,
      handler() {
        const matchArray = this.findMatches(
          this.userInput,
          this.$page.prodotti.edges
        );
        this.output = matchArray;
      },
    },
  },
  computed: {
    ogImageUrl() {
      return `${this.$static.metadata.siteUrl}/logo-ancocar.jpeg`;
    },
  },

  mounted() {
    //console.log(JSON.stringify(this.output));
  },
};
</script>

<style>
.label {
  display: block;
  margin-bottom: 5px;
}

.page {
  min-height: 100vh;
}

.hl {
  background-color: rgb(145, 145, 0);
  text-transform: uppercase;
}

.h1 {
  text-align: center;
}

.help {
  font-size: 0.6rem;
}

.search-form {
  text-align: center;
  margin-top: 50px;
}

.search {
  width: 140px;
  height: 30px;
  font-size: 0.9rem;
  text-align: center;
  border: none;
  font-family: "Montserrat", sans-serif;
}

.search:focus,
.search:hover {
  background-color: floralwhite;
}

.box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box {
  width: 250px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 40px;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .search {
    font-size: 16px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: ease opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
