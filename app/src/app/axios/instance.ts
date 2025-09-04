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
        const authState = await SecureStore.getItemAsync("authState");
        const parsed = JSON.parse(authState as string);
        console.log("🚀 ~ authState:", authState);
        if (parsed?.tokens?.access_token) {
            config.headers.Authorization = `Bearer ${parsed?.tokens?.access_token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(`Error from interceptor: ${error}`);
    }
);

export default axiosInstance;
