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
        const authState = JSON.parse(
            (await SecureStore.getItemAsync("authState")) as string
        );
        console.log("🚀 ~ authState:", authState);
        if (authState?.tokens?.access_token) {
            config.headers.Authorization = `Bearer ${authState?.tokens.access_token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
