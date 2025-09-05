import axiosInstance from "app/axios/instance";

type Props = {
    credential: string;
    code: string;
    new_password: string;
    setState: any;
};

export const onResetPassword = async ({
    credential,
    new_password,
    code,
    setState,
}: Props) => {
    try {
        const response = await axiosInstance.post("/auth/reset-password", {
            credential,
            new_password,
            code,
        });

        return {
            success: true,
            message: response.data.message,
        };
    } catch (error: Error | any) {
        throw new Error(error.message as string);
    } finally {
        setState((prev: any) => ({ ...prev, loading: false }));
    }
};
