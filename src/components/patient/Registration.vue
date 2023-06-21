<template>
  <el-dialog v-model="dialog" width="60%" :before-close="close" title="挂号">
    <el-row class="doctor-el-row">
      <el-avatar :size="90" :src="require('@/assets/24.png')" class="doctor-avatar-border"/>
      <h2>{{this.doctor.doctorName}}</h2>
      <h4>{{this.department.departmentName}}({{this.department.departmentType}}){{this.doctor.doctorLevel}}</h4>
    </el-row>
    <div class="registration-content">
      <div class="registration-row">
        <el-row>
          就诊医院：三联协和医院
        </el-row>
        <el-row>
          就诊科室：{{this.department.departmentName}}
        </el-row>
        <el-row>
          就诊时间：{{this.numberSource.numberSourceDate}}&nbsp;
          {{moment(this.numberSource.numberSourceDate).format('ddd')}}&nbsp;
          {{this.amOrPm}}&nbsp;{{this.numberSource.consultingRoomType}}
        </el-row>
        <el-row>
          医事服务费：¥{{this.numberSource.numberSourceFee}}
        </el-row>
        <el-row>
          就诊人：
          <el-select v-model="this.form.recordsId" placeholder="请选择就诊档案" clearable>
            <el-option v-for="(record, index) in medicalRecords[0]" :key="index"
                       :label="record.recordsName" :value="record.recordsId"/>
          </el-select>
        </el-row>
      </div>
      <el-row>
        <a @click="goMedicalRecords">没有就诊档案？去添加</a>
      </el-row>
    </div>
    <el-alert title="温馨提示：" type="warning" :closable="false" style="margin:12px 0 12px 0;" />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="registration" :disabled="this.form.recordsId === ''">挂号</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Global_color from "@/app/Global_color.vue";
import moment from "moment/moment";
import 'moment/locale/zh-cn';

export default {

  props: {
    numberSource: {},
    departmentId: String,
    amOrPm: String,
    dialogVisibleForRegion: Boolean,
  },

  setup(props, context) {
    const close = () => {
      context.emit("closeDialog");  // 关闭对话框并通知父组件
    }

    return {
      close,
    }

  },

  data() {
    return {
      grey: Global_color.model_color,
      green: Global_color.main_color,
      font_grey: Global_color.font_grey,

      dialog: this.dialogVisibleForRegion,

      userId: this.$store.state.userId,
      userName: this.$store.state.userName,

      doctor: {},
      department: {},
      medicalRecords: {},

      moment: moment,

      form: {
        departmentId: '',
        doctorId: '',
        numberSourceDate: '',
        aMOrPm: '',
        recordsId: '',
      },

    }
  },

  methods: {

    getDoctorInfo: function() {
      this.$axios.get("doctor/getDoctor/"+this.numberSource.doctorId).then(resp => {
        this.doctor = resp.data.data;
        // console.log(this.doctor)
      }).catch(error => {
        console.log(error); // 处理错误信息
      });
    },

    getDepartmentInfo: function() {
      this.$axios.get("department/get/"+this.departmentId).then(resp => {
        this.department = resp.data.data;
        // console.log(this.department)
      }).catch(error => {
        console.log(error); // 处理错误信息
      });
    },
    getMedicalRecords: function() {
      this.$axios.get("patientMedicalRecords/findAll", {params: {patientId: this.$store.state.userId}})
          .then(resp => {
        this.medicalRecords = resp.data.data
        // console.log(this.medicalRecords)
      }).catch(error => {
        console.log(error); // 处理错误信息
      });
    },

    goMedicalRecords: function () {
      this.$router.push("/Patient/MedicalRecords")
    },

    registration: function () {
      this.form.departmentId = this.department.departmentId
      this.form.doctorId = this.numberSource.doctorId
      this.form.numberSourceDate = this.numberSource.numberSourceDate
      this.form.aMOrPm = this.amOrPm
      // console.log(this.form)

      this.$axios.post('registration/register', this.form).then(resp => {
        // console.log(resp.data.data); // 处理响应数据

        this.$router.push("/Patient/MyRegistration")

      }).catch(error => {
        console.log(error); // 处理错误信息
      });

    },

  },

  created() {
    this.getDoctorInfo()
    this.getDepartmentInfo()
    this.getMedicalRecords()
  },
}
</script>

<style scoped>
.doctor-el-row {
  display: flex;
  align-items: flex-end;
}
.doctor-el-row h4 {
  margin-left: 24px;
}
.doctor-avatar-border {
  border: 1px solid #175850;
  margin-right: 12px;
}

.registration-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.registration-row {
  display: flex;
  flex-direction: column;
  font-size:18px;
  margin: 27px 0 27px 0;
}
.el-row {
  padding: 8px 0 8px 0;
}
a {
  color: #175850;
}
a:hover {
  cursor: pointer;
}
</style>
