<template>
  <el-carousel trigger="click" height="520px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img :src="require(`@/assets/background_${item}.jpg`)" alt="background_${item}.jpg">
    </el-carousel-item>
  </el-carousel>

  <div class="menu">
    <div class="menu-child">
      我要挂号
    </div>
    <div class="menu-child">
      查看挂号单
    </div>
    <div class="menu-child">
      管理就诊档案
    </div>
  </div>

</template>

<script>

import Global_color from "@/app/Global_color.vue";

export default {
  name: "Header",

  props: {
    msg: String,
  },

  data(){
    return {
      gray: Global_color.model_color,
      green: Global_color.main_color,
    }
  },

  methods:{

  }

}

</script>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  max-width: 100%;
}
.menu {
  display: flex;
  justify-content: space-evenly;
  margin: 120px 12% 120px 12%;
}
.menu-child {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 120px;
  border-radius: 18px;
  color: v-bind(green);
  font-size:18px;
  background-color: v-bind(gray);
  transition: all 0.45s;
}
.menu-child:hover {
  background-image: url("@/assets/background.jpg");
  box-shadow: 1px 1px 20px v-bind(green);
  border-radius: 20px;
  color: #F2F2F2;
  transform: scale(1.04);
}
</style>
