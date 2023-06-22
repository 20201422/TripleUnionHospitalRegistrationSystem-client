<template>
    <div class="frame">
        <div style="margin-left: 19%;">
            <el-button @click="lastWeek">上一周</el-button>
            <el-button @click="nowWeek">本周</el-button>
            <el-button @click="nextWeek">下一周</el-button>
        </div>
        <div style="margin-bottom: 10px ;clear: both;">

        </div>
        <div v-for="dateInfo in date" class="arrangementtable" :key="dateKey">
            <div id="oneDay" class="oneday">
                <div id='date'>
                    <label>{{ dateInfo.time }}</label>
                    <label>{{ dateInfo.week }}</label>
                </div>

                <div id='am' class="halfday">
                    <label>上午</label>

                </div>

                <div id='pm' class="halfday">
                    <label>下午</label>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: [],
            today: '',
            dateKey: 0,  //用于界面刷新
        }
    },
    beforeMount() {
        let dateList = this.getNowWeek()
        this.date = [
            { time: dateList[0], week: '星期一' },
            { time: dateList[1], week: '星期二' },
            { time: dateList[2], week: '星期三' },
            { time: dateList[3], week: '星期四' },
            { time: dateList[4], week: '星期五' },
            { time: dateList[5], week: '星期六' },
            { time: dateList[6], week: '星期日' }
        ]
    },
    methods: {
        nameFormat(value) {
            if (value.length < 3) { //如果是两个汉字
                value = value.slice(0, 1) + '　' + value.slice(1) //拆分字符串并加入全角的空格
            }
            return value
        },
        getNowWeek() {

            let oneDayTime = 1000 * 60 * 60 * 24
            this.today = new Date()
            let todayDay = this.today.getDay() || 7
            let startDate = new Date(
                this.today.getTime() - oneDayTime * (todayDay - 1)
            )
            let dateList = []
            for (let i = 0; i < 7; i++) {
                let temp = new Date(startDate.getTime() + i * oneDayTime)
                let year = temp.getFullYear()
                let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1
                let day = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()
                dateList[i] = `${year}-${month}-${day}`
            }

            return dateList

        },

        getNextWeek() {
            let oneDayTime = 1000 * 60 * 60 * 24
            this.today.setDate(this.today.getDate() + 7)
            let todayDay = this.today.getDay() || 7
            let startDate = new Date(
                this.today.getTime() - oneDayTime * (todayDay - 1)
            )
            let dateList = []
            for (let i = 0; i < 7; i++) {
                let temp = new Date(startDate.getTime() + i * oneDayTime)
                let year = temp.getFullYear()
                let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1
                let day = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()
                dateList[i] = `${year}-${month}-${day}`
            }
            return dateList
        },
        getLastWeek() {
            let oneDayTime = 1000 * 60 * 60 * 24
            this.today.setDate(this.today.getDate() - 7)
            let todayDay = this.today.getDay() || 7
            let startDate = new Date(
                this.today.getTime() - oneDayTime * (todayDay - 1)
            )
            let dateList = []
            for (let i = 0; i < 7; i++) {
                let temp = new Date(startDate.getTime() + i * oneDayTime)
                let year = temp.getFullYear()
                let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1
                let day = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()
                dateList[i] = `${year}-${month}-${day}`
            }
            return dateList
        },
        nextWeek() {
            let dateList = this.getNextWeek()
            this.date = [
                { time: dateList[0], week: '星期一' },
                { time: dateList[1], week: '星期二' },
                { time: dateList[2], week: '星期三' },
                { time: dateList[3], week: '星期四' },
                { time: dateList[4], week: '星期五' },
                { time: dateList[5], week: '星期六' },
                { time: dateList[6], week: '星期日' }
            ]
            this.dateKey++
        },
        lastWeek() {
            let dateList = this.getLastWeek()
            this.date = [
                { time: dateList[0], week: '星期一' },
                { time: dateList[1], week: '星期二' },
                { time: dateList[2], week: '星期三' },
                { time: dateList[3], week: '星期四' },
                { time: dateList[4], week: '星期五' },
                { time: dateList[5], week: '星期六' },
                { time: dateList[6], week: '星期日' }
            ]
            this.dateKey++
        },
        nowWeek() {
            let dateList = this.getNowWeek()
            this.date = [
                { time: dateList[0], week: '星期一' },
                { time: dateList[1], week: '星期二' },
                { time: dateList[2], week: '星期三' },
                { time: dateList[3], week: '星期四' },
                { time: dateList[4], week: '星期五' },
                { time: dateList[5], week: '星期六' },
                { time: dateList[6], week: '星期日' }
            ]
            this.dateKey++
        }
    }
}
</script>

<style scoped>
.frame {
    margin-left: 5%;
    margin-top: 6%;
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

.arrangementTag {
    width: 96%;
    margin-bottom: 3px;
    cursor: pointer;
    font-size: medium;
    color: #000;
}
</style>