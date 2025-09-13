import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { lightTheme, theme } from "styles/styles";
const EmergencyBtn = ({
  text,
  onPress,
}: {
  text?: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <LinearGradient
          colors={[lightTheme.colors.primaryDark, lightTheme.colors.primaryLight]}
          locations={[0, .6]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        ></LinearGradient>
        <Text style={styles.text}>{text || "طلب ونش طوارئ"}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    borderRadius: theme.radius.md,
    minHeight: 90,
    position: "relative",
    overflow: "hidden",
    backgroundColor: lightTheme.colors.background.light,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 400,
    height: 90,
    position: "absolute",
    top: 0,
    left: 0,
  },
  text: {
    color: "#fff",
    fontFamily: "Cairo-Bold",
    fontSize: 20,
  },
});

export default EmergencyBtn;
