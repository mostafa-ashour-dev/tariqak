import { View, Alert } from "react-native";
import React, {useState } from "react";
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

type LoginBody = {
  credential: string;
  password: string;
};

const Login = () => {
  const { onLogin } = useAuth();
  const [loginBody, setLoginBody] = useState<LoginBody>({
    credential: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async () => {
    try {

      if (!loginBody.credential || !loginBody.password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
      await onLogin({
        ...loginBody
      });

      router.push("/(tabs)/index");
    } catch (error: Error | any) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: lightTheme.colors.background.light }}>
      <MainTitle fontSize="25px">تسجيل دخول</MainTitle>
      <View style={{ marginTop: 10, width: "80%", alignItems: "center" }}>
        <MainInput
          onChangeText={(text: string) =>
            setLoginBody({ ...loginBody, credential: text })
          }
          placeholder="رقم الهاتف أو أسم المستخدم"
          placeholderTextColor={lightTheme.colors.text.light}
          fontSize="15px"
        />
        <MainInput
          onChangeText={(text: string) =>
            setLoginBody({ ...loginBody, password: text })
          }
          placeholder="كلمة المرور"
          secureTextEntry
          placeholderTextColor={lightTheme.colors.text.light}
          fontSize="15px"
        />
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <MainLinkText fontSize="15px" style={{ marginTop: 5 }}>
            نسيت كلمة المرور؟
          </MainLinkText>
        </View>

        <MainButton
          onPress={handleLogin}
          style={{ marginTop: 15, width: "100%" }}
        >
          <MainButtonText>تسجيل دخول</MainButtonText>
        </MainButton>
        <View style={{marginTop: theme.margin.md, gap: theme.spacing.xs}} >
          <SecondaryText>
            ليس لديك حساب؟
          </SecondaryText>
          <MainLinkText>
            إنشاء حساب جديد
          </MainLinkText>
        </View>
      </View>
    </View>
  );
};

export default Login;
