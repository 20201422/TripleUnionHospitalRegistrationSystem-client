<template>
    <div style="margin-top: 12%;margin-left: 6%;">
        <el-table :data="patientQueue" style="width: 85%" height="320"
            :default-sort="{ prop: 'numberSourceDate', order: 'descending' }">
            <el-table-column prop="patientName" label="挂号人姓名" width="120" align="center" />
            <el-table-column prop="recordsName" label="就诊人姓名" width="120 " align="center" />
            <el-table-column prop="numberSourceDate" sortable label="预约日期" width="150" align="center" />
            <el-table-column prop="consultationPeriod" label="预约时段" width="150" align="center" />
            <el-table-column prop="recordsPatientSex" label="性别" width="80" align="center" />
            <el-table-column prop="recordsPatientAddress" label="地址" width="220" align="center" />
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template #default="index">
                    <el-button link type="primary" size="large">
                        <span>查看</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pagination.current" :page-sizes="[6, 10]" :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" class="page">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            doctorId: this.$store.state.userId,
            patientQueue: [],
            pagination: {
                current: 1, //当前页
                total: 0, //记录条数
                size: 6, //每页条数
            },
        }
    },
    created() {
        this.$axios.get("/patientQueue/getByDoctorId/" + this.doctorId).then(response => {
            this.patientQueue = response.data.data
            this.pagination.total = response.data.data.length
        }).catch(error => { })
    },
    methods: {
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
}
</script>

<style scoped></style>