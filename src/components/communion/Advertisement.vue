<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ advertisementName[advertisementId] }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ advertisementDescribe[advertisementId] }}</h6>
            <p class="card-text">{{ advertisementContent[advertisementId] }}</p>
            <a v-bind:href="advertisementLink[advertisementId]" class="card-link" target="_blank">
                {{ advertisementLinkName[advertisementId] }} ></a>
        </div>
    </div>
</template>

<script>
import Global_color from "@/app/Global_color.vue"

export default {
    name: "Advertisement",

    props: {
        msg: String
    },

    data(){
        return{
            advertisementId:Math.floor(Math.random()*6),
            advertisementName:['LFouse','Apple','404','堃芃','Apple','Apple',],
            advertisementDescribe:[
                '最好的租房平台',
                'iPhone 14 Pro',
                'Not Found',
                'skywalker',
                'Watch ULTRA',
                '教育赋予前行的力量',],
            advertisementContent:[
                '点击进入LFouse平台，众多海量房源总有一套适合你！',
                '强力出圈。来Apple购买，再好不过。',
                '七秩风华传薪火，航空报国育新人。',
                'May the force be with you.',
                '越野越心驰。强硬坚固，不止肉眼可见,随时迎接各种挑战。',
                'Apple致力于为世界各地的人们提供更好更广泛的受教育机会。',],
            advertisementLink:[
                'http://clsty.top:8090',
                'https://www.apple.com.cn',
                'https://www.nchu.edu.cn',
                'https://kunpeng24.cn',
                'https://www.apple.com.cn/apple-watch-ultra/',
                'https://www.apple.com.cn/education-initiative/',],
            advertisementLinkName:['LFouse','Apple','Not Found','堃芃','Apple','Apple',],
            link_color: Global_color.main_color,
            link_color1: Global_color.main_color1,
        }
    }
}
</script>

<style scoped>
.card-body{
    padding:18px 18px 18px 18px;
}
.card p{
    font-size:15px;
}
.card a{
    color: v-bind(link_color);
}
.card a:hover{
    color: v-bind(link_color1);
    text-decoration: underline;
}
</style>
