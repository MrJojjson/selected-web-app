import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import { Layout } from '../src/components/layout';
import { store } from '../src/redux/store';
import '../styles/globals.scss';
config.autoAddCss = false;

library.add(fas);

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, token }) {
    const getLayout = Component.getLayout || ((page: any) => page);
    return (
        <Provider store={store}>
            {/* <FakeAuthProvider> */}
            <Layout>{getLayout(<Component {...pageProps}></Component>)}</Layout>
            {/* </FakeAuthProvider> */}
        </Provider>
    );
}

export default MyApp;
