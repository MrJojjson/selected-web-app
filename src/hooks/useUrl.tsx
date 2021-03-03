import { useEffect, useState } from 'react';

type UseStringNameFromUrlType = {
    path?: string;
};

export const useStringNameFromUrl = ({ path }: UseStringNameFromUrlType) => {
    // const { asPath } = useRouter();
    const [nameFromUrl, setNameFromUrl] = useState<string>();
    // useEffect(() => {
    //     const stirngToUse = path || asPath;
    //     const linkPath = stirngToUse.split('/');
    //     linkPath.shift();
    //     linkPath.length > 1 && linkPath.reverse().pop();

    //     const name = linkPath
    //         .toString()
    //         .split(/\s*\-\s*/g)
    //         .join(' ');

    //     setNameFromUrl(name || 'Home');
    // }, [asPath, path]);
    return nameFromUrl;
};

export const convertStringToFriendlyFormat = ({ path }: UseStringNameFromUrlType) => {
    const name = path
        ?.toString()
        .split(/\s*\-\s*/g)
        .join(' ');

    return name;
};
