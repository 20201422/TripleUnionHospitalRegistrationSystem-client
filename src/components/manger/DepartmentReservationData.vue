<template>
  <div class="main"></div>
  <el-select class = "select" @change="getData(dept, week)" v-model="dept" clearable>
    <el-option v-for="option in deptList" :value="option">
      {{ option }}
    </el-option>
  </el-select>
  <el-select class = "select" @change="getData(dept, week)" v-model="week" clearable>
    <el-option v-for="option in weekList" :value="option">
      {{ option }}
    </el-option>
  </el-select>
  <div class="box" ref="box"></div>
</template>

<script>

export default {
  data() {
    return {
      week: "本周",
      deptList: [],
      dept: "",
      weekList: [],
      count: [0, 0, 0, 0, 0, 0, 0]
    }
  },

  created() {
    this.init()
    setTimeout(() => {
      this.getCharts(this.count)
    }, 1000)
  },

  methods: {
    init() {
      this.$axios.post('/registrationData').then(res => {
        let datas = res.data.data;
        datas.forEach(data => {
          if (!this.deptList.includes(data.departmentName)) {
            this.deptList.push(data.departmentName)
          }
          if (!this.weekList.includes(data.weekType)) {
            this.weekList.push(data.weekType)
          }
          this.dept = this.deptList[0]
          if (data.departmentName === this.dept && data.weekType === this.week) {
            this.count[data.date - 1] = data.count
          }
        })
      })
    },
    getData(dept, week) {
      this.$axios.post('/registrationData').then(res => {
        let datas = res.data.data;
        const count = [0, 0, 0, 0, 0, 0, 0]
        datas.forEach(data => {
          if (data.departmentName === dept && data.weekType === week) {
            count[data.date - 1] = data.count
          }
        })
        this.getCharts(count)
      })
    },
    getCharts(array) {
      var chartDom = this.$refs['box'];
      var myChart = this.$echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '预约数量',
            type: 'bar',
            barWidth: '60%',
            data: array
          }
        ]
      };

      option && myChart.setOption(option);

    }
  }
}
</script>
<style>
.box {
  width: 100%;
  height: 450px;
  margin-left: 40px;
  margin-top: 100px;
}

.main {
  margin-top: 50px;
}

span {
  color: red;
  margin-left: 100px;
}
</style>