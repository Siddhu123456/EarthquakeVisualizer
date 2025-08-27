import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeframe } from '../../../slices/earthquakeFilterSlice.jsx';
import './TimeFilterSelector.css';

const TimeFilterSelector = () => {
    const [isOpen, setIsOpen] = useState(false);

    const filterState = useSelector((state) => state.earthquakeFilter);
    const activeTimeFilter = filterState.timeframe;

    const dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(setTimeframe(id));
        setIsOpen(false);
    }

    const timeFilters = [
        { id: 'hour', name: '1 Hour', icon: '⏰', endpoint: 'all_hour' },
        { id: 'day', name: '1 Day', icon: '📅', endpoint: 'all_day' },
        { id: 'week', name: '1 Week', icon: '📆', endpoint: 'all_week' }
    ];

    return (
        <div className="control-group">
            <button 
                className={`control-button ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="control-icon">
                    {timeFilters.find(filter => filter.id === activeTimeFilter)?.icon || '📅'}
                </span>
                <span className="control-text">Time Range</span>
                <span className={`chevron ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isOpen && (
                <div className="dropdown-menu time-filter-dropdown">
                    {timeFilters.map(filter => (
                        <button
                            key={filter.id}
                            className={`dropdown-item ${activeTimeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => handleClick(filter.id)}
                        >
                            <span className="item-icon">{filter.icon}</span>
                            <span className="item-text">{filter.name}</span>
                            {activeTimeFilter === filter.id && <span className="check-mark">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TimeFilterSelector;