<template>
  <div class="container">
    <header class="header">
      <strong>
        <g-link to="/"
          ><g-image
            src="~/assets/logo-ancocar.jpeg"
            alt="logo AncoCar"
            width="200"
        /></g-link>
      </strong>
      <nav class="nav" :class="{ 'nav-active': isActive }">
        <!-- <g-link class="nav__link" to="/">Cosa facciamo</g-link> -->
        <g-link class="nav__link" to="/spazzole/"
          >Spazzole e Portaspazzole</g-link
        >
        <g-link class="nav__link" to="/contatti/">Contatti</g-link>
        <!-- <g-link class="nav__link" to="/">Contatti</g-link> -->

        <!-- <g-link class="nav__link" to="/">EN</g-link> -->
      </nav>
      <div class="burger" @click="toggleMenu">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </header>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  name: "Header",
  data: () => ({
    isActive: false,
  }),
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  z-index: 2;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;

  height: 10vh;
  position: relative;
}

.burger {
  display: none;
  cursor: pointer;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 5px;
}

.nav__link {
  margin-left: 0px;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
}

.footer {
  background-color: #666666;
}

@media screen and (max-width: 768px) {
  .nav {
    position: absolute;
    right: 0px;
    height: 90vh;
    top: 10vh;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    transform: translateX(100%);
    opacity: 1;
    transition: transform 0.5s ease-in;
    justify-content: space-around;
  }
  .burger {
    display: block;
  }
  .nav__link {
    color: black;
  }
}

.nav-active {
  transform: translateX(0%);
}

@media (min-width: 780px) {
  .nav__link {
    margin-left: 50px;
  }
}
</style>
