import { View, Text } from "react-native";
import React from "react";
import Back from "components/back";

const Reset = () => {
    return (
        <View>
            <Text>Reset</Text>
            <Back value="Login" path="/login" />
        </View>
    );
};

export default Reset;
