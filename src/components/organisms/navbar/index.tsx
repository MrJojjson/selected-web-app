import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../../styles/organisms/navbar.module.scss';
import { modalToggleOpen } from '../../../redux/actions/modalActions';
import { Button, Text } from '../../atoms';
export const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <header className={cn(styles.header)}>
            <div className={styles.system}>
                <Text theme="secondary">System quick access?</Text>
            </div>

            <div className={styles.settings}>
                <Text>The actual page information and quick access.</Text>
            </div>
            <div className={styles.auth}>
                <Text theme="secondary">Auth?</Text>
                <Button mini label="Modal" onClick={() => dispatch(modalToggleOpen({ contentType: 'menu' }))} />
            </div>
        </header>
    );
};
