import { useHistory, useLocation } from 'react-router-dom';
import { stringify } from 'query-string';
import { StoreStateField } from '../redux/storeState';
import { useEffect } from 'react';

type QueryProviderType = {
    children: any;
    id: StoreStateField;
};

export const QueryProvider = ({ children, id }: QueryProviderType) => {
    const { pathname } = useLocation();
    const { push } = useHistory();
    const storageSearch = localStorage.getItem(id);

    useEffect(() => {
        if (storageSearch !== '') {
            push({
                pathname,
                search: JSON.parse(storageSearch),
            });
        }
    }, []);

    return children;
};
