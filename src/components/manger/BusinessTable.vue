<template>
  <el-table class="table" :data="pagination.records" border>
    <el-table-column prop="departmentName" label="科室名称" width="180" algin="center" />
    <el-table-column prop="timeFrameBeginTime" label="时段开始时间" width="180" algin="center" />
    <el-table-column prop="timeFrameEndTime" label="时段结束时间" width="180" algin="center" />
    <el-table-column prop="consultingRoom" label="门诊类型" width="180" algin="center" />
    <el-table-column prop="numberSourceNumber" label="号源数量" width="180" algin="center" />
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="pagination.current" :page-sizes="[6, 10]" :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" class="page">
    </el-pagination>
</template>

<script>
  export default {
    data() {
      return {
        pagination: {
          current: 1, //当前页
          total: 0, //记录条数
          size: 6, //每页条数
        },
      };
    },
    created() {
      this.getBusinessInfo();
    },
    methods: {
      getBusinessInfo() {
        //分页查询所有业务信息
        this.$axios(`/business/${this.pagination.current}/${this.pagination.size}`).then(res => {
          this.pagination = res.data.data;
          this.total = res.data.total;
        }).catch(error => {
          this.$message = error.message;
        });
      },
      //改变当前记录条数
      handleSizeChange(val) {
        this.pagination.size = val;
        this.getBusinessInfo();
      },
      //改变当前页码，重新发送请求
      handleCurrentChange(val) {
        this.pagination.current = val;
        this.getBusinessInfo();
      },
    }
  };
</script>
<style>
.table {
  width: 100%;
  margin-top: 90px;
  margin-left: 10%;
}

.example-pagination-block+.example-pagination-block {
  margin-top: 20px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.page {
  margin-top: 20px;
  margin-left: 27%;
  display: flex;
  align-items: center;
}
</style>