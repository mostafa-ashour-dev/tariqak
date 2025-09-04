import { View, Text, Alert } from "react-native";
import React from "react";
import { useAuth } from "context/auth/AuthContext";
// import { useRouter } from 'expo-router'
import { MainButton, MainButtonText } from "components/styledComponents";
import { useRouter } from "expo-router";
const Homepage = () => {
  const { tokens, user, onLogout, nextStep } = useAuth();
  console.log("Homepage", { user: user, tokens: tokens, nextStep: nextStep });

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <Text style={{ color: "red", marginBlock: 50 }}>Homepage</Text>
      <MainButton onPress={handleLogout}>
        <MainButtonText>Logout</MainButtonText>
      </MainButton>
    </View>
  );
};

export default Homepage;
