// src/App.jsx

import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import QualityScore from './components/QualityScore'
import DataCard from './components/DataCard'

// We'll import our component-specific styles here
import './assets/components.css'

// IMPORTANT: Replace this with your ESP32's IP address
const ESP32_WEBSOCKET_URL = 'ws://192.168.1.5/ws'; 

function App() {
  // Use useState to hold our sensor data
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0,
    gas: 0,
    iaq: 0,
    iaqQuality: "loading", // This will be "Good", "Moderate", etc.
  });

  // Use useEffect to connect to the WebSocket on component mount
  useEffect(() => {
    console.log("Connecting to WebSocket...");
    const ws = new WebSocket(ESP32_WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("WebSocket Connected!");
    };

    ws.onmessage = (event) => {
      // The ESP32 will send data as a JSON string
      const data = JSON.parse(event.data);
      console.log("Received data:", data);

      // --- Logic to determine air quality ---
      let qualityText = "loading...";
      if (data.iaq <= 100) {
        qualityText = "Good";
      } else if (data.iaq <= 200) {
        qualityText = "Moderate";
      } else {
        qualityText = "Poor";
      }
      
      // Update our React state with the new data
      setSensorData({
        temperature: data.temp || 0,
        humidity: data.hum || 0,
        pressure: data.pres || 0,
        gas: data.gas || 0,
        iaq: data.iaq || 0,
        iaqQuality: qualityText,
      });
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    // This "cleanup" function runs when the component unmounts
    return () => {
      ws.close();
    };
  }, []); // The empty array [] means this effect runs only once

  return (
    <div className="app-container">
      <Header />
      
      <main>
        {/* Pass the live data down to our components as props */}
        <QualityScore 
          score={sensorData.iaq.toFixed(0)} 
          quality={sensorData.iaqQuality} 
        />

        <div className="dashboard-grid">
          <DataCard 
            title="Temperature" 
            value={sensorData.temperature.toFixed(1)} 
            unit="°C" 
          />
          <DataCard 
            title="Humidity" 
            value={sensorData.humidity.toFixed(1)} 
            unit="%" 
          />
          <DataCard 
            title="Pressure" 
            value={sensorData.pressure.toFixed(1)} 
            unit="hPa" 
          />
          <DataCard 
            title="Gas / VOC" 
            value={sensorData.gas.toFixed(0)} 
            unit="kΩ" 
          />
        </div>
      </main>
    </div>
  )
}

export default App