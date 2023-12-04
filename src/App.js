import React, { useState } from 'react';
import './App.css'; // Importing CSS for styling

// Main App component
function App() {
    // State variables to store sensor data
    const [temperature, setTemperature] = useState('24°C'); // Temperature data
    const [soilMoisture, setSoilMoisture] = useState('40%'); // Soil moisture data
    const [light, setLight] = useState('300 lux'); // Ambient light data
    const [isOn, setIsOn] = useState(true); // System status

    // Function to handle the update of sensor data
    const handleUpdate = () => {
      // Fetching data from Flask backend
      fetch('http://localhost:5000/get_plant_data') 
          .then(data => {
              // Setting state variables with new data from backend
              setTemperature(data.temperature);
              setSoilMoisture(data.soilMoisture);
              setLight(data.light);
              setIsOn(data.isOn);
          })
          .catch(error => console.error('Error:', error)); // Error handling for the fetch request
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
                {/* Individual sensor item for Soil Moisture */}
                <div className="sensor-item">
                    <label>Soil Moisture</label>
                    <div>{soilMoisture}</div>
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
