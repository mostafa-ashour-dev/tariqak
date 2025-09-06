import { View, Text } from "react-native";
import React from "react";
import Back from "components/back";

const Reset = () => {
    return (
        <View>
            <Back value="Login" path="/login" />
            <Text>Will be done on the next repo</Text>
        </View>
    );
};

export default Reset;
