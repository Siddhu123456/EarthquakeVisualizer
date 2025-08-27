import './LoadingDialog.css';

const LoadingDialog = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-dialog">
                <div className="loading-spinner"></div>
                <h3>Loading Earthquake Data...</h3>
                <p>Fetching latest earthquake information from USGS</p>
            </div>
        </div>
    );
};

export default LoadingDialog;