<template>
  <v-card :loading="loading" width="450" height="400" flat outlined class="mt-12">
    <v-flex mt-8 mb-5 xs12 lg12>
      <Logo :value="$config.org" />
    </v-flex>
    <v-flex my-4 xs12 lg12>
      <h2>修改</h2>
    </v-flex>
    <v-flex my-4 xs12 lg12>
      <div class="body-1">您的 {{this.$config.org}} 账号</div>
    </v-flex>
    <v-flex my-10 mx-12>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout mx-0 row wrap>
          <v-flex xs6 pr-4>
            <v-text-field
              v-model="lastName"
              label="姓氏"
              :rules="[rules.required, rules.atmost32characters]"
              outlined
              filled
              validate-on-blur
            ></v-text-field>
          </v-flex>
          <v-flex xs6 pl-4>
            <v-text-field
              v-model="firstName"
              label="名字"
              :rules="[rules.required, rules.atmost32characters]"
              outlined
              filled
              validate-on-blur
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
    <v-flex my-12 mx-12>
      <v-layout align-left justify-center row fill-height text-left>
        <v-flex xs3>
          <v-btn text color="primary" @click="$router.go(-1)">返回</v-btn>
        </v-flex>
        <v-flex xs6></v-flex>
        <v-flex xs3>
          <v-btn color="primary" depressed @click="validate">保存</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-card>
</template>

<script>
const axios = require("axios");
import rules from "../../../assets/js/rules";
import Logo from "../../Logo";

export default {
  components: {
    Logo
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        if (
          this.firstName == this.$store.state.account.firstName &&
          this.lastName == this.$store.state.account.lastName
        ) {
          this.$router.go(-1);
          return;
        }

        this.loading = true;
        try {
          const res = await this.$store.dispatch("account/putAccount", {
            token: this.$cookies.get("token"),
            field: "name",
            firstName: this.firstName,
            lastName: this.lastName
          });
          if (res.status != 202) {
            this.errors = ["更新错误"];
            return;
          }
          this.errors = [];
          this.$router.go(-1);
        } catch (error) {
          console.log(error);
          this.$router.push("/signin/sorry");
        } finally {
          this.loading = false;
        }
      }
    }
  },
  data() {
    return {
      valid: true,
      loading: false,
      rules,
      firstName: this.$store.state.account.firstName,
      lastName: this.$store.state.account.lastName
    };
  }
};
</script>
