<template>
    <div class="frame">
        <el-button >排班记录</el-button>
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
                                <label>{{ info.numberSourceNumber }}</label>
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
                                <label>{{ info.numberSourceNumber }}</label>
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

        <el-select v-model="selectedDoctor" clearable placeholder="选择医生">
            <el-option v-for="doctor in doctors" :key="doctor.doctorId" :label="doctor.doctorName"
                :value="doctor.doctorName" />
        </el-select>
        &nbsp;&nbsp;
        <el-select v-model="selectedConsultingRoom" clearable placeholder="选择诊室">
            <el-option v-for="room in consultingRooms" :key="room.consultingRoomId" :label="room.consultingRoomName"
                :value="room.consultingRoomName" />
        </el-select>
        <br><br>
        <el-text size="large">设置号源数量</el-text><br><br>
        <el-input-number v-model="numberSourceNum" :min="1" :max="30" />

        <div style="margin-left: 81%;margin-top: 10px;">
            <el-button type="primary" @click="confirmAdd">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Global_color from "@/app/Global_color.vue";
export default {
    data() {
        return {

            time: ['2023-06-22', '2023-06-23', '2023-06-24', '2023-06-25', '2023-06-26', '2023-06-27', '2023-06-28'],
            week: ['周六', '周日', '周一', '周二', '周三', '周四', '周五'],
            date: [],
            arrangementInfo: [],
            addVisible: false,
            selectedDate: '',
            selectedAmOrPm: '',
            selectedDoctor: '',
            selectedConsultingRoom: '',
            doctors: [],
            consultingRooms: [],
            numberSourceNum: '',

            button_color2: Global_color.button_color,
        }
    },
    created() {
        this.date = [
            { time: this.time[0], week: this.week[0] },
            { time: this.time[1], week: this.week[1] },
            { time: this.time[2], week: this.week[2] },
            { time: this.time[3], week: this.week[3] },
            { time: this.time[4], week: this.week[4] },
            { time: this.time[5], week: this.week[5] },
            { time: this.time[6], week: this.week[6] },
        ],
            this.arrangementInfo = [
                { arrangementId: 1, doctorName: '张如湾', numberSourceDate: '2023-06-24', amOrPm: '上午', numberSourceNumber: 20 },
                { arrangementId: 1, doctorName: '杨洋', numberSourceDate: '2023-06-24', amOrPm: '下午', numberSourceNumber: 20 },
                { arrangementId: 1, doctorName: '刘一鸣', numberSourceDate: '2023-06-26', amOrPm: '上午', numberSourceNumber: 20 }
            ]
    },
    methods: {
        getNowDate() {
            var date = new Date();
            var sign2 = ":";
            var year = date.getFullYear() // 年
            var month = date.getMonth() + 1; // 月
            var day = date.getDate(); // 日
            var hour = date.getHours(); // 时
            var minutes = date.getMinutes(); // 分
            var seconds = date.getSeconds() //秒
            var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            var week = weekArr[date.getDay()];
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            this.nowTime = year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
        },

        addArrangement(date, amOrPm) {
            this.addVisible = true;
            this.selectedDate = date;
            this.selectedAmOrPm = amOrPm;
            this.doctors = [
                { doctorId: 1, doctorName: '医生1' },
                { doctorId: 2, doctorName: '医生2' },
                { doctorId: 3, doctorName: '医生3' },
                { doctorId: 4, doctorName: '医生4' },
            ],
                this.consultingRooms = [
                    { consultingRoomId: 1, consultingRoomName: '诊室1' },
                    { consultingRoomId: 2, consultingRoomName: '诊室2' },
                    { consultingRoomId: 3, consultingRoomName: '诊室3' },
                    { consultingRoomId: 4, consultingRoomName: '诊室4' },
                ]
        },
        confirmAdd(){
            location.reload()
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
    height: 400px;
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