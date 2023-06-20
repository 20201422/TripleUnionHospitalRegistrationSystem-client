<template>
    <div class="frame">
        <el-button>排班记录</el-button>
        <div style="margin-bottom: 10px ;clear: both;">

        </div>
        <div v-for="dateInfo in date" class="arrangementtable">
            <div id="oneDay" class="oneday">
                <div id='date'>
                    <label>{{ dateInfo.time }}</label>
                    <label>{{ dateInfo.week }}</label>
                </div>

                <div id='am' class="halfday">
                    <label>上午</label>

                    <div v-for="info in arrangementInfo">
                        <div v-if="info.numberSourceDate == dateInfo.time && info.amOrPm == '上午'">
                            <div class="itemInfo">
                                <label>{{ info.doctorName }}</label>&nbsp;&nbsp;
                                <label>{{ info.number }}</label>
                            </div>
                        </div>
                    </div>

                    <el-text class="button_text" type="primary" @click="addArrangement(dateInfo.time, '上午')">添加+</el-text>
                </div>

                <div id='pm' class="halfday">
                    <label>下午</label>
                    <div v-for="info in arrangementInfo">
                        <div v-if="info.numberSourceDate == dateInfo.time && info.amOrPm == '下午'">
                            <div class="itemInfo">
                                <label>{{ info.doctorName }}</label>&nbsp;&nbsp;
                                <label>{{ info.number }}</label>
                            </div>
                        </div>
                    </div>

                    <el-text class="button_text" type="primary" @click="addArrangement(dateInfo.time, '下午')">添加+</el-text>
                </div>
            </div>
        </div>
    </div>
    <div style="margin-bottom: 50px ;clear: both;"></div>

    <el-dialog v-model="addVisible" style="min-height: 300px;" width="50%" title="添加排班" append-to-body draggable="true">
        <el-text size="large">{{ this.selectedDate }}</el-text>&nbsp;&nbsp;
        <el-text size="large">{{ this.selectedAmOrPm }}</el-text><br><br>

        <el-select v-model="selectedDoctor" clearable placeholder="选择医生" @change="selectTrigger">
            <el-option v-for="doctor in doctors" :key="doctor.doctorId" :label="doctor.doctorName"
                :value="doctor.doctorId" />
        </el-select>
        &nbsp;&nbsp;
        <el-select v-model="selectedConsultingRoom" clearable placeholder="选择诊室">
            <el-option v-for="room in consultingRooms" :key="room.consultingRoomId" :label="room.consultingRoomName"
                :value="room.consultingRoomId" />
        </el-select>
        <br><br>
        <el-text size="large">设置号源数量</el-text><br><br>
        <el-input-number v-model="numberSourceNum" :min="6" :max="30" />
        <br><br>
        <el-text size="large">剩余号源数量 {{ remainNumberSource }}</el-text>

        <div style="margin-left: 81%;margin-top: 10px;">
            <el-button type="primary" @click="confirmAdd">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Global_color from "@/app/Global_color.vue";
