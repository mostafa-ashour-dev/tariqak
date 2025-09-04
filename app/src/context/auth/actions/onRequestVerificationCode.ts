import axiosInstance from "app/axios/instance";

type Props = {
    type: "email" | "phone_number";
    credential: string;
    setState: any;
};

export const onRequestVerificationCode = async ({
    type,
    credential,
    setState,
}: Props) => {
    try {
        const response = await axiosInstance.post(
            "/auth/request-verification-code",
            { type, credential }
        );
        if (response.status === 200) {
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
