import { Image, StyleSheet, View } from "react-native";
import React from "react";
import {
    Caption,
    MainButton,
    MainButtonText,
    MainTitle,
} from "components/styledComponents";
import { theme } from "styles/styles";
import { router } from "expo-router";
import { StatusBar } from "react-native";

const Welcome = () => {
    return (
        <View style={{ flexDirection: "column" }}>
            <Image
                source={require("../../assets/images/road_bg.jpg")}
                style={{ width: "auto", height: "57%" }}
            />
            <View style={styles.container}>
                <MainTitle style={{ marginTop: 1 }} fontSize={"55px"}>
                    طريقك
                </MainTitle>
                <Caption
                    fontSize="15px"
                    lineHeight="20px"
                    style={{ width: "80%", textAlign: "center" }}
                >
                    كل اللي محتاجه لعربيتك ... هتلاقيه في تطبيق طريقك.
                </Caption>
                <MainButton
                    onPress={() => router.push("/login")}
                    style={{ marginTop: 25 }}
                >
                    <MainButtonText>تسجيل دخول</MainButtonText>
                </MainButton>
                <MainButton
                    onPress={() => router.push("/register")}
                    style={{ marginTop: 15 }}
                    outlined
                >
                    <MainButtonText outlined>إنشاء حساب</MainButtonText>
                </MainButton>
            </View>

            <StatusBar
                barStyle="light-content"
                backgroundColor={"transparent"}
                animated
                showHideTransition={"fade"}
                hidden={true}
            />
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        width: "auto",
        height: "50%",
        backgroundColor: "white",
        marginTop: -25,
        borderRadius: 25,
        flexDirection: "column",
        alignItems: "center",
        padding: theme.padding.xl,
        paddingTop: 25,
    },
});
