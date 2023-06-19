<template>
<div v-for="dateInfo in date">
    <div id="oneDay">
        <div id = 'date'>
            <label>{{dateInfo.time}}</label>
            <label>{{dateInfo.week}}</label>
        </div>
        <div id = 'am'>
            <label>上午</label>
        </div>
        <div id = 'pm'>
            <label>下午</label>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            date: [
                {time:time[1],week:week[1]},
                {time:time[2],week:week[2]},
                {time:time[3],week:week[3]},
                {time:time[4],week:week[4]},
                {time:time[5],week:week[5]},
                {time:time[6],week:week[6]},
                {time:time[7],week:week[7]},
            ],
            time: ['2023-06-22','2023-06-23','2023-06-24','2023-06-25','2023-06-26','2023-06-27','2023-06-28'],
            week: ['周六','周日','周一','周二','周三','周四','周五'],
            

        }
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

<style scoped></style>