let lastId = 0;

export const uniqueId = (prefix?: string): string => {
    let pre = prefix || 'id';
    lastId++;
    return `${pre}-${lastId}`;
};
