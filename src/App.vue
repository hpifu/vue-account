<template>
  <v-app>
    <transition name="slide-x-transition" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<style>
#app {
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

footer.v-footer a {
  color: rgba(0, 0, 0, 0.54);
}
</style>
