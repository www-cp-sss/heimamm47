<template>
    <div>
        <p>你笑一个</p>
        <router-view></router-view>
        <el-button>点我啊</el-button>
    </div>

</template>

<script>
export default {
    created(){
        this.$router.push('/')
    }
}
</script>

<style>

</style>