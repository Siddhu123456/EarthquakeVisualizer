import { useMap } from 'react-leaflet';
import './ResetViewButton.css';

const ResetViewButton = () => {
    const map = useMap();

    const handleClick = () => {
        map.setView([20, 0], 2);
    };

    return (
        <button
            onClick={handleClick}
            className="reset"
            title="Reset map to initial view"
        >
            Reset View
        </button>
    );
}

export default ResetViewButton;