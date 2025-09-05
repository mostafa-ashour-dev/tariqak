import axiosInstance from "app/axios/instance";

type Props = {
    type: "email" | "phone_number";
    credential: string;
    setState: any;
};

export const onRequestPasswordCode = async ({
    type,
    credential,
    setState,
}: Props) => {
    // return { success: true };
    try {
        await axiosInstance.post("/auth/request-password-code", {
            type,
            credential,
        });
        return { success: true };
    } catch (error: Error | any) {
        throw new Error(error.message as string);
    } finally {
        setState((prev: any) => ({ ...prev, loading: false }));
    }
};
