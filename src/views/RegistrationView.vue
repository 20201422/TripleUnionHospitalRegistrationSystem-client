<template>

  <Header></Header>

  <div class="date">
    <el-space wrap>
      <el-card v-for="i in 7" :key="i" class="box-card" @click="handleCardClick(i)">
        {{ moment().add(i-1, 'days').format('YYYY-MM-DD') }}<br>
        {{ moment().add(i-1, 'days').format('dddd') }}
      </el-card>
    </el-space>
  </div>
  <div class="content">
    <ShowNumberSource :numberSourceMap="this.numberSourceMap"
                      @openDoctorInfo="openDoctorHandler" @openRegistration="openRegistration"></ShowNumberSource>
  </div>
  <div v-if="dialogVisible">
    <ShowDoctor :doctorId = "doctorId" :dialogVisible = "dialogVisible" @closeDialog="closeDoctorHandler"></ShowDoctor>
  </div>
  <div v-if="dialogVisibleForRegion">
    <Register :numberSource = "numberSource" :dialogVisibleForRegion = "dialogVisibleForRegion"
              @closeDialog="closeRegistrationHandler"></Register>
  </div>

  <Footer></Footer>

</template>

<script>
import Header from "@/components/communion/Header.vue";
import ShowDepartment from "@/components/patient/ShowDepartment.vue";
import Footer from "@/components/communion/Footer.vue";
import { useRoute } from 'vue-router'
import ShowNumberSource from "@/components/patient/ShowNumberSource.vue";
import moment from "moment/moment";
import 'moment/locale/zh-cn';
import ShowDoctor from "@/components/patient/ShowDoctor.vue";
import Register from "@/components/patient/Registration.vue";

export default {
  components: {
    Register,
    ShowDoctor,
    ShowNumberSource,
    Footer,
    ShowDepartment,
    Header
  },

  setup() {
    const departmentId = useRoute().params.departmentId


    return {
      departmentId,
    }
  },

  data() {
    return {
      numberSourceMap: {},

      dialogVisible: false,
      doctorId: '',

      dialogVisibleForRegion: false,
      numberSource: {},

      moment: moment,
    }
  },

  methods: {
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

    handleCardClick: function(i) {
      const date = moment().add(i-1, 'days').format('YYYY-MM-DD');

      this.$axios.post('numberSource/patientGetNumberSource' ,  {
        date: "2023-06-30",
        departmentId: this.departmentId
      }).then((resp) => {
        this.numberSourceMap = resp.data.data;

        // 定义门诊类型的顺序数组
        const order = ['专家门诊', '普通门诊', '特需门诊'];
        // 按照顺序排序门诊类型
        this.numberSourceMap = Object.fromEntries(
            Object.entries(this.numberSourceMap).sort(([a], [b]) => order.indexOf(a) - order.indexOf(b))
        );
        // console.log(this.numberSourceMap)
      })
    },

    openDoctorHandler: function(doctorId) {
      this.doctorId = doctorId
      this.dialogVisible = true
    },

    closeDoctorHandler: function() {
      this.dialogVisible = false
    },

    openRegistration: function(numberSource) {
      if (sessionStorage.getItem("user") === "null") {
        this.$router.push("/Login")
      } else {
        this.numberSource = numberSource
        this.dialogVisibleForRegion = true
      }
    },

    closeRegistrationHandler: function() {
      this.dialogVisibleForRegion = false
    }
  },

  created() {
    this.isLogin()
    this.handleCardClick(1)
  }
}

</script>

<style scoped>
.date {
  padding-top: 72px;
  text-align: center;
}
.date:hover {
  cursor: pointer;
}
.content {
  min-height: 600px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}
</style>
