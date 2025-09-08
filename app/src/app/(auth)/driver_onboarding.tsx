import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Alert,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
    Caption,
    MainButton,
    MainButtonText,
    MainInput,
    MainLinkText,
    MainTitle,
    SecondaryText,
} from "components/styledComponents";
import { useAuth } from "context/auth/AuthContext";
import { useRouter } from "expo-router";
import { lightTheme, theme } from "styles/styles";
import {
    ArchiveIcon,
    Eye,
    EyeClosed,
    MapPlusIcon,
    Plus,
} from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import ActivePeriod from "components/ActivePeriod";
import { FlatList } from "react-native";
import DriverMap from "components/DriverMap";

type Area = {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
};

const Driver = () => {
    // @ Toggle User Role
    const [screenStep, setScreenStep] = useState<"details" | "map" | "images">(
        "map"
    );

    // @ Context
    const { onDriverOnboarding } = useAuth();

    // @ driver onboarding details states:
    const [car_plate, setCarPlate] = useState({
        numbers: "",
        letters: "",
    });
    const [car_model, setCarModel] = useState("");
    const [car_color, setCarColor] = useState("");
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [active_all_day, setActiveAllDay] = useState(false);
    const [areas, setAreas] = useState<Area[]>([]);

    // & functions:
    const formatTime = (date: Date | null) => {
        if (!date) return;
        return date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    console.log(areas);

    const handleDetailsCheck = async () => {
        try {
            if (
                !car_model ||
                !car_model ||
                !car_color ||
                ((!startTime || !endTime) && !active_all_day)
            ) {
                Alert.alert("من فضلك أكمل جميع الخانات للمتباعه");
                return;
            }
            setScreenStep("map");
        } catch (error: Error | any) {
            console.log(error);
            Alert.alert("Error", error.message);
        }
    };
    const handleDriverOnboarding = async () => {
        try {
            if (
                !car_model ||
                !car_model ||
                !car_color ||
                ((!startTime || !endTime) && !active_all_day) ||
                !areas
            ) {
                Alert.alert("من فضلك أكمل جميع الخانات للمتباعه");
                return;
            }
            const response = await onDriverOnboarding({
                car_plate,
                car_model,
                car_color,
                activePeriod: {
                    start: formatTime(startTime),
                    end: formatTime(endTime),
                },
                active_all_day,
                areas,
            });
            if (response.success) {
                setScreenStep("images");
            }
        } catch (error: Error | any) {
            console.log(error);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: lightTheme.colors.background.light,
                        paddingVertical: 60,
                        flexGrow: 1,
                    }}
                >
                    <MainTitle fontSize="35px">بيانات السائق</MainTitle>
                    <Caption>
                        {screenStep === "details"
                            ? "الخطوه الأولى"
                            : screenStep === "map"
                              ? "الخطوه الثانية"
                              : "الخطوه الثالثة"}
                    </Caption>
                    {screenStep === "details" && (
                        <View
                            style={{
                                marginTop: 20,
                                alignItems: "center",
                                flex: 1,
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            {/* <Caption>لوحة السيارة</Caption> */}
                            <View style={[styles.inputContainer, { gap: 5 }]}>
                                <MainInput
                                    onChangeText={(input: string) =>
                                        setCarPlate({
                                            ...car_plate,
                                            numbers: input,
                                        })
                                    }
                                    placeholder="أرقام اللوحة (3 1 4)"
                                    placeholderTextColor={
                                        lightTheme.colors.text.light
                                    }
                                    fontSize="15px"
                                    cursorColor={lightTheme.colors.primary}
                                    keyboardType="numeric"
                                    value={car_plate.numbers}
                                />
                                <MainInput
                                    value={car_plate.letters}
                                    onChangeText={(input: string) =>
                                        setCarPlate({
                                            ...car_plate,
                                            letters: input,
                                        })
                                    }
                                    placeholder="حروف اللوحة (ع د ل)"
                                    placeholderTextColor={
                                        lightTheme.colors.text.light
                                    }
                                    fontSize="15px"
                                    cursorColor={lightTheme.colors.primary}
                                />
                            </View>
                            {/* <Caption style={{ marginTop: 10 }}>
                                لون السياره
                            </Caption> */}
                            <View style={styles.inputContainer}>
                                <MainInput
                                    value={car_color}
                                    onChangeText={(input: string) =>
                                        setCarColor(input)
                                    }
                                    placeholder="لون السيارة ( اسود )"
                                    placeholderTextColor={
                                        lightTheme.colors.text.light
                                    }
                                    fontSize="15px"
                                    cursorColor={lightTheme.colors.primary}
                                />
                            </View>
                            {/* <Caption style={{ marginTop: 10 }}>
                                موديل السياره
                            </Caption> */}
                            <View style={styles.inputContainer}>
                                <MainInput
                                    value={car_model}
                                    onChangeText={(input: string) =>
                                        setCarModel(input)
                                    }
                                    placeholder="موديل السياره ( تويوتا كورولا )"
                                    placeholderTextColor={
                                        lightTheme.colors.text.light
                                    }
                                    fontSize="15px"
                                    cursorColor={lightTheme.colors.primary}
                                />
                            </View>
                            {/* <Caption style={{ marginTop: 10 }}>
                                وقت العمل
                            </Caption> */}
                            <View style={styles.inputContainer}>
                                <View style={styles.rolesButtonsContainer}>
                                    {[
                                        {
                                            key: "allDay",
                                            label: "متاح طوال اليوم",
                                            value: true,
                                        },
                                        {
                                            key: "period",
                                            label: "تحديد وقت العمل",
                                            value: false,
                                        },
                                    ].map((option) => (
                                        <Pressable
                                            key={option.key}
                                            onPress={() =>
                                                setActiveAllDay(option.value)
                                            }
                                            style={
                                                option.value === active_all_day
                                                    ? styles.roleButtonActive
                                                    : styles.roleButtonInactive
                                            }
                                        >
                                            <Text
                                                style={
                                                    option.value ===
                                                    active_all_day
                                                        ? styles.roleButtonTextActive
                                                        : styles.roleButtonTextInactive
                                                }
                                            >
                                                {option.label}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                            {!active_all_day && (
                                <ActivePeriod
                                    startTime={startTime}
                                    onChangeStart={setStartTime}
                                    endTime={endTime}
                                    onChangeEnd={setEndTime}
                                />
                            )}
                        </View>
                    )}
                    {screenStep === "map" && (
                        <DriverMap areas={areas} setAreas={setAreas} />
                    )}
                    <MainButton
                        onPress={
                            screenStep === "details"
                                ? handleDetailsCheck
                                : screenStep === "map"
                                  ? handleDriverOnboarding
                                  : handleDriverOnboarding
                            //   FIX
                        }
                        style={{ marginTop: 24 }}
                        width="80%"
                    >
                        <MainButtonText>تأكيد البيانات</MainButtonText>
                    </MainButton>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default Driver;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        width: "80%",
        marginTop: 5,
    },
    rolesContainer: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: theme.radius.sm,
        paddingHorizontal: 10,
        paddingVertical: 6,
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        borderColor: lightTheme.colors.border.gray,
        borderWidth: 1,
        borderStyle: "solid",
        fontSize: theme.fontSizes.md,
        color: lightTheme.colors.text.dark,
        fontFamily: theme.fontFamilies.secondary.regular,
    },
    rolesTitle: {
        fontSize: 16,
        color: lightTheme.colors.text.light,
        fontFamily: theme.fontFamilies.secondary.medium,
        marginLeft: "auto",
    },
    rolesButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginTop: 9,
        gap: 6,
    },
    roleButtonActive: {
        backgroundColor: lightTheme.colors.primary,
        borderRadius: theme.radius.sm,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "49%",
        borderColor: lightTheme.colors.border.gray,
        borderWidth: 1,
        borderStyle: "solid",
    },
    roleButtonInactive: {
        backgroundColor: lightTheme.colors.background.light,
        borderRadius: theme.radius.sm,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "49%",
        borderColor: lightTheme.colors.border.gray,
        borderWidth: 1,
        borderStyle: "solid",
    },
    roleButtonTextActive: {
        fontSize: theme.fontSizes.base,
        color: "white",
        fontFamily: theme.fontFamilies.main.medium,
    },
    roleButtonTextInactive: {
        fontSize: theme.fontSizes.base,
        color: lightTheme.colors.text.dark,
        fontFamily: theme.fontFamilies.main.medium,
    },
});
