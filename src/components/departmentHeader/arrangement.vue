<template>
    <div class="row" style="margin-top: 30px;">
        <div class="col-8">
            <div class="frame">
                <el-button @click="recordsVisible = true">排班记录</el-button>
                <div style="margin-bottom: 10px ;clear: both;">

                </div>
                <el-scrollbar height="520px">
                    <div class="scrollbar-flex-content">
                        <div v-for="dateInfo in date" class="arrangementtable">
                            <div id="oneDay" class="oneday">
                                <div id='date'>
                                    <label>{{ dateInfo.time }}</label>
                                    <label>{{ dateInfo.week }}</label>
                                </div>

                                <div id='am' class="halfday">
                                    <label>上午</label>

                                    <div v-for="info in arrangementInfo" :key="arrangementKey">
                                        <div v-if="info.numberSourceDate == dateInfo.time && info.amOrPm == '上午'">
                                            <el-popconfirm confirm-button-text="查看" cancel-button-text="删除" title="请选择"
                                                @cancel="deleteArrangment(info)" @confirm="openArrangmentInfo(info)">
                                                <template #reference>
                                                    <el-tag :key="info.doctorName" type='info' size="large"
                                                        class="arrangementTag">
                                                        {{ nameFormat(info.doctorName) }}&nbsp;&nbsp;{{ info.number }}
                                                    </el-tag>
                                                </template>
                                            </el-popconfirm>
                                        </div>
                                    </div>

                                    <el-text class="button_text" type="primary"
                                        @click="addArrangement(dateInfo.time, '上午')">添加+</el-text>
                                </div>

                                <div id='pm' class="halfday">
                                    <label>下午</label>
                                    <div v-for="info in arrangementInfo">
                                        <div v-if="info.numberSourceDate == dateInfo.time && info.amOrPm == '下午'">
                                            <el-popconfirm confirm-button-text="查看" cancel-button-text="删除" title="请选择"
                                                @cancel="deleteArrangment(info)" @confirm="openArrangmentInfo(info)">
                                                <template #reference>
                                                    <el-tag :key="info.doctorName" type='info' size="large"
                                                        class="arrangementTag">
                                                        {{ nameFormat(info.doctorName) }}&nbsp;&nbsp;{{ info.number }}
                                                    </el-tag>
                                                </template>
                                            </el-popconfirm>
                                        </div>
                                    </div>

                                    <el-text class="button_text" type="primary"
                                        @click="addArrangement(dateInfo.time, '下午')">添加+</el-text>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <div style="margin-bottom: 50px ;clear: both;"></div>
        </div>
        <div class="col-1">

        </div>
        <div class="col-3">
            <doctorList></doctorList>
        </div>
    </div>
    <el-dialog v-model="addVisible" style="min-height: 300px;" width="50%" title="添加排班" append-to-body draggable="true">
        <el-text size="large">{{ this.selectedDate }}</el-text>&nbsp;&nbsp;
        <el-text size="large">{{ this.selectedAmOrPm }}</el-text><br><br>
        <el-text size="large">号源总数</el-text>&nbsp;&nbsp;
        <el-text size="large">专家门诊：{{ this.allNumberSource1 }}</el-text>&nbsp;&nbsp;
        <el-text size="large">特需门诊：{{ this.allNumberSource2 }}</el-text>&nbsp;&nbsp;
        <el-text size="large">普通门诊：{{ this.allNumberSource3 }}</el-text>&nbsp;&nbsp;
        <br><br>

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
        <el-input-number v-model="numberSourceNum" :min="0" :max="remainNumberSource" />
        <br><br>
        <el-text size="large">剩余号源数量 {{ remainNumberSource }}</el-text>

        <div style="margin-left: 81%;margin-top: 10px;">
            <el-button type="primary" @click="confirmAdd">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-dialog>

    <el-dialog v-model="detailVisible" style="min-height: 300px;" width="50%" title="排班详情" append-to-body draggable="true">
        <el-text size="large">{{ this.selectedArrangementInfo.numberSourceDate }}</el-text>&nbsp;&nbsp;
        <el-text size="large">{{ this.selectedArrangementInfo.amOrPm }}</el-text><br><br>
        <el-text size="large">医生：{{ this.selectedArrangementInfo.doctorName }}</el-text>&nbsp;&nbsp;
        <el-text size="large">诊室：{{ this.selectedArrangementInfo.consultingRoomName }}</el-text><br><br>
        <el-text size="large">号源数量</el-text><br>
        <div v-if="selectedArrangementInfo.amOrPm == '上午'">
            <el-text size="large"> 8:00~ 8:30 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large"> 8:30~ 9:00 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large"> 9:00~ 9:30 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large"> 9:30~10:00 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large">10:00~10:30 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large">10:30~11:00 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
        </div>
        <div v-if="selectedArrangementInfo.amOrPm == '下午'">
            <el-text size="large"> 14:00~ 14:30 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large"> 14:30~ 15:00 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large"> 15:00~ 15:30 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large"> 15:30~16:00 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large">16:00~16:30 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
            <el-text size="large">16:30~17:00 {{ selectedArrangementInfo.number / 6 }}</el-text><br>
        </div>
    </el-dialog>

    <el-dialog v-model="recordsVisible" style="min-height: 300px;" width="70%" title="排班记录" append-to-body draggable="true">
        <el-scrollbar height="520px">
            <div class="scrollbar-flex-content">
                <div v-for="dateInfo in beforeDate" class="arrangementtable">
                    <div id="oneDay" class="oneday">
                        <div id='date'>
                            <label>{{ dateInfo.time }}</label>
                            <label>{{ dateInfo.week }}</label>
                        </div>

                        <div id='am' class="halfday">
                            <label>上午</label>

                            <div v-for="info in arrangementInfo" :key="arrangementKey">
                                <div v-if="info.numberSourceDate == dateInfo.time && info.amOrPm == '上午'">
                                    <el-popconfirm confirm-button-text="查看" cancel-button-text="取消" title="请选择"
                                         @confirm="openArrangmentInfo(info)">
                                        <template #reference>
                                            <el-tag :key="info.doctorName" type='info' size="large" class="arrangementTag">
                                                {{ nameFormat(info.doctorName) }}&nbsp;&nbsp;{{ info.number }}
                                            </el-tag>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </div>
                        </div>

                        <div id='pm' class="halfday">
                            <label>下午</label>
                            <div v-for="info in arrangementInfo">
                                <div v-if="info.numberSourceDate == dateInfo.time && info.amOrPm == '下午'">
                                    <el-popconfirm confirm-button-text="查看" cancel-button-text="取消"  title="请选择"
                                         @confirm="openArrangmentInfo(info)">
                                        <template #reference>
                                            <el-tag :key="info.doctorName" type='info' size="large" class="arrangementTag">
                                                {{ nameFormat(info.doctorName) }}&nbsp;&nbsp;{{ info.number }}
                                            </el-tag>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </el-dialog>
