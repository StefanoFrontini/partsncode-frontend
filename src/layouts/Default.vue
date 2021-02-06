<template>
  <div class="layout">
    <slot />
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
</style>
