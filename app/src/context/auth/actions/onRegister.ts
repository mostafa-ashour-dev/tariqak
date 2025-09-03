import { axiosInstance } from "app/axios/instance";
import * as SecureStore from "expo-secure-store";

type Props = {
    credentials: {
        full_name: string;
        phone_number: string;
        email: string;
        password: string;
        role: string;
    };
    setState: any;
};

export const onRegister = async ({ credentials, setState }: Props) => {
    try {
        const response = await axiosInstance.post("/auth/login", credentials);

        const { data } = response;
        if (response.status === 200) {
            setState((prev: any) => ({
                ...prev,
                is_verified: false,
            }));
        }
    } catch (error: Error | any) {
        throw new Error(error.message as string);
    } finally {
        setState((prev: any) => ({ ...prev, loading: false }));
    }
};
