import {
    View,
    Alert,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
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

type LoginBody = {
    credential: string;
    password: string;
};

const Login = () => {
    // @ Toggle Showing password
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { onLogin } = useAuth();

    const [loginBody, setLoginBody] = useState<LoginBody>({
        credential: "",
        password: "",
    });

    const router = useRouter();

    const handleLogin = async () => {
        try {
            if (!loginBody.credential || !loginBody.password) {
                Alert.alert("من فضلك أكمل جميع الخانات للمتباعه");
                return;
            }
            await onLogin({
                ...loginBody,
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
                    <MainTitle fontSize="35px">تسجيل دخول</MainTitle>
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
                                    setLoginBody({
                                        ...loginBody,
                                        credential: text,
                                    })
                                }
                                placeholder="رقم الهاتف أو أسم المستخدم"
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
                                    setLoginBody({
                                        ...loginBody,
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
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                marginTop: theme.margin.lg,
                                marginLeft: "auto",
                                marginRight: 40,
                            }}
                            onPress={() => router.push("reset")}
                        >
                            <MainLinkText fontSize="16px">
                                نسيت كلمة المرور؟
                            </MainLinkText>
                        </TouchableOpacity>

                        <MainButton
                            onPress={handleLogin}
                            style={{ marginTop: 24 }}
                            width="80%"
                        >
                            <MainButtonText>تسجيل دخول</MainButtonText>
                        </MainButton>

                        <TouchableOpacity
                            onPress={() => router.push("/register")}
                            style={{
                                marginTop: theme.margin.lg,
                                gap: theme.spacing.xs,
                                flexDirection: "row",
                                alignItems: "baseline",
                                justifyContent: "center",
                            }}
                        >
                            <MainLinkText fontSize="16px">
                                إنشاء حساب جديد
                            </MainLinkText>
                            <SecondaryText fontSize="16px">
                                ليس لديك حساب؟
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
});

export default Login;
