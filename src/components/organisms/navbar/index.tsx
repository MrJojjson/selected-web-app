import cn from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../../styles/organisms/navbar.module.scss';
import { useStringNameFromUrl } from '../../../hooks/useUrl';
import { modalToggleOpen } from '../../../redux/actions/modalActions';
import { getModalOpenState } from '../../../redux/selectors/modalSelector';
import { Button, Header, Text } from '../../atoms';
import { NavbarMiddlePanel } from './navbarMiddlePanel';
export const Navbar = () => {
    const dispatch = useDispatch();
    const modalOpen = getModalOpenState();
    return (
        <header className={cn(styles.header)}>
            <div className={styles.system}>
                <Text theme="secondary">System quick access?</Text>
            </div>

            <NavbarMiddlePanel />
            <div className={styles.auth}>
                <Text theme="secondary">Auth?</Text>
                <Button
                    direction="row-reverse"
                    mini
                    icon={modalOpen ? 'window-minimize' : 'window-maximize'}
                    onClick={() => dispatch(modalToggleOpen({ contentType: 'menu' }))}
                />
            </div>
        </header>
    );
};
