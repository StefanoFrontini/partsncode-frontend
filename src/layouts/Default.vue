<template>
  <div class="layout">
    <slot />

    <!-- <footer class="footer">
      <p>
        Parts'n'code di Corrado Di Marco e Denis Cordoni, Via Guidobaldi snc -
        64010 - Alba Adriatica (TE - Italy). Tel./Whatsapp: +39 348 077 9392,
        Email: info@partsncode.works
      </p>
    </footer> -->
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

html,
body {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
  background-color: black;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

.footer {
  text-align: center;
  margin-top: 100px;
}
</style>
