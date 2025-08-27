import MapTypeSelector from '../MapTypeSelector/MapTypeSelector';
import TimeFilterSelector from '../TimeFilterSelector/TimeFilterSelector';
import './HeaderControls.css';

const HeaderControls = () => {
    return (
        <div className="header-controls">
            <MapTypeSelector />
            <TimeFilterSelector />
        </div>
    );
};

export default HeaderControls;