<template>
  <v-app-bar app clipped-left elevate-on-scroll class="pb-3" color="#fafafa">
    <v-toolbar-title class="hlogo">
      <span class="teal--text">
        <strong>{{this.$config.org}}</strong>
      </span>
      &nbsp;&nbsp;
      <span class="font-weight-light cyan--text">account</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn v-if="this.$store.state.account.email == ''" to="/signin" color="primary" depressed>登录</v-btn>
    <v-btn v-else to="/signin" color="#fafafa" depressed>
      <v-avatar size="30">
        <v-img
          v-if="this.$store.state.account.avatar && loadSuccess"
          v-on:error="loadSuccess = false"
          :src="this.$config.api.cloud + '/resource?name=' + this.$store.state.account.avatar + '&token='+ this.$cookies.get('token')"
        ></v-img>
        <v-icon v-else large>account_circle</v-icon>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<style>
.hlogo {
  font-family: "Josefin Sans", "ZCOOL XiaoWei", sans-serif;
}
</style>

<script>
export default {
  name: "HAppBar",
  data: () => ({
    loadSuccess: true
  })
};
</script>
