<template>
  <header>
    <nav class="navbar navbar-light shadow fixed-top head" id="head">
      <a class="navbar-brand" href="/">
        <img src="../../assets/who-logo-white.svg" height="38" class="d-inline-block align-top" alt="Vue logo">
      </a>
      <div class="text-body">
        <span class="text-body-title">三联协和医院&nbsp;</span>
        <span class="text-body-title-mini">预约挂号系统</span>
      </div>
      <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      Dropdown List
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">登录</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
            <el-dropdown-item command="c">Action 3</el-dropdown-item>
            <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
            <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </nav>
    <br>
  </header>
</template>

<script>
import Global_color from "@/app/Global_color.vue"
import { ElMessage } from 'element-plus'

export default {
  name: "Header",

  props: {
    msg: String,
  },

  data(){
    return {
      button_color: Global_color.button_color,
      button_color1: Global_color.button_color1,
      background_color:Global_color.main_color,
    }
  },

  methods:{

    handleCommand: function(command) {
      ElMessage(`click on item ${command}`)
    },

  },

}
</script>

<style scoped>
.head{
  background-color: v-bind(background_color);
  background-image: url("@/assets/background.jpg");
}
.text-body {
  letter-spacing: 2px;
}
.text-body-title {
  font-family: SimSun, STSong, serif;
  font-weight: bold;
  color: #F2F2F2;
  font-size:38px;
}
.text-body-title-mini {
  font-family: SimSun, STSong, serif;
  font-weight: bold;
  color: #F2F2F2;
  font-size:20px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.navbar-brand{
  cursor:pointer;
}

button{
  color:v-bind(button_color);
  border-color:v-bind(border_color);
  border-radius:8px;
}
button:hover{
  background-color:v-bind(button_color1);
  border-color:v-bind(border_color1);
  border-radius:8px;
}
</style>
