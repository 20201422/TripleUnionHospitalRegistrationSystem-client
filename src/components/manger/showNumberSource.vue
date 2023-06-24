<template>
  <div class="main"></div>
  <div class="st-part">
    <el-select class="el-st" placeholder="选择科室" @change="getNumberSource" v-model="dept" clearable>
      <el-option v-for="option in deptList" :value="option">
        {{ option }}
      </el-option>
    </el-select>
    <el-select class="el-st" placeholder="选择门诊类型" @change="getNumberSource" v-model="type" clearable>
      <el-option v-for="option in typeList" :value="option">
        {{ option }}
      </el-option>
    </el-select>
    <el-select class="el-st" placeholder="选择日期" @change="getNumberSource" v-model="date" clearable>
      <el-option v-for="option in dates" :value="option">
        {{ option }}
      </el-option>
    </el-select>
    <el-button class="el-btn" type="primary" @click="addNumberSource">
      <el-icon>
        <Plus />
      </el-icon>添加
    </el-button>
  </div>
  <div class="row">
    <div class=col-6.5>
      <el-table class="table" :data="pagination.records" border>
        <el-table-column prop="departmentName" label="科室名称" width="180" algin="center" />
        <el-table-column prop="consultingRoomType" label="诊室类型" width="180" algin="center" />
        <el-table-column prop="numberSourceDate" label="所属日期" width="180" algin="center" />
        <el-table-column prop="numberSourceFee" label="费用" width="180" algin="center" />
        <el-table-column prop="numberSourceNumber" label="号源数量" width="180" algin="center" />
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pagination.current" :page-sizes="[6, 10]" :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" class="page">
      </el-pagination>

      <el-dialog v-model="Visible" style="min-height: 300px;" width="50%" title="添加业务" append-to-body draggable="true">
        <el-text style="margin-left: 200px;">科室名称：</el-text>
        <el-select style="width: 205px;" @change="handleChange" v-model="deptname" clearable placeholder="选择科室">
          <el-option v-for="deptn in deptnameList" :value="deptn"
            :label="deptn" />
        </el-select>
        <br><br>
        <el-text style="margin-left: 200px;">门诊类型：</el-text>
        <el-select style="width: 205px;" @change="handleChange2" v-model="roomtype" :disabled="selectdisabled" clearable
          placeholder="选择门诊类型">
          <el-option v-for="room in rooms" :value="room" />
        </el-select>
        <br><br>
        <el-text style="margin-left: 200px;">所属日期：</el-text>
        <el-date-picker style="width: 205px;" @change="handleChange3" v-model="pickerdate" format="YYYY-MM-DD"
        value-format="YYYY-MM-DD" type="datetime" placeholder="选择时间" :default-time="defaultTime" :disabled="pickerdisabled"
          :disabled-date="disabledDates" />
        <br><br>
        <el-text style="margin-left: 200px;">挂号费用：</el-text>
        <el-input-number style="width: 205px;" v-model="numberSourceFee" />
        <div style="margin-left: 81%;margin-top: 10px;">
          <el-button type="primary" @click="sumbit" :disabled="disabled">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
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
      dept: "", //科室名称
      date: "", //日期
      type: "", //门诊类型
      deptList: [],
      typeList: [],
      dates: [],
      pickerdate: "",
      pickerdates: [],
      Visible: false,
      deptname: "",
      deptnameList: [],
      roomtype: "",
      rooms: ['普通门诊', '专家门诊', '特需门诊'],
      num: 0,
      numberSourceFee:0,
      nums: [120, 300, 480, 600],
      selectdisabled: true,
      pickerdisabled: true,
      disabled: true,
    };
  },
  created() {
    this.getNumberSource()
    this.init()
    this.initDepartment()
  },
  methods: {

    init() {
      this.$axios.post('/numberSource/numberSource').then(res => {
        let datas = res.data.data
        datas.forEach(data => {
          if (!this.deptList.includes(data.departmentName)) {
            this.deptList.push(data.departmentName)
          }

          if (!this.typeList.includes(data.consultingRoomType)) {
            this.typeList.push(data.consultingRoomType)
          }

          if (!this.dates.includes(data.numberSourceDate)) {
            this.dates.push(data.numberSourceDate)
          }

        })
      })
        .catch(error => {
          this.$message = error.message;
        })
    },

    initDepartment() {
      this.$axios.post('/business/businessList').then(res => {
        let datas = res.data.data
        let set = new Set(datas.map(item => item.departmentName))
        this.deptnameList = Array.from(set)
      })
        .catch(error => {
          this.$message = error.message;
        })
    },

    addNumberSource() {
      this.Visible = true
    },

    getNumberSource() {
      //分页查询号源信息
      this.$axios.get('/numberSource/numberSourcePage', {
        params: {
          page: this.pagination.current,
          size: this.pagination.size,
          departmentName: this.dept,
          consultingRoomType: this.type,
          numberSourceDate: this.date
        }
      }).then(res => {
        this.pagination = res.data.data
        this.total = res.data.total
      }).catch(error => {
        this.$message = error.message;
      })
    },

    handleChange() {
      if (this.deptname.length === 0 || this.deptname === "") {
        this.selectdisabled = true
      }
      else {
        this.selectdisabled = false
      }
    },

    handleChange2() {
      if (this.roomtype.length === 0 || this.roomtype === "") {
        this.pickerdisabled = true;
      }
      else {
        this.pickerdisabled = false;
        this.$axios.get('/numberSource/forbidDate', {
          params: {
            departmentName: this.deptname,
            consultingRoomType: this.roomtype,
          },
        }).then(res => {
          this.pickerdates = res.data.data
          console.log(this.pickerdates)
        }).catch(error => {
          this.$message = error.message;
        })
      }
    },

    handleChange3() {
      if (this.pickerdate === "") {
        this.disabled = true
      }
      else {
        this.disabled = false
      }
    },

    disabledDates: function (date) {
      return this.pickerdates.indexOf(date) !== -1;
    },

    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getNumberSource();
    },

    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getNumberSource();
    },

    sumbit() {
      this.$axios.get('/numberSource/addNumberSource', {
        params: {
          departmentName: this.deptname,
          consultingRoomType: this.roomtype,
          numberSourceDate: this.pickerdate,
          numberSourceFee: this.numberSourceFee,
        }
      }).then(res => {
        this.cancel();
        this.getNumberSource();
        this.init();
        this.initDepartment();
      }).catch(error => {
        this.$message = error.message;
      })
    },

    cancel() {
      this.Visible = false
    },
  }
};
</script>
<style>
.table {
  width: 100%;
  margin-top: 10px;
  margin-left: 10%;
}

.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 10px;
}

.main {
  margin-top: 10px;
}

.st-part {
  margin-top: 60px;
  margin-left: 45px;
}

.page {
  margin-top: 20px;
  margin-left: 23%;
  display: flex;
  align-items: center;
}
</style>