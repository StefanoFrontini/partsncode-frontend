<template>
  <div class="box">
    <div
      class="img-container"
      @click="$router.push({ path: findLink(prodotto.codice) })"
    >
      <g-image
        v-if="prodotto.immagine_principale"
        :src="prodotto.immagine_principale.url"
        :alt="prodotto.codice + ' ' + prodotto.descrizione"
      />
      <g-image v-else src="~/assets/imagenotavailable.png"></g-image>
    </div>
    <hr />
    <p
      class="codice"
      v-highlight="{ codice: prodotto.codice, input: userInput }"
    ></p>
    <div v-for="cat in prodotto.categories" :key="cat.id">
      <p class="category">{{ cat.nome }}</p>
    </div>
    <div class="prezzo">{{ prodotto.prezzo }} €</div>
    <div class="btn-wrapper">
      <button
        class="btn"
        @click="$router.push({ path: findLink(prodotto.codice) })"
      >
        Maggiori Informazioni
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prodotto", "userInput"],
  methods: {
    findLink(codice) {
      const pattern = /[a-zA-Z\d]/g;
      const new_str = codice.match(pattern);
      const result = new_str.join("");
      return `spazzola/codice=${result}`;
    },
  },
  directives: {
    highlight(el, binding) {
      const regex = new RegExp(binding.value.input, "gi");
      const high = binding.value.codice.replace(
        regex,
        `<span class='hl'>${binding.value.input}</span>`
      );
      el.innerHTML = high;
    },
  },
};
</script>

<style scoped>
.codice {
  font-weight: bold;
  text-align: center;
}

.category {
  font-size: 0.65rem;
  text-align: center;
  margin-top: -10px;
}

.box {
  width: 250px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 40px;
}
.img-container {
  width: 250px;
  height: 200px;
  cursor: pointer;
}
.g-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn {
  cursor: pointer;
}

.prezzo {
  text-align: center;
  margin-bottom: 5px;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
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
