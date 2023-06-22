<template>

  <Header></Header>

  <div class="content" v-loading="loading">
    <div class="content-register">
      <h2>用户登录</h2>
      <form>
        <div class="form-group">
          <label for="patientPhoneNumber">账号：</label>
          <input type="text" id="patientPhoneNumber" v-model="patient.patientPhoneNumber" placeholder="请输入账号" />
        </div>
        <div class="form-group">
          <label for="patientPassword">密码：</label>
          <input type="password" id="patientPassword" v-model="patient.patientPassword" placeholder="请输入密码" />
        </div>
        <button type="submit" @click.prevent="login">登录</button>
        <button type="submit" @click.prevent="register">注册</button>
      </form>
    </div>
  </div>

  <Footer></Footer>

</template>

<script>

import Header from "@/components/communion/Header.vue";
import Footer from "@/components/communion/Footer.vue";
import Global_color from "@/app/Global_color.vue";

import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  components: {
    Footer,
    Header
  },

  data() {
    return {
      grey: Global_color.model_color,
      green: Global_color.main_color,
      font_grey: Global_color.font_grey,

      patient: {
        patientPhoneNumber: '',
        patientPassword: '',
      },
      user: {
        userId: '',
        userName: '',
        userPhoneNumber: '',
        userEmail: '',
      },

      loading: ref(false) // 加载动画
    }
  },

  methods: {

    register() {
      this.$router.push("/Register")
    },

    login() {
      if (this.patient.patientName === '') { // 账号为空
        ElMessage({message: '账号为空', type: 'warning',})
      } else if (this.patient.patientPassword === '') {    // 密码为空
        ElMessage({message: '密码为空', type: 'warning',})
      } else {
        this.loading = true
        this.$axios.post("user/login", this.patient).then(resp => {
          let data = resp.data.data
          if (data === 0) { // 用户名不存在
            this.loading = false
            ElMessage.error('用户不存在❗')
          } else if (data === 1) {  // 密码错误
            this.loading = false
            ElMessage.error('密码错误❗')
          } else {
            this.user.userId = data.patientId
            this.user.userName = data.patientName
            this.user.userEmail = data.patientEmail
            this.user.userPhoneNumber = data.patientPhoneNumber
            //将用户名放入sessionStorage中
            sessionStorage.setItem("user", JSON.stringify(this.user));
            sessionStorage.setItem("userToken", data.patientName)
            //将用户名放入vuex中
            this.$store.dispatch("setUser", JSON.stringify(this.user));
            this.$store.dispatch("setToken", data.patientPassword);

            this.$router.go(-1)
          }
        }).catch(error => {
          console.log(error); // 处理错误信息
        });
      }

    }

  },

  //此方法写在method外面
  //to: Route: 即将要进入的目标路由对象
  //from: Route: 当前导航正要离开的路由
  //next()：必须执行
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      vm.$store.dispatch("setUser", null);
    });
  },

}

</script>

<style scoped>
.content {
  min-height: 600px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}
.content-register {
  background-color: rgba(0, 128, 0, 0.13);
  width: 40%;
  margin: 40px;
  padding: 24px;
  color: v-bind(green);
  border-radius: 24px;
  text-align: center;
  transition: all 0.45s;
}
.content-register:hover {
  box-shadow: 0 0 24px v-bind(green);
  border-radius: 20px;
  transform: scale(1.01);
}
.form-group {
  margin-top: 27px;
  margin-bottom: 20px;
  text-align: center;
}
label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}
input {
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid v-bind(green);
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  width: 250px;
}
button {
  margin: 12px;
  padding: 10px 80px;
  border: 1px solid v-bind(green);
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(0, 128, 0, 0.26);
  color: v-bind(green);
}
button:hover {
  background-color: v-bind(green);
  color: #F2F2F2;
}
</style>
