const returnMissingFields = (fields) => {
    const missingFields = Object.entries(fields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    return missingFields;
};

export default returnMissingFields;
