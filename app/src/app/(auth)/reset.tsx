import {
    View,
    Alert,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
} from "react-native";
import React, { useState } from "react";
import {
    Caption,
    MainButton,
    MainButtonText,
    MainInput,
    MainText,
    MainTitle,
} from "components/styledComponents";
import { useAuth } from "context/auth/AuthContext";
import { lightTheme, theme } from "styles/styles";
import { useRouter } from "expo-router";
import { Eye, EyeClosed } from "lucide-react-native";
import Back from "components/back";

type resetBodyProps = {
    credential: string | null;
    code: string | null;
    new_password: string | null;
};

const Reset = () => {
    const { onRequestResetPassword, onVerifyResetCode, onResetPassword } =
        useAuth();

    // @ Toggle Showing password
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [sendingStep, setSendingStep] = useState<
        "pending" | "send" | "submitted"
    >("pending");

    const [resetBody, setResetBody] = useState<resetBodyProps>({
        credential: null,
        code: null,
        new_password: null,
    });

    const [type, setType] = useState<"email" | "phone_number">("phone_number");

    const router = useRouter();

    const handleReqResetCode = async () => {
        try {
            if (!resetBody.credential) {
                Alert.alert(
                    type === "email"
                        ? "من فضلك ادخل البريد الالكتروني للمتباعه"
                        : "من فضلك ادخل رقم الهاتف للمتباعه"
                );
                return;
            }
            const { success } = await onRequestResetPassword({
                type,
                credential: resetBody.credential,
            });
            success && setSendingStep("send");
        } catch (error: Error | any) {
            console.log(error);
            Alert.alert("Error", error.message);
        }
    };

    const handleVerifyResetCode = async () => {
        try {
            if (!resetBody.code) {
                Alert.alert("من فضلك أدخل الرمز للمتباعه");
                return;
            } else if (resetBody.code.length !== 6) {
                Alert.alert("من فضلك ادخل رمز صحيح");
                return;
            }
            const { success } = await onVerifyResetCode(resetBody.code);
            success && setSendingStep("submitted");
        } catch (error: Error | any) {
            console.log(error);
            Alert.alert("Error", error.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            if (!resetBody.credential) {
                Alert.alert(
                    type === "email"
                        ? "من فضلك ادخل البريد الالكتروني للمتباعه"
                        : "من فضلك ادخل رقم الهاتف للمتباعه"
                );
                return;
            }
            if (!resetBody.code) {
                Alert.alert("من فضلك أدخل الرمز للمتباعه");
                return;
            } else if (resetBody.code.length !== 6) {
                Alert.alert("من فضلك ادخل رمز صحيح");
                return;
            }
            if (!resetBody.new_password) {
                Alert.alert("من فضلك ادخل كلمة المرور الجديده للمتباعه");
                return;
            }
            const { success } = await onResetPassword({
                credential: resetBody.credential,
                code: resetBody.code,
                new_password: resetBody.new_password,
            });
            success && router.push("/login");
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
                <Back value="رجوع" path="/login" />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: lightTheme.colors.background.light,
                    }}
                >
                    <MainTitle fontSize="35px">تحديث كلمة المرور</MainTitle>
                    <View
                        style={{
                            marginTop: 20,
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        {sendingStep === "pending" && (
                            <>
                                <Text style={styles.typeTitle}>
                                    كيف تود استلام رمز التحقق
                                </Text>
                                <View style={styles.inputContainer}>
                                    <View style={styles.rolesContainer}>
                                        <View
                                            style={styles.rolesButtonsContainer}
                                        >
                                            {["email", "phone_number"].map(
                                                (r) => (
                                                    <Pressable
                                                        key={r}
                                                        onPress={() => {
                                                            setType(
                                                                r === "email"
                                                                    ? "email"
                                                                    : "phone_number"
                                                            );
                                                            setResetBody({
                                                                ...resetBody,
                                                                credential: "",
                                                            });
                                                        }}
                                                        style={
                                                            type === r
                                                                ? styles.roleButtonActive
                                                                : styles.roleButtonInactive
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                type === r
                                                                    ? styles.roleButtonTextActive
                                                                    : styles.roleButtonTextInactive
                                                            }
                                                        >
                                                            {r === "email"
                                                                ? "البريد الألكتروني"
                                                                : "رقم الهاتف"}
                                                        </Text>
                                                    </Pressable>
                                                )
                                            )}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.inputContainer}>
                                    <MainInput
                                        value={resetBody.credential ?? ""}
                                        onChangeText={(text: string) =>
                                            setResetBody({
                                                ...resetBody,
                                                credential: text,
                                            })
                                        }
                                        placeholder={
                                            type === "email"
                                                ? "البريد الألكتروني"
                                                : "رقم الهاتف"
                                        }
                                        placeholderTextColor={
                                            lightTheme.colors.text.light
                                        }
                                        fontSize="15px"
                                        cursorColor={lightTheme.colors.primary}
                                        keyboardType={
                                            type === "email"
                                                ? "email-address"
                                                : "phone-pad"
                                        }
                                    />
                                </View>
                            </>
                        )}

                        {sendingStep === "send" && (
                            <>
                                <Text style={styles.typeTitle}>
                                    {type === "email"
                                        ? `أدخل الرمز الذي وصلك على بريدك الألكتروني:`
                                        : `أدخل الرمز الذي وصلك على رقم الهاتف:`}
                                </Text>
                                <Text
                                    style={
                                        (styles.typeTitle,
                                        {
                                            color: "blue",
                                            fontStyle: "italic",
                                        })
                                    }
                                >
                                    {resetBody.credential}
                                </Text>
                                <View style={styles.inputContainer}>
                                    <MainInput
                                        onChangeText={(input: string) =>
                                            setResetBody({
                                                ...resetBody,
                                                code: input,
                                            })
                                        }
                                        fontSize="20px"
                                        padding="5px 10px"
                                        cursorColor={lightTheme.colors.primary}
                                        keyboardType="number-pad"
                                        maxLength={6}
                                        style={{
                                            textAlign: "center",
                                            letterSpacing: 18,
                                        }}
                                    />
                                </View>
                            </>
                        )}

                        {sendingStep === "submitted" && (
                            <>
                                <Text style={styles.typeTitle}>
                                    أدخل كلمة المرور الجديده{" "}
                                </Text>
                                <View style={styles.inputContainer}>
                                    <MainInput
                                        onChangeText={(input: string) =>
                                            setResetBody({
                                                ...resetBody,
                                                new_password: input,
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
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
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
                                                color={
                                                    lightTheme.colors.primary
                                                }
                                            />
                                        ) : (
                                            <Eye
                                                color={
                                                    lightTheme.colors.primary
                                                }
                                            />
                                        )}
                                    </Pressable>
                                </View>
                            </>
                        )}

                        <MainButton
                            onPress={
                                sendingStep === "pending"
                                    ? handleReqResetCode
                                    : sendingStep === "send"
                                      ? handleVerifyResetCode
                                      : handleResetPassword
                            }
                            style={{ marginTop: 27 }}
                            width="80%"
                        >
                            <MainButtonText>
                                {sendingStep === "pending"
                                    ? "إرسال الرمز"
                                    : sendingStep === "send"
                                      ? "تحقق من مطابقة الرمز"
                                      : "تغيير كلمة المرور"}
                            </MainButtonText>
                        </MainButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: "transparent",
        borderRadius: theme.radius.sm,
        paddingHorizontal: 10,
        paddingVertical: 6,
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        borderColor: lightTheme.colors.border.gray,
        borderWidth: 1,
        borderStyle: "dotted",
        marginTop: 10,
    },
    info: {
        fontSize: theme.fontSizes.md,
        color: lightTheme.colors.secondary,
        fontFamily: theme.fontFamilies.secondary.regular,
    },
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
    typeTitle: {
        fontSize: 18,
        color: lightTheme.colors.text.light,
        fontFamily: theme.fontFamilies.secondary.bold,
    },
    rolesButtonsContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 10,
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

export default Reset;
