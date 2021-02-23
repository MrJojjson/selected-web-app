import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import { AlertBase } from '../src/components/molecules/alert';
import { ModalBase } from '../src/components/molecules/modal';
import { Navbar } from '../src/components/organisms';
import { Palette } from '../src/components/organisms/palette';
import { store } from '../src/redux/store';
import '../styles/globals.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, token }) {
    return (
        <Provider store={store}>
            {/* <FakeAuthProvider> */}
            <AlertBase />
            <Navbar />
            <div className="content">
                <Palette />
                <Component {...pageProps} />
            </div>
            <ModalBase />
            {/* </FakeAuthProvider> */}
        </Provider>
    );
}

export default MyApp;
