import Head from 'next/head';
import { useEffect } from 'react';
import { AlertBase, ModalBase } from '../molecules';
import { Navbar, Palette } from '../organisms';
import styles from '../../../styles/layout/layout.module.scss';

type LayoutProps = {
    children: JSX.Element;
};

export const Layout = ({ children }: LayoutProps) => {
    useEffect(() => {
        console.log('mount');
        return () => console.log('unmount');
    }, []);

    return (
        <>
            <Head>
                <title>Selected management</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar />
            <div className={styles.content}>
                <Palette />
                {children}
            </div>
            <AlertBase />
            <ModalBase />
        </>
    );
};
