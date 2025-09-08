import axiosInstance from "app/axios/instance";

type Area = {
    name: string;
    location: {
        longitude: number;
        latitude: number;
    };
};

type Props = {
    car_plate: {
        numbers: string;
        letters: string;
    };
    car_model: string;
    car_color: string;
    active_period: {
        start: string;
        end: string;
    };
    active_all_day: boolean;
    areas: Area[];
    setState: any;
};

export const onDriverOnboarding = async ({
    car_plate,
    car_model,
    car_color,
    active_period,
    active_all_day,
    areas,
    setState,
}: Props) => {
    try {
        const response = await axiosInstance.post("/onboarding/driver", {
            car_plate,
            car_model,
            car_color,
            active_period,
            active_all_day,
            areas,
        });
        if (response.data.success) {
            return {
                success: true,
                message: response.data.message,
            };
        }
    } catch (error: Error | any) {
        throw new Error(
            error.response?.data?.message ||
                error.message ||
                "Something went wrong"
        );
    } finally {
        setState((prev: any) => ({ ...prev, loading: false }));
    }
};
