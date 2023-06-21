<template>

  <Header></Header>

  <div class="content">
    我的挂号单
  </div>

  <Footer></Footer>

</template>

<script>
import Footer from "@/components/communion/Footer.vue";
import Header from "@/components/communion/Header.vue";

import Global_color from "@/app/Global_color.vue";

export default {
  components: {
    Header,
    Footer,
  },

  data() {
    return {
      grey: Global_color.model_color,
      green: Global_color.main_color,
      font_grey: Global_color.font_grey,


    }
  },

  methods: {

    // 判断是否已经登录状态
    isLogin() {
      // 判断sessionStorage中是否有登录信息
      if (sessionStorage.getItem("user") != null && sessionStorage.getItem("userToken")) {
        // 存在登录信息就从sessionStorage中提取状态再传值给vuex中
        this.$store.commit("user", sessionStorage.getItem("user"));
      } else {
        // 登录不成功就将vuex中的state清空
        this.$store.commit("user", null);
      }
      // 返回登录状态isLogin
      return this.$store.getters.isLogin;
    },

    // 通过登录状态来判断用户是否登录执行相关的操作
    ver() {
      if (this.$store.state.isLogin) {
        // console.log(this.$store.state)
        console.log("已登录")
      } else {
        //如果没有登录就返回登录界面
        this.$router.push("/")
      }
    },

  },

  created() {
    this.isLogin();
    this.ver();
  }
}
</script>

<style scoped>
.content {
  min-height: 600px;
}
</style>
