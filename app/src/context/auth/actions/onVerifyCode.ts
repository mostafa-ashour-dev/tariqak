import * as SecureStore from "expo-secure-store";
import axiosInstance from "app/axios/instance";

type Props = {
    code: string;
    setState: any;
};

export const onVerifyCode = async ({ code, setState }: Props) => {
    // setState((prev: any) => ({
    //     ...prev,
    //     isVerified: true,
    //     nextStep: "WELCOME",
    // }));

    // const authState = {
    //     user: null,
    //     isVerified: true,
    //     nextStep: "WELCOME",
    //     tokens: { refresh_token: null, access_token: null },
    // };
    // await SecureStore.setItemAsync("authState", JSON.stringify(authState));

    // return {
    //     success: true,
    // };
    try {
        const response = await axiosInstance.post(
            "/auth/verify/verification-code",
            { code }
        );

        if (response.status === 200) {
            setState((prev: any) => ({
                ...prev,
                isVerified: true,
                nextStep: "WELCOME",
            }));

            const authState = {
                user: null,
                isVerified: true,
                nextStep: "WELCOME",
                tokens: { refresh_token: null, access_token: null },
            };
            await SecureStore.setItemAsync(
                "authState",
                JSON.stringify(authState)
            );

            return {
                success: true,
                message: response.data.message,
            };
        }
    } catch (error: Error | any) {
        throw new Error(error.message as string);
    } finally {
        setState((prev: any) => ({ ...prev, loading: false }));
    }
};
