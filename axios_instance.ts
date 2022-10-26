import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
})

instance.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    const token = document.cookie.replace(/(?:(?:^|.;\s)XSRF-TOKEN\s=\s([^;]).$)|^.*$/, "$1");
    if(config.headers == undefined){
        return config;
    }
    config!!.headers!!["X-XSRF-TOKEN"] = token;
    return config;
})

export default instance;