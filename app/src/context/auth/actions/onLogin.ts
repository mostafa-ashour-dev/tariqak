import { axiosInstance } from "app/axios/instance";
import * as SecureStore from "expo-secure-store";

type Props = {
  credentials: {
    credential: string;
    password: string;
  };
  setState: any;
};

export const onLogin = async ({
  credentials,
  setState,
}: Props) => {
  
  console.log(credentials);
  try {
    const response = await axiosInstance.post("/auth/login", {
      credential: credentials.credential,
      password: credentials.password,
    });

    const { data } = response;
    if (response.status === 200) {
      setState({ token: data.data.tokens.refresh_token, loading: false });
      const authState = { user: data.data.user, tokens: data.data.tokens };
      await SecureStore.setItemAsync("authState", JSON.stringify(authState));
    }
  } catch (error: Error | any) {
    throw new Error(error.message as string);
  } finally {
    setState((prev: any) => ({ ...prev, loading: false }));
  }
};
