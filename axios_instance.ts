import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVERURL,
    withCredentials: true,
})

instance.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    const token = document.cookie.replace(/(?:(?:^|.;\s)XSRF-TOKEN\s=\s([^;]).$)|^.*$/, "$1");
    if(config.headers == undefined){
        return config;
    }
    config!!.headers!!["X-XSRF-TOKEN"] = token;
    config!!.headers!!["Accept"] = "*/*"
    return config;
})

export default instance;