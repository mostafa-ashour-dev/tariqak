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

type ReqVerifyBody = {
    type: "email" | "phone_number";
    credential: string | null;
};

type VerifyBody = {
    code: string | null;
};

const Verify = () => {
    // @ Toggle Showing password
    const [isSent, setIsSent] = useState<boolean>(false);

    const { onRequestVerificationCode, onVerifyCode, user } = useAuth();
    const [reqVerifyBody, setReqVerifyBody] = useState<ReqVerifyBody>({
        type: "phone_number",
        credential: user?.phone_number || null,
    });

    const [verifyBody, setVerifyBody] = useState<VerifyBody>({
        code: null,
    });

    const router = useRouter();

    const handleReqVerifyCode = async () => {
        try {
            const { success } = await onRequestVerificationCode({
                ...reqVerifyBody,
            });
            success && setIsSent(true);
        } catch (error: Error | any) {
            console.log(error);
            Alert.alert("Error", error.message);
        }
    };

    const handleVerify = async () => {
        try {
            if (!verifyBody.code) {
                Alert.alert("من فضلك أدخل الرمز للمتباعه");
                return;
            } else if (verifyBody.code.length !== 6) {
                Alert.alert("من فضلك ادخل رمز صحيح");
                return;
            }
            const { success } = await onVerifyCode({
                ...verifyBody,
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
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: lightTheme.colors.background.light,
                    }}
                >
                    <MainTitle fontSize="35px">تأكيد الهوية</MainTitle>
                    <View
                        style={{
                            marginTop: 20,
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        {!isSent && (
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
                                                        onPress={() =>
                                                            setReqVerifyBody({
                                                                credential:
                                                                    (r ===
                                                                    "email"
                                                                        ? user?.email
                                                                        : user?.phone_number) ||
                                                                    null,
                                                                type:
                                                                    r ===
                                                                    "email"
                                                                        ? "email"
                                                                        : "phone_number",
                                                            })
                                                        }
                                                        style={
                                                            reqVerifyBody.type ===
                                                            r
                                                                ? styles.roleButtonActive
                                                                : styles.roleButtonInactive
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                reqVerifyBody.type ===
                                                                r
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
                                <View style={styles.infoContainer}>
                                    <MainText style={styles.info}>
                                        {reqVerifyBody.credential}
                                    </MainText>
                                </View>
                            </>
                        )}

                        {isSent && (
                            <>
                                <Text style={styles.typeTitle}>
                                    {reqVerifyBody.type === "email"
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
                                    {reqVerifyBody.credential}
                                </Text>
                                <View style={styles.inputContainer}>
                                    <MainInput
                                        onChangeText={(input: string) =>
                                            setVerifyBody({
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

                        <MainButton
                            onPress={
                                isSent ? handleVerify : handleReqVerifyCode
                            }
                            style={{ marginTop: 27 }}
                            width="80%"
                        >
                            <MainButtonText>
                                {isSent
                                    ? "التحقق من مطباقة الرمز"
                                    : "إرسال الرمز"}
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

export default Verify;
