<template>
    <Header></Header>
    <div class="row">
        <div class="col-2">
            <el-menu style="height: 625px; margin-top: 48px;" active-text-color="#ffd04b" background-color="#175850"
                text-color="#fff">
                <label style="color: white; font-size: larger;margin: 30px 0px 30px 55px;">科室主任你好</label>
                <el-menu-item index="1">
                    <router-link to='/departmentHeaderMain/introduction' class="navs">科室信息</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to='/departmentHeaderMain/arrangement' class="navs">排班管理</router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to='/departmentHeaderMain/introduction' class="navs">调班管理</router-link>
                </el-menu-item>

            </el-menu>
        </div>
        <div class="col-10">
            <router-view></router-view>
        </div>
    </div>
    <Footer></Footer>
</template>

<script>
import Header from "@/components/communion/Header.vue";
import Footer from "@/components/communion/Footer.vue";

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
.navs {
    font-size: larger;
    color: white;
    text-align: center;
    display: inline-block;
    padding: 0.5rem 1rem;
    padding-left: 30%;
    transition: all 0.15s;
}

.navs:hover {
    text-decoration: none;
}
</style>