<template>
  <v-card width="450" height="400" flat outlined>
    <v-layout row wrap mx-0 text-left px-8>
      <v-flex xs12>
        <v-flex mt-8 mb-5 xs12 lg12>
          <Logo :value="$config.org" />
        </v-flex>
        <v-flex my-4 xs12 lg12>
          <h2>出了点问题</h2>
        </v-flex>

        <v-flex my-4>
          <v-card class="overflow-y-auto" height="150" flat>
            <div class="body-1">抱歉，出了点问题，请重试</div>
          </v-card>
        </v-flex>

        <v-flex mt-0 mx-0>
          <v-layout align-center justify-center row fill-height text-left>
            <v-flex xs3>
              <v-btn depressed color="primary" @click="$router.go(-1)" pl-0>返回</v-btn>
            </v-flex>
            <v-flex xs6></v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
const axios = require("axios");
import Logo from "../Logo";

export default {
  components: {
    Logo
  }
};
</script>
