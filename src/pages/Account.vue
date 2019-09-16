<template>
  <v-app>
    <h-app-bar />
    <h-sider />

    <v-content>
      <v-flex xs12 sm12 md12 lg10 xl10 px-10>
        <v-layout align-center justify-center text-center row wrap>
          <transition v-if="this.$store.state.account.isSignedIn" name="slide-y-transition">
            <router-view></router-view>
          </transition>
          <h-introduction v-else />
        </v-layout>
      </v-flex>
    </v-content>
  </v-app>
</template>

<script>
const axios = require("axios");
import HAppBar from "../components/account/HAppBar";
import HSider from "../components/account/HSider";
import HIntroduction from "../components/account/HIntroduction";

export default {
  name: "Account",
  components: {
    HAppBar,
    HSider,
    HIntroduction
  },
  async created() {
    this.loading = true;
    if (this.$cookies.get("token")) {
      try {
        await this.$store.dispatch(
          "account/getAccount",
          this.$cookies.get("token")
        );
      } catch (error) {
        console.log(error);
      }
    }
    this.loading = false;
  }
};
</script>
