<template>
  <v-btn v-else :href="href" :disabled="disabled" color="green" class="ma-2" outlined x-small fab>
    <v-avatar size="30">
      <v-img v-if="ifcond && loadSuccess" v-on:error="loadSuccess = false" :src="src"></v-img>
      <v-icon v-else>mdi-account-circle</v-icon>
    </v-avatar>
  </v-btn>
</template>

<script lang="ts">
import { Provide, Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Avatar extends Vue {
  @Provide() private loadSuccess: boolean = true;
  @Prop({ default: '' }) private href!: string;
  @Prop({ default: '' }) private ifcond!: any;
  @Prop({ default: '' }) private src!: string;
  @Prop({ default: false }) private disabled!: boolean;
}
</script>