import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMap } from '../../../slices/earthquakeFilterSlice.jsx';
import './MapTypeSelector.css';

const MapTypeSelector = () => {
    const [isOpen, setIsOpen] = useState(false);

    const filterState = useSelector((state) => state.earthquakeFilter);
    const activeMap = filterState.activeMaptype;

    const dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(setActiveMap(id));
        setIsOpen(false);
    }

    const mapTypes = [
        { id: 'street', name: 'Street Map', icon: '🗺️' },
        { id: 'satellite', name: 'Satellite', icon: '🛰️' },
        { id: 'terrain', name: 'Terrain', icon: '🏔️' },
        { id: 'dark', name: 'Dark Mode', icon: '🌙' }
    ];

    return (
        <div className="control-group">
            <button 
                className={`control-button ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="control-icon">
                    {mapTypes.find(type => type.id === activeMap)?.icon || '🗺️'}
                </span>
                <span className="control-text">Map Style</span>
                <span className={`chevron ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isOpen && (
                <div className="dropdown-menu map-type-dropdown">
                    {mapTypes.map(type => (
                        <button
                            key={type.id}
                            className={`dropdown-item ${activeMap === type.id ? 'active' : ''}`}
                            onClick={() => handleClick(type.id)}
                        >
                            <span className="item-icon">{type.icon}</span>
                            <span className="item-text">{type.name}</span>
                            {activeMap === type.id && <span className="check-mark">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MapTypeSelector;