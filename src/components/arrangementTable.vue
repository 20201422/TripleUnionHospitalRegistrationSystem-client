<template>
    <div class="frame">
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

                    <el-text class="button_text" type="primary">添加+</el-text>
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

                    <el-text class="button_text" type="primary">添加+</el-text>
                </div>
            </div>
        </div>
    </div>
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
        }
    },

}
</script>

<style scoped>
.row {
    justify-content: space-between;
}

.frame {
    margin-left: 25%;
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
.itemInfo{
    cursor: pointer;
    border-bottom: 1px solid var(--el-border-color);
}
</style>