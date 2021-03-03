import { useEffect, useState } from 'react';

type UsePersistedStateType = {
    key: string;
    defaultValue: string;
};

export const usePersistedState = ({ key, defaultValue }: UsePersistedStateType) => {
    const [persistState, setPersistState] = useState(() => JSON.parse(localStorage.getItem(key)) || defaultValue);
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(persistState));
    }, [key, persistState]);
    return [persistState, setPersistState];
};
