import './loading.style.scss';

export const LoadingIndicator = () => {
    return (
        <div className="spinner">
            <span className="spinner_inner__1"></span>
            <span className="spinner_inner__2"></span>
            <span className="spinner_inner__3"></span>
        </div>
    );
};
