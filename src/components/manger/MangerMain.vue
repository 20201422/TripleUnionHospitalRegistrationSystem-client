<template>
  <Header></Header>
  <div class="row">
    <div class="col-2">
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-sub-menu index="1">
          <template #title>业务管理</template>
            <router-link to='/mangerMain/businessTable' class="navs">
              <el-menu-item index="1-1">业务查看</el-menu-item>
            </router-link>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>黑名单管理</template>
          <el-menu-item index="2-1">查看黑名单</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>号源管理</template>
          <el-menu-item index="3-1">号源设置</el-menu-item>
          <el-menu-item index="3-2">号源明细</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>数据分析和统计</template>
          <RouterLink to='/mangerMain/departmentReservationData' class="navs">
            <el-menu-item index="4-1">科室预约数据统计</el-menu-item>
          </RouterLink>
          <RouterLink to='/mangerMain/doctorReservationData' class="navs">
            <el-menu-item index="4-2">医生预约数据统计</el-menu-item>
          </RouterLink>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="col-10">
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/communion/Header.vue";
import Footer from "@/components/communion/Footer";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 500px;
  margin-top: 50px;
}

.navs:hover {
    text-decoration: none;
}

</style>