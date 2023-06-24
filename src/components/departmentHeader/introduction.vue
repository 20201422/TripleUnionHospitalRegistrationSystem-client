<template>
    <div style="margin-top: 100px;">
        <span>名称：{{ this.departmentInfo.departmentName }}</span><br><br>
        <span>类型：{{ this.departmentInfo.departmentType }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            departmentId: '',
            departmentInfo:{},
        }
    },
    created() {
        this.$axios.get("/arrangement/findDepartmentIdByDoctorId/" + this.$store.state.userId).then(response => {
            this.departmentId = response.data.data
            this.$axios.get("/department/get/"+this.departmentId).then(response => {
                this.departmentInfo = response.data.data
            }).catch(error => {});
        }).catch(error => {

        });
    },
    methods: {

    }
}
</script>

<style scoped></style>