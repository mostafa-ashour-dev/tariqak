import axiosInstance from "app/axios/instance";
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
        const response = await axiosInstance.post(
            "/auth/register",
            credentials
        );
        if (response.status === 200) {
            setState((prev: any) => ({
                ...prev,
                user: null,
                is_verified: false,
                nextStep: "VERIFY",
                tokens: { refresh_token: null, access_token: null },
            }));

            const authState = {
                tokens: { refresh_token: null, access_token: null },
                user: null,
                is_verified: false,
                nextStep: "VERIFY",
            };

            await SecureStore.setItemAsync(
                "authState",
                JSON.stringify(authState)
            );
        }
    } catch (error: Error | any) {
        throw new Error(error.message as string);
    } finally {
        setState((prev: any) => ({ ...prev, loading: false }));
    }
};
