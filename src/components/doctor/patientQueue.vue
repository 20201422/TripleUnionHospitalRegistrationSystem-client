<template>
    <div style="margin-top: 6%;">
        <el-table :data="patientQueue" style="width: 65%" height="320">
            <el-table-column fixed prop="serialNumber" label="序号" width="80" align="center" />
            <el-table-column prop="patientName" label="挂号人姓名" width="120" align="center" />
            <el-table-column prop="recordsName" label="就诊人姓名" width="120 " align="center" />
            <el-table-column prop="date" label="日期" width="150" align="center" />
            <el-table-column prop="timeFrame" label="预约时段" width="150" align="center" />
            <el-table-column prop="sex" label="性别" width="80" align="center" />
            <el-table-column prop="address" label="地址" width="220" align="center" />
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template #default="index">
                    <el-button link type="primary" size="large">
                        <span>查看</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            patientQueue: [
                {
                    serialNumber: 1,
                    date: '2023-06-22',
                    timeFrame: '8:30~9:00',
                    patientName:'Jack',
                    recordsName: 'Tom',
                    sex: '男',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    serialNumber: 2,
                    date: '2023-06-22',
                    timeFrame: '8:30~9:00',
                    patientName:'Jack',
                    recordsName: 'Tom',
                    sex: '男',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    serialNumber: 3,
                    date: '2023-06-22',
                    timeFrame: '8:30~9:00',
                    patientName:'Jack',
                    recordsName: 'Tom',
                    sex: '男',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    serialNumber: 4,
                    date: '2023-06-22',
                    timeFrame: '8:30~9:00',
                    patientName:'Jack',
                    recordsName: 'Tom',
                    sex: '男',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    serialNumber: 5,
                    date: '2023-06-22',
                    timeFrame: '8:30~9:00',
                    patientName:'Jack',
                    recordsName: 'Tom',
                    sex: '男',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    serialNumber: 6,
                    date: '2023-06-22',
                    timeFrame: '8:30~9:00',
                    patientName:'Jack',
                    recordsName: 'Tom',
                    sex: '男',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    serialNumber: 7,
                    date: '2023-06-22',
                    timeFrame: '8:30~9:00',
                    patientName:'Jack',
                    recordsName: 'Tom',
                    sex: '男',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ]
        }
    },
    methods: {

    }
}
</script>

<style scoped></style>