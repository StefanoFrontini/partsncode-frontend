<template>
  <Layout>
    <div class="page">
      <Header />
      <h1 class="title">Dettagli prodotto</h1>
      <div class="images">
        <div class="img-container">
          <g-image
            v-if="$page.strapiProdotto.immagine_principale"
            :src="$page.strapiProdotto.immagine_principale.url"
            :alt="
              $page.strapiProdotto.codice +
                ' ' +
                $page.strapiProdotto.descrizione
            "
          />
          <g-image v-else src="~/assets/imagenotavailable.png"></g-image>
          <hr />
        </div>
        <div v-for="img in $page.strapiProdotto.altre_immagini" :key="img.id">
          <div class="img-container">
            <g-image
              v-if="$page.strapiProdotto.altre_immagini"
              :src="img.url"
              :alt="
                $page.strapiProdotto.codice +
                  ' ' +
                  $page.strapiProdotto.descrizione
              "
            />
            <g-image v-else src="~/assets/imagenotavailable.png"></g-image>
            <hr />
          </div>
        </div>
      </div>
      <div class="boxes">
        <div
          class="box"
          v-for="cat in $page.strapiProdotto.categories"
          :key="cat.id"
        >
          <h3>CATEGORIA</h3>
          <p>{{ cat.nome }}</p>
        </div>

        <div class="box">
          <h3>CODICE PRODOTTO</h3>
          <p>{{ $page.strapiProdotto.codice }}</p>
        </div>
        <div class="box">
          <h3>DESCRIZIONE</h3>
          <p>{{ $page.strapiProdotto.descrizione }}</p>
        </div>

        <div class="box">
          <h3>CODICI ALTERNATIVI</h3>
          <p>{{ $page.strapiProdotto.codici_alternativi }}</p>
        </div>

        <div class="box">
          <h3>APPLICAZIONI</h3>
          <p>{{ $page.strapiProdotto.applicazioni }}</p>
        </div>
        <div class="box">
          <h3>PREZZO</h3>
          <p>{{ $page.strapiProdotto.prezzo }} €</p>
        </div>
      </div>
      <div class="section">
        <h2 class="title">CONTATTACI</h2>
        <div class="form-section">
          <form
            name="contact"
            method="post"
            v-on:submit.prevent="handleSubmit"
            action="/success/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label> Don’t fill this out: <input name="bot-field" /> </label>
            </p>

            <div class="sender-info">
              <div>
                <label for="name" class="label">Nome</label>
                <input type="text" name="name" v-model="formData.name" />
              </div>
              <div>
                <label class="tel" for="tel">Telefono</label>
                <input type="tel" name="tel" v-model="formData.tel" />
              </div>
              <div>
                <label class="email" for="email">Email</label>
                <input type="email" name="email" v-model="formData.email" />
              </div>
            </div>

            <div class="message-wrapper">
              <label class="message" for="message">Messaggio</label>
              <textarea
                name="message"
                v-model="formData.message"
                rows="5"
              ></textarea>
            </div>

            <button class="btn-contact" type="submit">INVIA</button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  strapiProdotto(id: $id) {
    codice
    descrizione
    codici_alternativi
    applicazioni
    immagine_principale {
      id
      url
    }
    altre_immagini {
      id
      url
    }
    categories{
      id
      nome
    }
    prezzo
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

export default {
  components: {
    Header,
  },
  data() {
    return {
      formData: {},
    };
  },
  metaInfo() {
    return {
      title: `${this.$page.strapiProdotto.codice}`,
      titleTemplate: "%s",
      meta: [
        {
          key: "description",
          name: "description",
          content: `${this.$page.strapiProdotto.descrizione}`,
        },

        { property: "og:type", content: "article" },
        {
          property: "og:title",
          content: `${this.$page.strapiProdotto.codice}`,
        },
        {
          property: "og:description",
          content: `${this.$page.strapiProdotto.descrizione}`,
        },
        { property: "og:url", content: `${this.postUrl}` },

        { property: "og:image", content: `${this.ogImageUrl}` },

        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: `${this.$page.strapiProdotto.codice}`,
        },
        {
          name: "twitter:description",
          content: `${this.$page.strapiProdotto.descrizione}`,
        },
        { name: "twitter:creator", content: "AncoCar" },
        { name: "twitter:image", content: `${this.ogImageUrl}` },
      ],
    };
  },

  computed: {
    ogImageUrl() {
      return (
        `${this.$page.strapiProdotto.immagine_principale.url}` ||
        `${this.$static.metadata.siteUrl}/logo-ancocar.jpeg`
      );
    },
    postUrl() {
      let siteUrl = this.$static.metadata.siteUrl;
      const parsedCodice = (codice) => {
        const pattern = /[a-zA-Z\d]/g;
        const new_str = this.$page.strapiProdotto.codice.match(pattern);
        const result = new_str.join("");
        return result;
      };
      let postPath = `/spazzole/spazzola/codice=${parsedCodice(
        this.$page.strapiProdotto.codice
      )}`;
      return `${siteUrl}${postPath}`;
    },
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          ...this.formData,
        }),
      })
        .then(() => this.$router.push("/grazie/"))
        .catch((error) => alert(error));
    },
  },
  beforeMount() {
    this.formData.message = `Vorrei avere maggiori informazioni sul prodotto con codice: ${
      this.$page.strapiProdotto.codice
    }`;
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
}

.section {
  text-align: center;
  margin-top: 4em;
}
.form-section {
  width: 100%;
}

.label,
.email,
.message,
.tel {
  font-weight: bold;
  display: block;
  margin-top: 1.2em;
}

input,
textarea {
  border: 1px solid #707070;
  width: 60%;
  max-width: 600px;
  padding: 1em;
  border-radius: 0.5em;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  text-align: center;
}

.btn-contact {
  padding: 1em 0;
  font-weight: bold;
  width: 20%;
  border-radius: 0.5em;
  font-size: 1.3rem;
  cursor: pointer;
  border: none;
  margin-top: 2em;
  max-width: 200px;
  background-color: white;
}

.btn-contact:hover {
  background-color: #e6e6e6;
}

.title {
  text-align: center;
  margin-bottom: 1.8em;
  text-transform: uppercase;
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.img-container {
  width: 250px;
  height: 200px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 20px;
  cursor: auto;
}
.g-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

p {
  margin-top: -10px;
  font-size: 0.75rem;
  line-height: 1rem;
}

.boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
}

.box {
  width: 250px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 40px;
  text-align: center;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="text"],
  input[type="tel"],
  input[type="email"],
  textarea {
    font-size: 16px;
  }
}
</style>
