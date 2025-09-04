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
    MainTitle,
} from "components/styledComponents";
import { useAuth } from "context/auth/AuthContext";
import { lightTheme, theme } from "styles/styles";

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

    const { onRequestVerificationCode, onVerifyCode } = useAuth();
    const [reqVerifyBody, setReqVerifyBody] = useState<ReqVerifyBody>({
        type: "phone_number",
        credential: null,
    });

    const [verifyBody, setVerifyBody] = useState<VerifyBody>({
        code: null,
    });

    const handleReqVerifyCode = async () => {
        try {
            if (
                reqVerifyBody.type === "phone_number" &&
                !/^\d+$/.test(reqVerifyBody.credential!)
            ) {
                Alert.alert("من فضلك قم بادخال رقم هاتف صحيح");
                return;
            }

            if (
                reqVerifyBody.type === "email" &&
                typeof reqVerifyBody.credential !== "string"
            ) {
                Alert.alert("من فضلك قم بادخال بريد الكتروني صحيح");
                return;
            }
            await onRequestVerificationCode({
                ...reqVerifyBody,
            });
            setIsSent(true);
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
            }
            await onVerifyCode({
                ...verifyBody,
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
                                <View style={styles.inputContainer}>
                                    <Caption
                                        color={
                                            lightTheme.colors.text.darkSecond
                                        }
                                        style={{
                                            marginTop: 3,
                                            marginLeft: 5,
                                        }}
                                        fontSize="13px"
                                    >
                                        {reqVerifyBody.type === "email"
                                            ? "البريد الألكتروني:"
                                            : "رقم الهاتف:"}
                                    </Caption>
                                    <MainInput
                                        value={reqVerifyBody.credential ?? null}
                                        onChangeText={(input: string) =>
                                            setReqVerifyBody({
                                                ...reqVerifyBody,
                                                credential: input,
                                            })
                                        }
                                        placeholder={
                                            reqVerifyBody.type === "email"
                                                ? "إدخال البريد الألكتروني"
                                                : "إدخال رقم الهاتف"
                                        }
                                        placeholderTextColor={
                                            lightTheme.colors.text.light
                                        }
                                        fontSize="15px"
                                        cursorColor={lightTheme.colors.primary}
                                        keyboardType={
                                            reqVerifyBody.type === "email"
                                                ? "email-address"
                                                : "phone-pad"
                                        }
                                    />
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
                                    <Caption
                                        color={
                                            lightTheme.colors.text.darkSecond
                                        }
                                        style={{
                                            marginTop: 2,
                                            marginLeft: 10,
                                        }}
                                    >
                                        رمز التحقق :
                                    </Caption>
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
                            width="70%"
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
