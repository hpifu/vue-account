<template>
  <v-card :loading="loading" width="450" height="500" flat outlined>
    <v-layout row wrap mx-0 text-left px-8>
      <v-flex xs12>
        <v-flex mt-8 mb-5 xs12 lg12>
          <Logo :value="$config.org" />
        </v-flex>
        <v-flex my-4 xs12 lg12>
          <h2>验证您的邮箱</h2>
        </v-flex>
        <v-flex my-10>
          <p
            class="body-2"
          >为了安全起见，{{this.$config.org}} 希望确定是您本人在登录。{{this.$config.org}} 将通过邮件向您发送一个 6 位数的验证码</p>
        </v-flex>
        <v-flex mt-10 mb-4>
          <p class="body-2">
            <i>请查收邮件并输入验证码</i>
          </p>
          <p class="body-2">
            <strong>{{this.$store.state.signup.email}}</strong>
          </p>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout mx-0 row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="code"
                  label="输入验证码"
                  :rules="[rules.required, rules.validcode]"
                  :error-messages="errors"
                  outlined
                  filled
                  validate-on-blur
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
        <v-flex mt-0 mx-0>
          <v-layout align-left justify-center row fill-height text-left>
            <v-flex xs3>
              <v-btn text color="primary" @click="$router.go(-1)" pl-0>后退</v-btn>
            </v-flex>
            <v-flex xs6></v-flex>
            <v-flex xs3>
              <v-btn color="primary" depressed @click="validate">验证</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
const axios = require("axios");
import rules from "../../assets/js/rules";
import Logo from "../Logo";

export default {
  components: {
    Logo
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const okTips1 = await this.$store.dispatch(
            "signup/verifyAuthCode",
            "email"
          );
          console.log(okTips1);
          if (!okTips1.ok) {
            this.errors = [okTips1.tip];
            return;
          }
          this.$router.push("/signup/privacy");
        } catch (error) {
          console.log(error);
          this.$router.push("/signup/sorry");
        } finally {
          this.loading = false;
        }
      }
    }
  },
  computed: {
    code: {
      get() {
        return this.$store.state.signup.code;
      },
      set(code) {
        this.$store.commit("signup/setCode", code);
      }
    }
  },
  data() {
    return {
      loading: false,
      show: false,
      valid: true,
      errors: [],
      rules
    };
  }
};
</script>
