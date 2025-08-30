const returnMissingFields = (fields) => {
    const missingFields = Object.entries(fields)
        .filter(([key, value]) => value === undefined || value === null || value === "")
        .map(([key]) => key);

    return missingFields;
};

export default returnMissingFields;
