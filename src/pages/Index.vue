<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images
    <g-image alt="Example image" src="~/favicon.png" width="135" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
    </p>

    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>



    <section>
    <h1>partsncode()</h1>
    </section>

    <section>
    <h1>Cosa facciamo</h1>
    <p>
      Qualità, prezzo e tempi di consegna ridotti, sono gli ingredienti essenziali di una buona fornitura ricambi. Il nostro obiettivo è risolvere il tuo fermo macchina nel minor tempo possibile individuando i componenti necessari sul più vasto territorio possibile: il mondo intero!
    </p>
    <p>
      L'utilizzo e lo sviluppo delle più moderne tecnologie web per ricerca ricambi ci rende il partner ideale per la fornitura di parti per macchine industriali, escavatori, macchine agricole, artigianali, etc.. Dalla rapida ricerca del pezzo alle trattative con il fornitore, fino allo sdoganamento e alla spedizione door-to-door: pensiamo a tutto noi! Non ti resta che rilassarti e attendere l'arrivo dei componenti richiesti.

    </p>
    </section>

    <section>
    <h1>Dove siamo</h1>
    </section>

    <section>
    <h1>Contattaci</h1>
    <font-awesome :icon="['fas', 'cogs']"/>

    </section>
  -->
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

<script>
import Header from "~/components/Header.vue";

export default {
  components: {
    Header,
  },
  metaInfo: {
    title: "PartsnCode",
    titleTemplate: "%s",
  },
};
</script>

<style scoped>
.image_bg {
  background: url(~@/assets/parts-home.jpeg);
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

  top: 0;
  bottom: 60%;
  left: 3%;
  right: 0;
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
</style>
