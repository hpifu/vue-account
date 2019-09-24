<template>
  <v-card :loading="loading" width="450" height="700" flat outlined>
    <v-layout row wrap mx-0 text-left px-8>
      <v-flex xs12>
        <v-flex mt-8 mb-5 xs12 lg12>
          <Logo :value="$config.org" />
        </v-flex>
        <v-flex my-4 xs12 lg12>
          <h2>创建您的 {{this.$config.org}} 账号</h2>
        </v-flex>
        <v-flex mt-10 mb-4>
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
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="邮箱"
                  :rules="[rules.required, rules.validemail, rules.atmost64characters]"
                  :error-messages="errors"
                  outlined
                  filled
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="password"
                  label="输入您的密码"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  :rules="[rules.required, rules.atleast8characters]"
                  hint="使用8个或更多字符(字母、数字和符号的组合)"
                  outlined
                  filled
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  ref="birthdayMenu"
                  v-model="birthdayMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="生日"
                      :rules="[rules.required]"
                      v-on="on"
                      outlined
                      filled
                      readonly
                      :value="dateFormatted = formatBirthday(birthday)"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="birthday"
                    no-title
                    ref="picker"
                    locale="zh-cn"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                    color="primary"
                    :day-format="date => date.split('-')[2]"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="gender"
                  :items="genderChoice"
                  item-text="val"
                  item-value="idx"
                  label="性别"
                  outlined
                  filled
                ></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
        <v-flex mt-0 mx-0>
          <v-layout align-left justify-center row fill-height text-left>
            <v-flex xs3>
              <v-btn text color="primary" pl-0 to="/signin">登录现有账号</v-btn>
            </v-flex>
            <v-flex xs6></v-flex>
            <v-flex xs3>
              <v-btn :disabled="!valid" color="primary" depressed @click="validate">下一步</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
const axios = require("axios");
import Logo from "../Logo";
import rules from "../../assets/js/rules";

export default {
  components: {
    Logo
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const okTips1 = await this.$store.dispatch("signup/verify", "email");
          if (!okTips1.ok) {
            this.errors = [okTips1.tip];
            return;
          }
          const okTips2 = await this.$store.dispatch(
            "signup/genAuthCode",
            "email"
          );
          if (!okTips2.ok) {
            this.errors = [okTips2.tip];
            return;
          }
          this.$router.push("/signup/verifyemail");
        } catch (error) {
          this.$router.push("/signup/sorry");
        } finally {
          this.loading = false;
        }
      }
    },
    formatBirthday(birthday) {
      if (!birthday) return null;
      const [year, month, day] = birthday.split("-");
      return `${year} 年 ${month} 月 ${day} 日`;
    },
    save(date) {
      this.$refs.birthdayMenu.save(date);
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.state.signup.email;
      },
      set(email) {
        this.$store.commit("signup/setEmail", email);
      }
    },
    firstName: {
      get() {
        return this.$store.state.signup.firstName;
      },
      set(firstName) {
        this.$store.commit("signup/setFirstName", firstName);
      }
    },
    lastName: {
      get() {
        return this.$store.state.signup.lastName;
      },
      set(lastName) {
        this.$store.commit("signup/setLastName", lastName);
      }
    },
    password: {
      get() {
        return this.$store.state.signup.password;
      },
      set(password) {
        this.$store.commit("signup/setPassword", password);
      }
    },
    birthday: {
      get() {
        return this.$store.state.signup.birthday;
      },
      set(birthday) {
        this.$store.commit("signup/setBirthday", birthday);
      }
    },
    gender: {
      get() {
        return this.$store.state.signup.gender;
      },
      set(gender) {
        this.$store.commit("signup/setGender", gender);
      }
    }
  },
  watch: {
    birthday(val) {
      this.dateFormatted = this.formatBirthday(val);
    },
    birthdayMenu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  data() {
    return {
      valid: true,
      show: false,
      errors: [],
      loading: false,
      dateFormatted: null,
      birthdayMenu: false,
      genderChoice: [
        { idx: 1, val: "男" },
        { idx: 2, val: "女" },
        { idx: 0, val: "保密" }
      ],
      rules
    };
  }
};
</script>
