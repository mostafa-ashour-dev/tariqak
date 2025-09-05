import axiosInstance from "app/axios/instance";

type Props = {
    code: string;
    setState: any;
};

export const onVerifyResetCode = async ({ code, setState }: Props) => {
    // return {
    //     success: true,
    // };
    try {
        const response = await axiosInstance.post(
            "/auth/verify/password-reset",
            { code }
        );

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
