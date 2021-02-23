import styles from '../../../../styles/atoms/loading.module.scss';

export const LoadingIndicator = () => {
    return (
        <div className={styles.spinner}>
            <span className={styles.spinner_inner__1}></span>
            <span className={styles.spinner_inner__2}></span>
            <span className={styles.spinner_inner__3}></span>
        </div>
    );
};
