import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
    baseURL: "http://192.168.1.3:4777/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config: any) => {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
