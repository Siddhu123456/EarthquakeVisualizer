import MapTypeSelector from '../MapTypeSelector/MapTypeSelector';
import TimeFilterSelector from '../TimeFilterSelector/TimeFilterSelector';
import Info from '../Info/Info';
import './HeaderControls.css';

const HeaderControls = () => {
    return (
        <div className="header-controls">
            <MapTypeSelector />
            <TimeFilterSelector />
            <Info />
        </div>
    );
};

export default HeaderControls;