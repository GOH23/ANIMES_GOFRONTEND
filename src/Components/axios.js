import axios from "../../node_modules/axios/index";

const instance = axios.create({
    baseURL: 'https://faithful-dog-purse.cyclic.app'
})
instance.interceptors.request.use((config)=>{
    config.headers.Authorization = window.localStorage.getItem('token')
    return config;
})
export default instance;