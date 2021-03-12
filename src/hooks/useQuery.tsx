import { parse, stringify, ParsedQuery } from 'query-string';
import { includes, isEmpty, without } from 'ramda';
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
        sort?: {
            by: string;
            order: string;
        };
    };
    queryType?: ParsedQuery<string>;
    onQuerySearch?: (props: OnQuerySearchType) => void;
};

export const useQuery = ({ storageKey, type }: UseQueryTpe): UseQueryReturnType => {
    const { search, pathname } = useLocation();
    const { push } = useHistory();
    const parsedSearch = parse(search, { arrayFormat: 'bracket' });

    const onQuerySearch = ({ key, value, valueArray, remove }: OnQuerySearchType) => {
        let parsedSearchType = parse(parsedSearch[type] as string, { arrayFormat: 'bracket' }) || [];

        let searchKey = parsedSearchType[key];
        if (type === 'filter') {
            if (valueArray) {
                searchKey = valueArray;
            } else if (!searchKey) {
                searchKey = [value];
            } else if (includes(value, searchKey)) {
                searchKey = without([value], searchKey);
            } else if (type) {
                searchKey = [...searchKey, value];
            }
            if (remove) {
                searchKey = [];
            }
        } else if (type === 'sort') {
            if (remove) {
                searchKey = [];
                parsedSearchType = [];
            } else {
                searchKey = value;
                if (parsedSearchType['order'] === undefined) {
                    parsedSearchType['order'] = 'descend';
                }
            }
        }

        parsedSearch[type] = stringify({ ...parsedSearchType, [key]: searchKey }, { arrayFormat: 'bracket' });
        const stringifiedSearch = isEmpty(parsedSearch[type])
            ? ''
            : stringify(parsedSearch, { arrayFormat: 'bracket' });

        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(stringifiedSearch));
        }
        push({
            pathname,
            search: stringifiedSearch,
        });
    };

    const query = {};
    for (let index = 0; index < Object.keys(parsedSearch).length; index++) {
        const key = Object.keys(parsedSearch)[index];
        const value = Object.values(parsedSearch)[index] as string;
        query[key] = parse(value, { arrayFormat: 'bracket' });
    }

    const queryType = query[type] || {};
    return { onQuerySearch, query, queryType };
};
