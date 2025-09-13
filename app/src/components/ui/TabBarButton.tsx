import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { lightTheme } from "styles/styles";

const TabBarButton = ({
  icon,
  type,
  active,
  ...props
}: {
  icon: any;
  type?: string;
  active?: boolean;
}) => {
  if (type === "profile") {
    return (
        <View style={styles.profileContainer}>
          <FontAwesome5 name="user" size={25} color={lightTheme.colors.primary} />
        </View>
      );
  }

  if (icon === "tow-truck") {
    return (
          <View style={styles.container}>
          <MaterialCommunityIcons
            name="tow-truck"
            size={30}
            color={active && lightTheme.colors.primary || lightTheme.colors.text.dark}
          />
        </View>
      );
  }

  return (
      <View style={styles.container}>
        <FontAwesome5
          name={icon || "home"}
          size={25}
          color={active ? lightTheme.colors.primary : lightTheme.colors.text.dark}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 55,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightTheme.colors.background.light,
    borderRadius: 50,
    width: 55,
    minHeight: 55,
    maxHeight: 55,
    marginTop: 6.5,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{translateX: "-50%"}, {translateY: "-60%"}],
  },
});

export default TabBarButton;
