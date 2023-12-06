import React, { useState } from 'react';
import './App.css'; // Importing CSS for styling

// Main App component
function App() {
    const [temperature, setTemperature] = useState('24°C');
    const [airhumidity, setAirHumidity] = useState('40%');
    const [light, setLight] = useState('300 lux');
    const [isOn, setIsOn] = useState(true);

    const handleUpdate = () => {
        fetch('https://localhost:8080/get_plant_data')
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                setTemperature(data.temperature + '°C');  // Append '°C' to temperature
                setAirHumidity(data.airhumidity + '%'); // Append '%' to soil moisture
                setLight(data.light + ' lux');            // Append 'lux' to light
                setIsOn(data.isOn);
            })
            .catch(error => console.error('Error:', error));
    };

    // Rendering the component UI
    return (
        <div className="container">
            <h1 className="title">Plant Monitor Dashboard</h1>
            <div className="sensor-display">
                {/* Individual sensor item for Temperature */}
                <div className="sensor-item">
                    <label>Temperature</label>
                    <div>{temperature}</div>
                </div>
                {/* Individual sensor item for Air Humidity */}
                <div className="sensor-item">
                    <label>Air Humidity</label>
                    <div>{airhumidity}</div>
                </div>
                {/* Individual sensor item for Light */}
                <div className="sensor-item">
                    <label>Light</label>
                    <div>{light}</div>
                </div>
                {/* Individual sensor item for System Status */}
                <div className="sensor-item">
                    <label>System Status</label>
                    <div>{isOn ? 'On' : 'Off'}</div>
                </div>
            </div>
            {/* Button to trigger data update */}
            <button className="update-button" onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default App;
