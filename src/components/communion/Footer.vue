<template>
  <footer>
    <hr>
    <div class="footer-help">
      需要更多帮助？致电 400-820-882X。
    </div>
    <div class="footer">
      <p>DevOps采用符合业界标准的加密技术对您提交的信息进行保密。</p>
      <hr>
      Copyright ©️ 2023 20201422-23 lnc.保留所有权利<br>
      <a href="https://beian.miit.gov.cn/" target="_blank">蒙ICP备2023001109号</a>
    </div>
  </footer>
</template>

<script>
import Global_color from "@/app/Global_color.vue"

export default {
  name: "Footer",
  props: {
    msg: String
  },
  data(){
    return{
      background_color:Global_color.main_color,
      font_color:Global_color.black1,
    }
  }
}
</script>

<style scoped>
.footer-help{
  background-color: white;
  padding: 10px 0 10px 80px;
  font-size: 20px;
  color: v-bind(font_color);
}
.footer{
  overflow: hidden;
  bottom: 0;
  margin: 0 0 0 0;
  padding: 10px 80px 20px 80px;
  background-color: v-bind(background_color);
//background-image: url("@/assets/人民大会堂.png");
  color: #F2F2F2;
  text-align: left;
  font-size: 12px;
}
.footer p{
  color: #F2F2F2;
}
a {
  color: #F2F2F2;
}
</style>
