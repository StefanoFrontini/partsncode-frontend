<template>
  <Layout>
    <Header />
    <div class="page">
      <div>
        <h1>Grazie!</h1>
        <p>Verrai contattato al più presto</p>
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
      title: "Grazie | AncoCar",
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
