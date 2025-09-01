import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    Caption,
    MainButton,
    MainButtonText,
    MainTitle,
} from "components/styledComponents";
import { theme } from "styles/styles";
import { router } from "expo-router";

const Welcome = () => {
    return (
        <View style={{ flexDirection: "column" }}>
            <Image
                source={require("../../../assets/images/road_bg.jpg")}
                style={{ width: "auto", height: 450 }}
            />
            <View style={styles.container}>
                <MainTitle style={{ marginTop: 1 }} fontSize={"70px"}>
                    طريقك
                </MainTitle>
                <Caption fontSize="18px" style={{ paddingHorizontal: 15 }}>
                    كل اللي محتاجه لعربيتك ... هتلاقيه في تطبيق طريقك.
                </Caption>
                <MainButton
                    onPress={() => router.push("/(auth)/login.tsx")}
                    style={{ marginTop: 30 }}
                >
                    <MainButtonText>تسجيل دخول</MainButtonText>
                </MainButton>
                <MainButton
                    onPress={() => router.push("/register.tsx")}
                    style={{ marginTop: 15 }}
                    outlined
                >
                    <MainButtonText outlined>إنشاء حساب</MainButtonText>
                </MainButton>
            </View>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        width: "auto",
        height: 400,
        backgroundColor: "white",
        marginTop: -25,
        borderRadius: 25,
        flexDirection: "column",
        alignItems: "center",
        padding: theme.padding.lg,
    },
});
