<template>
  <Layout>
    <Header />
    <div class="page">
      <div>
        <h1>Acquisto riuscito!</h1>
        <p>La transazione è andata a buon fine.</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import Header from "~/components/Header.vue";

export default {
  components: {
    Header,
  },
  metaInfo() {
    return {
      title: "Grazie | PartsnCode",
      titleTemplate: "%s",
    };
  },
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}
</style>
