<template>
    <div class="listFrame">
        <el-text style="font-size: larger;">医生列表</el-text>
        <el-scrollbar height="520px">
            <div v-for="doctor in doctorList">
                <el-card shadow='always' class="cardItem">
                    <div class="content">
                        <span>{{ doctor.doctorName }}</span>&nbsp;&nbsp;&nbsp;
                        <span>{{ doctor.doctorSex }}</span><br>
                        <span>职称：{{ doctor.doctorLevel }}</span><br>
                        <span v-if="doctor.doctorLevel == '主任医师'">门诊类型：专家门诊</span>
                        <span v-if="doctor.doctorLevel == '主治医师'">门诊类型：特需门诊</span>
                        <span v-if="doctor.doctorLevel == '医生'">门诊类型：普通门诊</span>
                        <br>
                    </div>
                </el-card>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            departmentId: '1002',
            doctorList: [],

        }
    },
    created() {
        this.$axios.get("/doctor/doctors/" + this.departmentId).then(response => {
            console.log(response.data)
            this.doctorList = response.data.data
        }).catch(error => { console.log(error) });
    },
    methods: {

    }
}
</script>

<style scoped>
.listFrame {
    margin-top: 20%;
    background-color: rgba(244, 244, 245);
    padding: 20px 20px 20px 20px;
    min-height: 520px;
    border-radius: 12px;
}

.cardItem {
    margin-top: 12px;
    
}

.content {}
</style>