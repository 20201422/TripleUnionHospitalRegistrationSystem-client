<template>
  <el-dialog v-model="dialog" width="60%" :before-close="close">
    {{this.numberSource}}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close">挂号</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Global_color from "@/app/Global_color.vue";

export default {

  props: {
    numberSource: {},
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

    }
  },

  methods: {

    openDoctorInfo: function() {
      // this.$axios.get("doctor/getDoctor/"+this.numberSource).then(resp => {
      //
      // })
    },
  },

  created() {
    this.openDoctorInfo()
  },
}
</script>

<style scoped>

</style>
