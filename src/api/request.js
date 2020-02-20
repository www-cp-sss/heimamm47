import axios from 'axios'

// 创建 副本
const requrest = axios.create({
    withCredentials:true,
    // 基地址
    baseURL:"http://127.0.0.1/heimamm/public"
})


// 暴露出去
export default  requrest