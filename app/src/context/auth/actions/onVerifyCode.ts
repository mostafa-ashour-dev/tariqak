import * as SecureStore from "expo-secure-store";
import axiosInstance from "app/axios/instance";

type Props = {
    code: string;
    setState: any;
};

export const onVerifyCode = async ({ code, setState }: Props) => {
    try {
        const response = await axiosInstance.post(
            "/auth/verify/verification-code",
            { code }
        );

        if (response.status === 200) {
            setState((prev: any) => ({
                ...prev,
                isVerified: true,
                nextStep: "LOGIN",
            }));

            const authState = {
                user: null,
                isVerified: true,
                nextStep: "LOGIN",
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
    }
};
