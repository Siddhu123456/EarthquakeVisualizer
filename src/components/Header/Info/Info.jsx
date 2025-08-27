import { useState } from 'react';
import './Info.css';

const Info = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleInfo = () => {
        setIsOpen(!isOpen);
    };

    const magnitudeRanges = [
        {
            color: '#32CD32',
            colorName: 'Green',
            range: '< 3.0',
            description: 'Minor earthquakes'
        },
        {
            color: '#FFA500',
            colorName: 'Orange', 
            range: '3.0 - 4.9',
            description: 'Light earthquakes'
        },
        {
            color: '#FF0000',
            colorName: 'Red',
            range: '5.0 - 5.9',
            description: 'Moderate earthquakes'
        },
        {
            color: '#8B0000',
            colorName: 'Dark Red',
            range: '≥ 6.0',
            description: 'Strong earthquakes'
        }
    ];

    return (
        <div className="info-container">
            <button 
                className="info-toggle-btn"
                onClick={toggleInfo}
                title="Earthquake Magnitude Legend"
            >
                <span className="info-icon">ⓘ</span>
                Info
            </button>
            
            {isOpen && (
                <div className="info-dropdown">
                    <div className="info-header">
                        <h3>Earthquake Magnitude Legend</h3>
                        <button 
                            className="close-btn"
                            onClick={toggleInfo}
                            title="Close"
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="info-content">
                        <p className="info-description">
                            Earthquake markers are color-coded based on magnitude:
                        </p>
                        
                        <div className="legend-items">
                            {magnitudeRanges.map((item, index) => (
                                <div key={index} className="legend-item">
                                    <div 
                                        className="color-indicator"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <div className="legend-details">
                                        <span className="magnitude-range">
                                            Magnitude {item.range}
                                        </span>
                                        <span className="magnitude-description">
                                            {item.description}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="info-note">
                            <p>
                                <strong>Note:</strong> Marker size also increases with magnitude. 
                                Hover over any marker to see detailed earthquake information.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Info;