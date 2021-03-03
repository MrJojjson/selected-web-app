import useAxios from 'axios-hooks';
import { insert } from 'ramda';
import { Header } from '../components/atoms';
import { getAuthTokenState } from '../redux';
import { UseApiReturn, UseApiType } from '../types/apiTypes';
const { SNOWPACK_PUBLIC_API_URL } = import.meta.env;

// export const useApi = ({ method = 'get', endpoint, id, idPos, params, data: body }: UseApiType): UseApiReturn => {
//     let end: string;

//     if (typeof endpoint === 'string') {
//         end = id ? `${endpoint}/${id}` : endpoint;
//     } else if (Array.isArray(endpoint)) {
//         end = endpoint.join('/');
//         if (id && !!idPos) {
//             end = insert(idPos, id, endpoint).join('/');
//         }
//     }

//     if (!end) return null;
//     const [{ data, loading, error }, refetch] = useAxios({
//         method,
//         url: `${SNOWPACK_PUBLIC_API_URL}/${end}`,
//         data: body,
//         params,
//         headers: {
//             Accept: 'text/html',
//         },
//     });
//     return { data, loading, error };
// };

const setEndpoint = ({ endpoint, id, idPos }: Pick<UseApiType, 'endpoint' | 'id' | 'idPos'>) => {
    let end: string = '';

    if (typeof endpoint === 'string') {
        end = id ? `${endpoint}/${id}` : endpoint;
    } else if (Array.isArray(endpoint)) {
        end = endpoint.join('/');
        if (id && !!idPos) {
            end = insert(idPos, id, endpoint).join('/');
        }
    }

    return end;
};

const setHeader = ({ token }: Pick<UseApiType, 'token'>) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

export const fetchData = async ({ endpoint, id, idPos, token, data, method = 'get' }: UseApiType) => {
    const headers = setHeader({ token });

    const end = setEndpoint({ endpoint, id, idPos });
    const url = `${SNOWPACK_PUBLIC_API_URL}/${end}`;

    return await fetch(url, {
        method,
        mode: 'cors',
        credentials: 'same-origin',
        headers,
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => err);
};
