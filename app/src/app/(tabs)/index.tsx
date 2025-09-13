import { View, Text, Alert } from "react-native";
import React from "react";
import { useAuth } from "context/auth/AuthContext";
import { MainButton, MainButtonText } from "components/styledComponents";
import EmergencyBtn from "components/ui/EmergencyBtn";
import { lightTheme } from "styles/styles";
const Homepage = () => {
    const { tokens, user, onLogout, nextStep } = useAuth();
    console.log("Homepage", { user: user, tokens: tokens, nextStep: nextStep });

    const handleLogout = async () => {
        try {
            await onLogout();
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View  style={{padding: 20, backgroundColor: lightTheme.colors.background.light, flex: 1}}>
            <EmergencyBtn text="طلب ونش طوارئ" />
        </View>
    );
};

export default Homepage;
