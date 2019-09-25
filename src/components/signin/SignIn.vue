<template>
  <v-card width="450" height="400" flat outlined>
    <v-layout row wrap mx-0 text-left px-12>
      <v-flex mt-8 xs12 lg12>
        <Logo :value="$config.org" />
      </v-flex>
      <v-flex xs12 lg12>
        <h2>登陆</h2>
      </v-flex>
    </v-layout>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-flex mx-12 mt-6>
        <v-text-field
          v-model="username"
          label="电子邮件或者电话号码"
          :rules="[rules.required, rules.validPhoneOrEmail]"
          :error-messages="usernameErrors"
          outlined
          filled
          validate-on-blur
        ></v-text-field>
      </v-flex>
      <v-flex mx-12 mb-6>
        <v-text-field
          v-model="password"
          label="输入您的密码"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="[rules.required, rules.atleast8characters]"
          :error-messages="passwrodErrors"
          @click:append="show = !show"
          outlined
          filled
          validate-on-blur
        ></v-text-field>
      </v-flex>
    </v-form>
    <v-flex mx-12>
      <v-layout align-left justify-center row fill-height text-left>
        <v-flex xs8>
          <v-btn text color="primary" pl-0 to="/signup">创建账号</v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn color="primary" depressed @click="validate">登录</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
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
            "signin/verify",
            "username"
          );
          if (!okTips1.ok) {
            this.usernameErrors = [okTips1.tip];
            return;
          }
          const res = await this.$store.dispatch("signin/signIn");
          if (!res.valid) {
            this.passwrodErrors = ["密码错误"];
            return;
          }
          this.$router.push("/account");
        } catch (error) {
          this.$router.push("/signin/sorry");
        } finally {
          this.loading = false;
        }
      }
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.signin.username;
      },
      set(username) {
        this.$store.commit("signin/setUsername", username);
      }
    },
    password: {
      get() {
        return this.$store.state.signin.password;
      },
      set(password) {
        this.$store.commit("signin/setPassword", password);
      }
    }
  },
  data() {
    return {
      show: false,
      valid: true,
      usernameErrors: [],
      passwrodErrors: [],
      loading: false,
      rules
    };
  }
};
</script>
