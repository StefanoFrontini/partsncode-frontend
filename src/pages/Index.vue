<template>
  <Layout>
    <Header />
    <section class="image_bg">
      <div class="text">
        <g-link class="link" to="/spazzole/"
          >Inserisci il codice internazionale</g-link
        >
      </div>
    </section>
  </Layout>
</template>
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
  metaInfo() {
    return {
      title: `${this.$static.metadata.siteName}`,
      titleTemplate: "%s",
      meta: [
        { property: "og:type", content: "website" },
        { property: "og:title", content: `${this.$static.metadata.siteName}` },
        {
          property: "og:description",
          content: `${this.$static.metadata.siteDescription}`,
        },
        { property: "og:url", content: `${this.$static.metadata.siteUrl}` },
        { property: "og:image", content: `${this.ogImageUrl}` },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${this.$static.metadata.siteName}` },
        {
          name: "twitter:description",
          content: `${this.$static.metadata.siteDescription}`,
        },
        { name: "twitter:site", content: `${this.$static.metadata.siteUrl}` },
        { name: "twitter:creator", content: "AncoCar" },
        { name: "twitter:image", content: `${this.ogImageUrl}` },
      ],
    };
  },
  computed: {
    ogImageUrl() {
      return `${this.$static.metadata.siteUrl}/logo-ancocar.jpeg`;
    },
  },
};
</script>

<style scoped>
.image_bg {
  background: url(~@/assets/ancocar-home.jpeg);
  height: 90vh;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;

  /*background-position: 90% 23%;*/
  opacity: 1;
}

.text {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  top: 0%;
  bottom: 60%;
  left: 2%;
  right: 2%;
  font-size: 0.75rem;
}

.link {
  text-decoration: none;
  color: white;
  background-color: rgb(220, 17, 17);
  padding: 1em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.image_bg::before {
  content: "";
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  position: absolute;
  opacity: 0.5;
}

@media (min-width: 768px) {
  .text {
    top: 0%;

    font-size: 0.8rem;
  }
}

@media (min-width: 1000px) {
  .text {
    top: 0%;

    font-size: 1rem;
  }
}

@media (min-width: 1300px) {
  .text {
    font-size: 1.4rem;
  }
}
</style>
