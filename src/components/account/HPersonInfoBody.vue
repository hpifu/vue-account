<template>
  <v-card flat max-width="900" color="#fafafa">
    <v-layout mt-5 text-center wrap>
      <v-flex mb-5 xs12 lg12>
        <h2>个人信息</h2>
      </v-flex>
      <v-flex mb-5 xs12 lg12>
        <div class="body-1">您在 {{this.$config.org}} 服务中使用的基本信息，例如您的姓名和照片</div>
      </v-flex>

      <v-flex xs0 lg1></v-flex>
      <v-flex mb-5 xs12 lg10>
        <!-- profile -->
        <v-card flat outlined class="px-4 py-4">
          <v-layout>
            <v-flex xs9>
              <v-card-title>个人资料</v-card-title>
            </v-flex>
            <v-flex xs3 mt-6>
              <v-avatar size="40" @click="pickFile">
                <v-img
                  v-if="this.$store.state.account.avatar && loadSuccess"
                  :src="this.$config.api.cloud + '/avatar/' + this.$store.state.account.id + '?name=' + this.$store.state.account.avatar"
                  v-on:error="loadSuccess = false"
                ></v-img>
                <v-icon v-else large>mdi-account-circle</v-icon>
              </v-avatar>

              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              />
            </v-flex>
          </v-layout>

          <v-list class="text-lg-left">
            <v-list-item-group>
              <v-list-item to="/account/update/name">
                <v-flex xs3>
                  <div class="overline">姓名</div>
                </v-flex>
                <v-list-item-title>{{this.$store.state.account.lastName}} {{this.$store.state.account.firstName}}</v-list-item-title>
                <v-icon small>mdi-chevron-right</v-icon>
              </v-list-item>
              <v-divider class="ml-4"></v-divider>
              <v-list-item to="/account/update/birthday">
                <v-flex xs3>
                  <div class="overline">生日</div>
                </v-flex>
                <v-list-item-title>{{formatBirthday(this.$store.state.account.birthday)}}</v-list-item-title>
                <v-icon small>mdi-chevron-right</v-icon>
              </v-list-item>
              <v-divider class="ml-4"></v-divider>
              <v-list-item to="/account/update/gender">
                <v-flex xs3>
                  <div class="overline">性别</div>
                </v-flex>
                <v-list-item-title>{{formatGender(this.$store.state.account.gender)}}</v-list-item-title>
                <v-icon small>mdi-chevron-right</v-icon>
              </v-list-item>
              <v-divider class="ml-4"></v-divider>
              <v-list-item to="/account/update/password">
                <v-flex xs3>
                  <div class="overline">密码</div>
                </v-flex>
                <v-list-item-title>********</v-list-item-title>
                <v-icon small>mdi-chevron-right</v-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

        <!-- contact info -->
        <v-card flat outlined class="mt-6 px-4 py-4">
          <v-card-title>联系方式</v-card-title>
          <v-list class="text-lg-left">
            <v-list-item-group>
              <v-list-item to="/account/update/email">
                <v-flex xs3>
                  <div class="overline">邮箱</div>
                </v-flex>
                <v-list-item-title>{{this.$store.state.account.email}}</v-list-item-title>
                <v-icon small>mdi-chevron-right</v-icon>
              </v-list-item>
              <v-divider class="ml-4"></v-divider>
              <v-list-item to="/account/update/phone">
                <v-flex xs3>
                  <div class="overline">电话</div>
                </v-flex>
                <v-list-item-title>{{this.$store.state.account.phone}}</v-list-item-title>
                <v-icon small>mdi-chevron-right</v-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
const axios = require("axios");

export default {
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        console.log(this.imageName);
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageFile = files[0];
          let formData = new FormData();
          formData.append("file", this.imageFile);
          axios.post(
            this.$config.api.cloud +
              "/avatar/" +
              this.$store.state.account.id +
              "?name=" +
              this.imageFile.name,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: this.$cookies.get("token")
              }
            }
          );

          this.$store.dispatch("account/putAccount", {
            token: this.$cookies.get("token"),
            field: "avatar",
            avatar: this.imageFile.name
          });

          this.loadSuccess = true;
        });
      }
    },
    formatBirthday(birthday) {
      if (!birthday) return null;
      const [year, month, day] = birthday.split("-");
      return `${year} 年 ${month} 月 ${day} 日`;
    },
    formatGender(gender) {
      return {
        0: "保密",
        1: "男",
        2: "女"
      }[gender];
    }
  },
  data: () => ({
    loadSuccess: true
  })
};
</script>
