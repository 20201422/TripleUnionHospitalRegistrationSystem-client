<template>
  <Header></Header>

  <div class="content">
    <div class="content-register">
      <h2>用户登录</h2>
      <form>
        <div class="form-group">
          <label for="patientName">用户名：</label>
          <input type="text" id="patientName" v-model="patient.patientName" placeholder="请输入用户名" />
        </div>
        <div class="form-group">
          <label for="patientPhoneNumber">电话号码：</label>
          <input type="text" id="patientPhoneNumber" v-model="patient.patientPhoneNumber" placeholder="请输入电话号码" />
        </div>
        <div class="form-group">
          <label for="patientEmail">邮箱：</label>
          <input type="text" id="patientEmail" v-model="patient.patientEmail" placeholder="请输入邮箱" />
        </div>
        <div class="form-group">
          <label for="patientPassword">密码：</label>
          <input type="password" id="patientPassword" v-model="patient.patientPassword" placeholder="请输入密码" />
        </div>
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
        patientName: '',
        patientPhoneNumber: '',
        patientEmail: '',
        patientPassword: '',
      },
    }
  },

  methods: {

    register() {
      this.$axios.put("user/register", this.patient).then(resp => {
        this.$router.go(-1)
      })

    },

  }

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
  background-color: v-bind(green);
  border: 1px solid v-bind(green);
  color: #F2F2F2;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}

</style>

