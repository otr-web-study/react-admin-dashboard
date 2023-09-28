export const getKeyedData = (data) => data.map((item) => ({ ...item, key: crypto.randomUUID() }));
