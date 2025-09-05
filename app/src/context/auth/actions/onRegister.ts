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
    // const user = {
    //     full_name: credentials.full_name,
    //     phone_number: credentials.phone_number,
    //     email: credentials.email,
    //     password: credentials.password,
    //     role: credentials.role,
    // };

    // setState((prev: any) => ({
    //     ...prev,
    //     user: user,
    //     nextStep: "VERIFY",
    // }));

    // const authState = {
    //     user: user,
    //     nextStep: "VERIFY",
    // };
    // console.log(`AuthState to set in register: ${authState}`);
    // await SecureStore.setItemAsync("authState", JSON.stringify(authState));
    // return;
    try {
        const response = await axiosInstance.post(
            "/auth/register",
            credentials
        );
        const { data } = response;
        if (response.status === 200) {
            setState((prev: any) => ({
                ...prev,
                user: data.data.user,
                nextStep: "VERIFY",
            }));

            const authState = {
                user: data.data.user,
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
