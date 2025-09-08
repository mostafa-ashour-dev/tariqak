import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import { Caption } from "./styledComponents";

type Props = {
    startTime: Date | null;
    endTime: Date | null;
    onChangeStart: (date: Date) => void;
    onChangeEnd: (date: Date) => void;
};

export default function ActivePeriod({
    startTime,
    endTime,
    onChangeStart,
    onChangeEnd,
}: Props) {
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    return (
        <View
            style={{
                marginTop: 10,
                width: "80%",
                alignItems: "center",
                flexDirection: "row-reverse",
                borderWidth: 1,
                borderColor: "#ccc",
                paddingVertical: 15,
                borderRadius: 6,
            }}
        >
            {/* Start Time */}
            <View style={styles.inputContainer}>
                <Caption style={{ fontSize: 16 }}>بداية وقت العمل</Caption>
                <TouchableOpacity
                    onPress={() => setShowStart(true)}
                    style={{
                        backgroundColor: "white",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        width: "80%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                    }}
                >
                    <Text>
                        {startTime
                            ? startTime.toLocaleTimeString("ar-EG", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : "اختر الوقت"}
                    </Text>
                </TouchableOpacity>
                {showStart && (
                    <DateTimePicker
                        value={startTime || new Date()}
                        mode="time"
                        is24Hour
                        display="spinner"
                        onChange={(event, selected) => {
                            setShowStart(false);
                            if (selected) onChangeStart(selected);
                        }}
                    />
                )}
            </View>

            {/* End Time */}
            <View style={styles.inputContainer}>
                <Caption style={{ fontSize: 16 }}>نهاية وقت العمل</Caption>
                <TouchableOpacity
                    onPress={() => setShowEnd(true)}
                    style={{
                        backgroundColor: "white",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        width: "80%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                    }}
                >
                    <Text>
                        {endTime
                            ? endTime.toLocaleTimeString("ar-EG", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : "اختر الوقت"}
                    </Text>
                </TouchableOpacity>
                {showEnd && (
                    <DateTimePicker
                        value={endTime || new Date()}
                        mode="time"
                        is24Hour
                        display="spinner"
                        onChange={(event, selected) => {
                            setShowEnd(false);
                            if (selected) onChangeEnd(selected);
                        }}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});