</template>

<script>
import Global_color from "@/app/Global_color.vue";
import { ElMessage } from 'element-plus';
import doctorList from '@/components/departmentHeader/doctorList.vue';
export default {
    components: {
        doctorList
    },
    data() {
        return {
            departmentId: '',
            time: [],
            week: [],
            date: [],
            beforeTime: [],
            beforeWeek: [],
            beforeDate: [],
            arrangementInfo: [],
            addVisible: false,
            detailVisible: false,
            recordsVisible:false,
            selectedDate: '',
            selectedAmOrPm: '',
            selectedDoctor: '',
            selectedDoctorInfo: '',
            selectedConsultingRoom: '',
            selectedConsultingRoomType: '',
            selectedArrangementInfo: {},  //用于查看排班详情数据渲染
            doctors: [],
            consultingRooms: [],
            numberSourceNum: 0,
            remainNumberSource: 0, //剩余号源数量
            allNumberSource1: 0, //专家门诊号源数量
            allNumberSource2: 0, //特需门诊号源数量
            allNumberSource3: 0, //普通门诊号源数量
            arrangementKey: 0,   //用于界面刷新

            button_color2: Global_color.button_color,
        }
    },
    created() {
        this.$axios.get("/arrangement/findDepartmentIdByDoctorId/" + this.$store.state.userId).then(response => {
            this.departmentId = response.data.data
            this.$axios.get("/arrangement/findByDepartmentId/" + this.departmentId).then(response => {
                this.arrangementInfo = response.data.data
            }).catch(error => { console.log(error) })
        }).catch(error => {

        });

        this.getNowDate()
    },

    methods: {
        nameFormat(value) {
            if (value.length < 3) { //如果是两个汉字
                value = value.slice(0, 1) + '　' + value.slice(1) //拆分字符串并加入全角的空格
            }
            return value
        },
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
            // for (let i = 7; i < 14; i++) {  //后14天
            //     this.time.push(this.getAfterDate(i, nowTime))
            // }
            for (let i = 0; i < 14; i++) {  //后14天
                this.time.push(this.getAfterDate(i, nowTime))
            }
            for (let i = 14; i > 0; i--) {  //前14天
                this.beforeTime.push(this.getBeforeDate(i, nowTime))
            }
            this.date = [
                { time: this.time[0], week: this.week[0] },
                { time: this.time[1], week: this.week[1] },
                { time: this.time[2], week: this.week[2] },
                { time: this.time[3], week: this.week[3] },
                { time: this.time[4], week: this.week[4] },
                { time: this.time[5], week: this.week[5] },
                { time: this.time[6], week: this.week[6] },
                { time: this.time[7], week: this.week[7] },
                { time: this.time[8], week: this.week[8] },
                { time: this.time[9], week: this.week[9] },
                { time: this.time[10], week: this.week[10] },
                { time: this.time[11], week: this.week[11] },
                { time: this.time[12], week: this.week[12] },
                { time: this.time[13], week: this.week[13] },
            ]
            this.beforeDate = [
                { time: this.beforeTime[0], week: this.week[14] },
                { time: this.beforeTime[1], week: this.week[15] },
                { time: this.beforeTime[2], week: this.week[16] },
                { time: this.beforeTime[3], week: this.week[17] },
                { time: this.beforeTime[4], week: this.week[18] },
                { time: this.beforeTime[5], week: this.week[19] },
                { time: this.beforeTime[6], week: this.week[20] },
                { time: this.beforeTime[7], week: this.week[21] },
                { time: this.beforeTime[8], week: this.week[22] },
                { time: this.beforeTime[9], week: this.week[23] },
                { time: this.beforeTime[10], week: this.week[24] },
                { time: this.beforeTime[11], week: this.week[25] },
                { time: this.beforeTime[12], week: this.week[26] },
                { time: this.beforeTime[13], week: this.week[27] },
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
        getBeforeDate(num, time) {
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
            if (n >= day) {
                if (mon > 1) {
                    mon = mon - 1;
                } else {
                    year = year - 1;
                    mon = 12;
                }
            }
            d.setDate(d.getDate() - n);
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
            this.numberSourceNum = 0;
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

            this.$axios.get("/arrangement/getAllNumberSource", {
                params: {
                    consultingRoomType: '专家门诊',
                    date: this.selectedDate,
                    amOrPm: this.selectedAmOrPm,
                    departmentId: this.departmentId
                }
            }).then(response => {
                this.allNumberSource1 = response.data.data
            }).catch(error => { });

            this.$axios.get("/arrangement/getAllNumberSource", {
                params: {
                    consultingRoomType: '特需门诊',
                    date: this.selectedDate,
                    amOrPm: this.selectedAmOrPm,
                    departmentId: this.departmentId
                }
            }).then(response => {
                this.allNumberSource2 = response.data.data
            }).catch(error => { });

            this.$axios.get("/arrangement/getAllNumberSource", {
                params: {
                    consultingRoomType: '普通门诊',
                    date: this.selectedDate,
                    amOrPm: this.selectedAmOrPm,
                    departmentId: this.departmentId
                }
            }).then(response => {
                this.allNumberSource3 = response.data.data
            }).catch(error => { });

        },
        deleteArrangment(info) {
            console.log(info)
            this.$axios.get("/arrangement/del", {
                params: {
                    doctorId: info.doctorId,
                    consultingRoomId: info.consultingRoomId,
                    numberSourceDate: info.numberSourceDate,
                    amOrPm: info.amOrPm,
                }
            }).then(response => {
                ElMessage({
                    message: '删除成功',
                    type: 'success',
                })
                location.reload()

            }).catch(error => { });
        },
        openArrangmentInfo(info) {
            this.selectedArrangementInfo = info;
            this.detailVisible = true;

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
                        amOrPm: this.selectedAmOrPm,
                        departmentId: this.departmentId
                    }
                }).then(response => {
                    this.remainNumberSource = response.data.data
                }).catch(error => { console.log(error) })
            }).catch(error => { console.log(error) })


        },
        confirmAdd() {
            if (this.selectedDoctor == '' || this.selectedConsultingRoom == '') {
                ElMessage({
                    message: '添加失败，数据不能为空！',
                    type: 'warning',
                })
                return;
            }
            this.$axios.get("/arrangement/getNumberSourceByDate", {
                params: {
                    date: this.selectedDate,
                    amOrPm: this.selectedAmOrPm,
                    consultingRoomType: this.selectedConsultingRoomType
                }
            }).then(response => {
                this.$axios.get("/arrangement/addInfo", {
                    params: {
                        doctorId: this.selectedDoctor,
                        consultingRoomId: this.selectedConsultingRoom,
                        departmentId: this.departmentId,
                        numberSourceDate: this.selectedDate,
                        amOrPm: this.selectedAmOrPm,
                        number: this.numberSourceNum,
                        doctorLevel: this.selectedDoctorInfo.doctorLevel,

                    }
                }).then(response => {
                    this.$axios.get("/arrangement/findByDepartmentId/" + this.departmentId).then(response => {
                        this.arrangementInfo = response.data.data
                        this.arrangementKey++;
                    }).catch(error => { console.log(error) })

                }).catch(error => console.log(error))

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

                    }).catch(error => { console.log(error) });

                }
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                })
                this.addVisible = false

                setTimeout(() => {
                    this.$axios.get("/addNumberSourceDetail", {
                        params: {
                            doctorId: this.selectedDoctor,
                            numberSourceDate: this.selectedDate,
                            amOrPm: this.selectedAmOrPm
                        }
                    }).then(response => {

                    }).catch(error => { })
                }, 1000)



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

.scrollbar-flex-content {
    display: flex;
}

.arrangementtable {
    /* float: left; */
    /* display: flex; */
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