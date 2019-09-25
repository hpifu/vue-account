<template>
  <v-app-bar app clipped-left elevate-on-scroll class="pb-3" color="#fafafa">
    <Logo :value="$config.org" />&nbsp;&nbsp;
    <SubLogo value="account" />
    <v-spacer></v-spacer>
    <v-btn text icon>
      <v-icon>mdi-view-grid</v-icon>
    </v-btn>
    <v-btn v-if="this.$store.state.account.email == ''" to="/signin" color="primary" depressed>登录</v-btn>
    <v-btn v-else to="/signin" color="#fafafa" depressed>
      <v-avatar size="30">
        <v-img
          v-if="this.$store.state.account.avatar && loadSuccess"
          v-on:error="loadSuccess = false"
          :src="this.$config.api.cloud + '/resource?name=' + this.$store.state.account.avatar + '&token='+ this.$cookies.get('token')"
        ></v-img>
        <v-icon v-else large>mdi-account-circle</v-icon>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import Logo from "../Logo";
import SubLogo from "../SubLogo";

export default {
  components: {
    Logo,
    SubLogo
  },
  data: () => ({
    loadSuccess: true
  })
};
</script>
