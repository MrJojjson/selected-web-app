import { Provider } from 'react-redux';
import styles from '../../../../styles/layout/primary.module.scss';
import { store } from '../../../redux/store';
import { AlertBase, ModalBase } from '../../molecules';
import { Navbar, Palette } from '../../organisms';

export const PrimaryLayout = (props: any) => (
    <Provider store={store}>
        <Navbar />
        <div className={styles.content}>
            <Palette />
            {props.children}
        </div>
        <AlertBase />
        <ModalBase />
    </Provider>
);
