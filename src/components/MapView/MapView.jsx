import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from 'react-redux';
import L from 'leaflet';
import axios from 'axios';

import ResetViewButton from '../ResetViewButton/ResetViewButton.jsx';
import LoadingDialog from '../LoadingDialog/LoadingDialog.jsx';
import './MapView.css';

// Fix for default Leaflet markers in bundled environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapView = () => {
    const [earthquakes, setEarthquakes] = useState([]);
    const [loading, setLoading] = useState(true);

    const filterState = useSelector((state) => state.earthquakeFilter);
    const { activeMaptype, timeframe } = filterState;

    // Map type configurations
    const mapConfigs = {
        street: {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        },
        satellite: {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        },
        terrain: {
            url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
            attribution: "Map data: &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, <a href='http://viewfinderpanoramas.org'>SRTM</a> | Map style: &copy; <a href='https://opentopomap.org'>OpenTopoMap</a> (<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA</a>)"
        },
        dark: {
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
        }
    };

    const fetchEarthquakes = async (endpoint) => {
        const startTime = Date.now();
        
        try {
            setLoading(true);
            const res = await axios.get(
                `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${endpoint}.geojson`
            );
            setEarthquakes(res.data.features);
            
            // Calculate elapsed time
            const elapsedTime = Date.now() - startTime;
            const minimumLoadingTime = 1000; // 1 second
            
            // If data loaded too quickly, wait for remaining time
            if (elapsedTime < minimumLoadingTime) {
                const remainingTime = minimumLoadingTime - elapsedTime;
                setTimeout(() => {
                    setLoading(false);
                }, remainingTime);
            } else {
                setLoading(false);
            }
            
        } catch (err) {
            console.error("Error fetching earthquake data:", err);
            
            // Even on error, ensure minimum loading time
            const elapsedTime = Date.now() - startTime;
            const minimumLoadingTime = 1000;
            
            if (elapsedTime < minimumLoadingTime) {
                const remainingTime = minimumLoadingTime - elapsedTime;
                setTimeout(() => {
                    setLoading(false);
                }, remainingTime);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const endPoint = getEndpointFromTimeframe(timeframe);
        fetchEarthquakes(endPoint);
    }, [timeframe]);

    // Custom circle marker for earthquake
    const getIcon = (magnitude) =>
        L.divIcon({
            className: "custom-marker",
            html: `<div class="marker-icon" 
                    style="background-color: ${
                        magnitude >= 6 ? "darkred" : 
                        magnitude >= 5 ? "red" : 
                        magnitude >= 3 ? "orange" : 
                        "green"
                    };
                    width: ${8 + magnitude * 3}px; 
                    height: ${8 + magnitude * 3}px;">
                </div>`,
            iconSize: [25, 25],
        });

    const getMagnitudeColor = (magnitude) => {
        if (magnitude >= 6) return '#8B0000'; // Dark red
        if (magnitude >= 5) return '#FF0000'; // Red  
        if (magnitude >= 3) return '#FFA500'; // Orange
        return '#32CD32'; // Green
    };

    const getEndpointFromTimeframe = (timeframe) => {
        const endPointMap = {
            'hour': 'all_hour',
            'day': 'all_day',
            'week': 'all_week',
        }
        return endPointMap[timeframe] || 'all_day';
    };

    return (
        <div className="map-wrapper">
            <LoadingDialog isVisible={loading} />
            <MapContainer
                center={[20, 0]}
                zoom={2}
                minZoom={2}
                maxZoom={18}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
                worldCopyJump={false}
                className="map-container"
                zoomControl={false}
            >
                <TileLayer
                    url={mapConfigs[activeMaptype].url}
                    attribution={mapConfigs[activeMaptype].attribution}
                />

                {earthquakes.map((earthquake) => {
                    const [longitude, latitude] = earthquake.geometry.coordinates;
                    const { mag, place, time } = earthquake.properties;

                    return (
                        <Marker
                            key={earthquake.id}
                            position={[latitude, longitude]}
                            icon={getIcon(mag)}
                        >
                            <Popup>
                                <div style={{ color: getMagnitudeColor(mag) }}>
                                    <strong>{place}</strong>
                                </div>
                                <br />
                                <span style={{ color: '#666' }}>
                                    <strong>Magnitude:</strong> {mag || 'N/A'}
                                </span>
                                <br />
                                <span style={{ color: '#666' }}>
                                    <strong>Time:</strong> {new Date(time).toLocaleString()}
                                </span>
                            </Popup>
                        </Marker>
                    );
                })}

                <ResetViewButton />
            </MapContainer>
        </div>
    );
}

export default MapView;