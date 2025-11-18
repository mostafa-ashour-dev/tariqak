const extractLocations = (locations) => {
    if (!locations) {
        return [];
    }

    if (locations.length === 0) {
        return [];
    }

    return locations.map((locationItem) => ({
        location: {
            type: "Point",
            coordinates: [
                locationItem.coordinates.longitude,
                locationItem.coordinates.latitude,
            ],
        },
        address: locationItem.address,
    }));
};

export default extractLocations;
