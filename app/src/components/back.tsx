import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLeftFromLineIcon } from "lucide-react-native";
import { router } from "expo-router";
import { lightTheme, theme } from "styles/styles";

const Back = ({ value, path }: { value: string; path: string }) => {
    return (
        <TouchableOpacity
            onPress={() => router.push(path)}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 12,
                paddingLeft: 10,
                gap: 8,
                paddingTop: 1,
                paddingBottom: 3,
                backgroundColor: lightTheme.colors.background.light,
                borderRadius: 8,
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1,
                borderColor: lightTheme.colors.primary,
                borderWidth: 1,
            }}
        >
            <ArrowLeftFromLineIcon
                style={{ marginTop: 2 }}
                size={13}
                color={lightTheme.colors.text.dark}
            />
            <Text
                style={{
                    marginBottom: 2,
                    fontFamily: theme.fontFamilies.main.medium,
                    fontSize: theme.fontSizes.base,
                    color: lightTheme.colors.text.dark,
                }}
            >
                {value}
            </Text>
        </TouchableOpacity>
    );
};

export default Back;
