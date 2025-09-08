import React, { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";

type Area = {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
};

type Props = {
    areas: Area[];
    setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
};

const DriverMap: React.FC<Props> = ({ areas, setAreas }) => {
    const [marker, setMarker] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    // Reverse geocode using Nominatim
    const reverseGeocode = async (lat: number, lon: number) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await res.json();
            return data.display_name || "موقع غير معروف";
        } catch (err) {
            console.error("Error reverse geocoding:", err);
            return "موقع غير معروف";
        }
    };

    const handleAddArea = async () => {
        if (!marker) return;
        const name = await reverseGeocode(marker.latitude, marker.longitude);

        setAreas((prev) => [
            ...prev,
            {
                name,
                location: {
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                },
            },
        ]);

        setMarker(null); // reset marker after adding
    };

    const handleRemoveArea = (index: number) => {
        setAreas((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <View
            style={{
                marginTop: 20,
                alignItems: "center",
                flex: 1,
                width: "100%",
            }}
        >
            <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
                اختر المناطق التي تعمل بها
            </Text>
            <MapView
                style={{ width: "90%", height: 250 }}
                initialRegion={{
                    latitude: 30.0444,
                    longitude: 31.2357,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    setMarker({ latitude, longitude });
                }}
            >
                <UrlTile
                    urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                />
                {marker && <Marker coordinate={marker} />}
                {areas.map((area, i) => (
                    <Marker
                        key={i}
                        coordinate={area.location}
                        title={area.name}
                        pinColor="green"
                    />
                ))}
            </MapView>

            {marker && (
                <Pressable
                    onPress={handleAddArea}
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: "blue",
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "white" }}>➕ إضافة المنطقة</Text>
                </Pressable>
            )}

            <FlatList
                data={areas}
                keyExtractor={(_, i) => i.toString()}
                style={{ marginTop: 15, width: "90%" }}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                            backgroundColor: "#f2f2f2",
                            marginBottom: 5,
                            borderRadius: 6,
                        }}
                    >
                        <Text style={{ flex: 1 }}>{item.name}</Text>
                        <Pressable onPress={() => handleRemoveArea(index)}>
                            <Text style={{ color: "red" }}>🗑️ إزالة</Text>
                        </Pressable>
                    </View>
                )}
                scrollEnabled={false}
            />
        </View>
    );
};

export default DriverMap;
