import { parse, stringify, ParsedQuery } from 'query-string';
import { includes, without } from 'ramda';
import { useHistory, useLocation } from 'react-router-dom';
import { StoreStateField } from '../redux/storeState';

export type OnQuerySearchType = {
    key: string;
    value?: string;
    valueArray?: string[];
    remove?: boolean;
};

export type UseQueryTpe = {
    storageKey?: StoreStateField;
    type?: 'filter' | 'sort';
};

export type UseQueryReturnType = {
    query?: {
        filter?: string[];
        sort?: string[];
    };
    queryType?: ParsedQuery<string>;
    onQuerySearch?: (props: OnQuerySearchType) => void;
};

export const useQuery = ({ storageKey, type }: UseQueryTpe): UseQueryReturnType => {
    const { search, pathname } = useLocation();
    const { push } = useHistory();
    const parsedSearch = parse(search, { arrayFormat: 'bracket' });
    console.log('parsedSearch', parsedSearch);

    const onQuerySearch = ({ key, value, valueArray, remove }: OnQuerySearchType) => {
        if (!parsedSearch[type]) {
            parsedSearch[type] = [];
        } else if (parsedSearch[type]) {
            parsedSearch[type] = (parse(parsedSearch[type] as string, {
                arrayFormat: 'bracket',
            }) as unknown) as string[];
        }
        let searchKey = parsedSearch[type][key];

        if (valueArray) {
            if (remove) {
                searchKey = [];
            } else {
                searchKey = valueArray;
            }
        } else {
            if (remove) {
                searchKey = [];
            } else if (!searchKey) {
                searchKey = [value];
            } else if (includes(value, searchKey)) {
                searchKey = without([value], searchKey);
            } else {
                searchKey = [...searchKey, value];
            }
        }
        console.log('searchKey', searchKey);

        parsedSearch[type][key] = searchKey;
        console.log('parsedSearch', parsedSearch);
        const a = stringify(parsedSearch[type] as string[]);
        console.log('a', a);

        const stringifiedSearch = stringify(parsedSearch, { arrayFormat: 'bracket' });
        console.log('stringifiedSearch', stringifiedSearch);

        const searchWithType = `${type}=${stringifiedSearch}`;
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(stringifiedSearch));
        }
        push({
            pathname,
            search: stringifiedSearch,
        });
    };

    const query = parsedSearch;
    const queryType = parse(parsedSearch[type] as string, { arrayFormat: 'bracket' });

    return { onQuerySearch, query, queryType };
};
