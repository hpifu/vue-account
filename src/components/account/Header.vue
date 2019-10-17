<template>
  <v-app-bar app clipped-left elevate-on-scroll class="pb-3" color="#fafafa">
    <Logo :value="$config.org" />&nbsp;&nbsp;
    <SubLogo value="account" />
    <v-spacer></v-spacer>
    <v-btn class="ma-2" outlined x-small fab color="green">
      <v-icon>mdi-view-grid</v-icon>
    </v-btn>
    <v-btn class="ma-2" outlined x-small fab color="green" to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn
      v-if="!this.$store.state.account.isSignedIn"
      :href="this.$config.web.account + '/signin?from=' + this.$config.web.tech"
      class="ma-2"
      outlined
      x-small
      fab
      color="green"
    >
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <avatar
      v-else
      :href="this.$config.web.account"
      :ifcond="this.$store.state.account.avatar"
      :src="this.$config.api.cloud + '/avatar/' + this.$store.state.account.id + '?name=' + this.$store.state.account.avatar"
    />
  </v-app-bar>
</template>

<script lang="ts">
import Logo from '../Logo.vue';
import SubLogo from '../SubLogo.vue';
import Avatar from './Avatar.vue';
import { Provide, Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Logo,
    SubLogo,
    Avatar,
  },
})
export default class HAppBar extends Vue {}
</script>
