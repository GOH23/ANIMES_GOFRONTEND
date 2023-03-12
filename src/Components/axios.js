import axios from "../../vercel/path0/node_modules/axios/index";

const instance = axios.create({
    baseURL: 'https://animesgo.onrender.com'
})
instance.interceptors.request.use((config)=>{
    config.headers.Authorization = window.localStorage.getItem('token')

    return config;
})
export default instance;