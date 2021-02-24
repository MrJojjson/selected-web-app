import NextHead from 'next/head';
type HeadType = {
    title: string;
};
export const Head = ({ title }: HeadType) => {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </NextHead>
    );
};
