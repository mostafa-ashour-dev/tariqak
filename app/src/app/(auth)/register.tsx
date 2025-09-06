import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Alert,
} from "react-native";
import React, { useState } from "react";
import {
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
import { Eye, EyeClosed } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import Back from "components/back";
import { Text } from "react-native";

type LoginBody = {
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    role: string;
};

// MO TODO ENHANCE ERROR HANDLING & CHECKING IF THE DATA IS CORRECT
// MO TODO SETUP LOADING STATES FOR ALL ACTIONS

const Register = () => {
    // @ Toggle User Role
    const [role, setRole] = useState<"user" | "driver">("user");

    // @ Toggle Showing password
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // @ Context
    const { onRegister } = useAuth();

    const [registerBody, setRegisterBody] = useState<LoginBody>({
        full_name: "",
        phone_number: "",
        email: "",
        password: "",
        role: role,
    });

    const router = useRouter();

    const handleRegister = async () => {
        try {
            if (
                !registerBody.full_name ||
                !registerBody.password ||
                !registerBody.email ||
                !registerBody.phone_number ||
                !registerBody.role
            ) {
                Alert.alert("من فضلك أكمل جميع الخانات للمتباعه");
                return;
            }
            await onRegister({
                ...registerBody,
            });
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
                <Back value="رجوع" path="/" />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: lightTheme.colors.background.light,
                    }}
                >
                    <MainTitle fontSize="35px">حساب جديد</MainTitle>
                    <View
                        style={{
                            marginTop: 20,
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <View style={styles.inputContainer}>
                            <MainInput
                                onChangeText={(text: string) =>
                                    setRegisterBody({
                                        ...registerBody,
                                        full_name: text,
                                    })
                                }
                                placeholder="الأسم كامل"
                                placeholderTextColor={
                                    lightTheme.colors.text.light
                                }
                                fontSize="15px"
                                cursorColor={lightTheme.colors.primary}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <MainInput
                                onChangeText={(text: string) =>
                                    setRegisterBody({
                                        ...registerBody,
                                        phone_number: text,
                                    })
                                }
                                value={registerBody.phone_number}
                                placeholder="رقم الهاتف"
                                placeholderTextColor={
                                    lightTheme.colors.text.light
                                }
                                fontSize="15px"
                                cursorColor={lightTheme.colors.primary}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <MainInput
                                onChangeText={(text: string) =>
                                    setRegisterBody({
                                        ...registerBody,
                                        email: text,
                                    })
                                }
                                placeholder="البريد الألكتروني"
                                placeholderTextColor={
                                    lightTheme.colors.text.light
                                }
                                fontSize="15px"
                                cursorColor={lightTheme.colors.primary}
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.rolesContainer}>
                                <Text style={styles.rolesTitle}>
                                    نوع الحساب
                                </Text>
                                <View style={styles.rolesButtonsContainer}>
                                    {["user", "driver"].map((r) => (
                                        <Pressable
                                            key={r}
                                            onPress={() =>
                                                setRole(r as "user" | "driver")
                                            }
                                            style={
                                                role === r
                                                    ? styles.roleButtonActive
                                                    : styles.roleButtonInactive
                                            }
                                        >
                                            <Text
                                                style={
                                                    role === r
                                                        ? styles.roleButtonTextActive
                                                        : styles.roleButtonTextInactive
                                                }
                                            >
                                                {r === "user"
                                                    ? "مستخدم"
                                                    : "سائق"}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <MainInput
                                onChangeText={(text: string) =>
                                    setRegisterBody({
                                        ...registerBody,
                                        password: text,
                                    })
                                }
                                placeholder="كلمة المرور"
                                secureTextEntry={!showPassword}
                                placeholderTextColor={
                                    lightTheme.colors.text.light
                                }
                                fontSize="15px"
                                cursorColor={lightTheme.colors.primary}
                            />
                            <Pressable
                                onPress={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    left: 10,
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {showPassword ? (
                                    <EyeClosed
                                        color={lightTheme.colors.primary}
                                    />
                                ) : (
                                    <Eye color={lightTheme.colors.primary} />
                                )}
                            </Pressable>
                        </View>
                        <MainButton
                            onPress={handleRegister}
                            style={{ marginTop: 24 }}
                            width="80%"
                        >
                            <MainButtonText>إنشاء الحساب</MainButtonText>
                        </MainButton>
                        <TouchableOpacity
                            onPress={() => router.push("/login")}
                            style={{
                                marginTop: theme.margin.lg,
                                gap: theme.spacing.xs,
                                flexDirection: "row",
                                alignItems: "baseline",
                                justifyContent: "center",
                            }}
                        >
                            <MainLinkText fontSize="16px">
                                تسجيل دخول
                            </MainLinkText>
                            <SecondaryText fontSize="16px">
                                لديك حساب بالفعل ؟
                            </SecondaryText>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        width: "80%",
        marginTop: 10,
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
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginRight: 25,
        gap: 6,
    },
    roleButtonActive: {
        backgroundColor: lightTheme.colors.primary,
        borderRadius: theme.radius.sm,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
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
        width: "50%",
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

export default Register;
