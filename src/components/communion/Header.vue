<template>
    <header>
        <nav class="navbar navbar-light bg-light shadow fixed-top" id="head">
            <a class="navbar-brand" href="/Projects">
                <img src="../../assets/24(圆形）.png" width="30" height="30" class="d-inline-block align-top" alt="Vue logo">
                DevOps
            </a>
            <div class="text-body">{{sayHello()}}</div>
            <button type="button" class="btn btn-outline-primary btn-sm" @click.prevent="login_out">退出登录</button>
        </nav>
        <br>
    </header>
</template>

<script>
import Global_color from "@/app/Global_color.vue"

export default {
    name: "Header",

    props: {
        msg: String,
    },

    data(){
        return {
            button_color: Global_color.button_color,
            button_color1: Global_color.button_color1,
        }
    },

    methods:{
        sayHello(){
            if (this.$store.state.userType === "组长" ) {
                return `👋 您好，${this.$store.state.userName} 🧑🏼‍💻‍`
            } else {
                return `👋 您好，${this.$store.state.userName} 🧑🏼‍🔬‍`
            }
        },

        login_out: function() {
            this.$router.replace('/');//路由跳转至登录页面
        }
    }

}
</script>

<style scoped>

.navbar-brand{
    cursor:pointer;
}

button{
    color:v-bind(button_color);
    border-color:v-bind(border_color);
    border-radius:8px;
}
button:hover{
    background-color:v-bind(button_color1);
    border-color:v-bind(border_color1);
    border-radius:8px;
}
</style>