import { ElMessage } from 'element-plus';
export default {
    data() {
        return {
            departmentId: '1001',
            time: [],
            week: [],
            date: [],
            arrangementInfo: [],
            addVisible: false,
            selectedDate: '',
            selectedAmOrPm: '',
            selectedDoctor: '',
            selectedDoctorInfo: '',
            selectedConsultingRoom: '',
            selectedConsultingRoomType: '',
            doctors: [],
            consultingRooms: [],
            numberSourceNum: 0,
            remainNumberSource: 0, //剩余号源数量

            button_color2: Global_color.button_color,
        }
    },
    created() {
        this.$axios.get("/arrangement/findByDepartmentId/" + this.departmentId).then(response => {
            this.arrangementInfo = response.data.data
        }).catch(error => { console.log(error) })

        this.getNowDate()
    },

    methods: {
        getNowDate() {
            var date = new Date();
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            var nowTime = year + "-" + month + "-" + day
            for (let i = 7; i < 14; i++) {
                this.time.push(this.getAfterDate(i, nowTime))
            }
            this.date = [
                { time: this.time[0], week: this.week[0] },
                { time: this.time[1], week: this.week[1] },
                { time: this.time[2], week: this.week[2] },
                { time: this.time[3], week: this.week[3] },
                { time: this.time[4], week: this.week[4] },
                { time: this.time[5], week: this.week[5] },
                { time: this.time[6], week: this.week[6] },
            ]
        },
        getAfterDate(num, time) {
            let n = num;
            let d = '';
            if (time) {
                d = new Date(time);
            } else {
                d = new Date();
            }
            let year = d.getFullYear();
            let mon = d.getMonth() + 1;
            let day = d.getDate();
            let monthDay = new Date(year, mon, 0).getDate(); //当前一个月的天数
            if (day + n >= monthDay) {
                if (mon < 12) {
                    mon = mon + 1;
                } else {
                    year = year + 1;
                    mon = 1;
                }
            }
            d.setDate(d.getDate() + n);
            year = d.getFullYear();
            mon = d.getMonth() + 1;
            day = d.getDate();

            let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            this.week.push(weekday[d.getDay()])   //星期
            let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
            return s;
        },
        addArrangement(date, amOrPm) {
            this.selectedDoctor = '';
            this.selectedConsultingRoom = '';
            this.remainNumberSource = 0;
            this.addVisible = true;
            this.selectedDate = date;
            this.selectedAmOrPm = amOrPm;
            this.$axios.get("/doctor/doctors/" + this.departmentId).then(response => {
                this.doctors = response.data.data;
            }).catch(error => {
                console.log(error);
            });

            this.$axios.get("/consultingRoom/rooms/" + this.departmentId).then(response => {
                this.consultingRooms = response.data.data;
            }).catch(error => {
                console.log(error);
            });

        },
        selectTrigger() {
            this.$axios.get("/doctor/findById/" + this.selectedDoctor).then(response => {
                this.selectedDoctorInfo = response.data.data

                if (this.selectedDoctorInfo.doctorLevel == '主任医师') {
                    this.selectedConsultingRoomType = '专家门诊'
                }
                if (this.selectedDoctorInfo.doctorLevel == '主治医师') {
                    this.selectedConsultingRoomType = '特需门诊'
                }
                if (this.selectedDoctorInfo.doctorLevel == '医生') {
                    this.selectedConsultingRoomType = '普通门诊'
                }
                this.$axios.get("/arrangement/getRemainNumber", {
                    params: {
                        doctorLevel: this.selectedDoctorInfo.doctorLevel,
                        consultingRoomType: this.selectedConsultingRoomType,
                        date: this.selectedDate,
                        amOrPm: this.selectedAmOrPm
                    }
                }).then(response => {
                    this.remainNumberSource = response.data.data
                }).catch(error => { console.log(error) })
            }).catch(error => { console.log(error) })


        },
        confirmAdd() {
            this.$axios.get("/arrangement/getNumberSourceByDate", {
                params: {
                    date: this.selectedDate,
                    amOrPm: this.selectedAmOrPm,
                    consultingRoomType: this.selectedConsultingRoomType
                }
            }).then(response => {
                var id = []
                id = response.data.data  //号源id数组

                var num = this.numberSourceNum / 6  //将所有号源数量均分到6个时段
                for (var i = 0; i < id.length; i++) {
                    this.$axios.get("/arrangement/add", {
                        params: {
                            doctorId: this.selectedDoctor,
                            consultingRoomId: this.selectedConsultingRoom,
                            numberSourceId: id[i],
                            number: num
                        }
                    }).then(response => {
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })
                        location.reload()
                    }).catch(error => { console.log(error) });
                }
            }).catch(error => { console.log(error) })

        },
        cancel() {
            this.addVisible = false
        },
    },

}
</script>

<style scoped>
.row {
    justify-content: space-between;
}

.frame {
    margin-left: 5%;
    margin-top: 5%;
}

.arrangementtable {
    float: left;
}

.oneday {
    height: 500px;
    width: 100px;
    text-align: center;
}

.halfday {
    border: 1px solid var(--el-border-color);
    height: 45%;

}

label {
    display: inline-block;
}

.button_text {
    color: v-bind(button_color2);
}

.button_text:hover {
    cursor: pointer;
}

.itemInfo {
    cursor: pointer;
    border-bottom: 1px solid var(--el-border-color);
}
</style>