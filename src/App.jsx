// src/App.jsx

import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import QualityScore from './components/QualityScore'
import DataCard from './components/DataCard'
import './assets/components.css'

// ==========================================================
// CONNECTION + SECURITY CONFIG
// ==========================================================

const ESP32_WEBSOCKET_URL = 'ws://10.246.209.77/ws'

// ⚠️ Must match WS_BEARER_TOKEN on ESP32
const WS_BEARER_TOKEN = "f2c7c683b9154bb7de99ca6a73b40a791053f1c968ce2d735e879fe9259ed54e";

// ==========================================================
// SENSOR QUALITY THRESHOLDS — Must match ESP32 logic
// ==========================================================
const IAQ_BAD = 150;
const IAQ_OK = 75;
const DUST_BAD = 1000;
const DUST_OK = 500;

function App() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0,
    gas: 0,
    iaq: 0,
    dust: 0,
    iaqQuality: "loading",
  });

  const [connectionStatus, setConnectionStatus] = useState("connecting...");
  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const hasAuthenticated = useRef(false);

  // ==========================================================
  // WebSocket Connection + Auth Logic (Fixed Reauth)
  // ==========================================================
  useEffect(() => {
    function connectWS() {
      console.log(`Attempting WebSocket connection at: ${ESP32_WEBSOCKET_URL}`);
      const ws = new WebSocket(ESP32_WEBSOCKET_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ WebSocket Connected!");
        setConnectionStatus("connected - authenticating...");

        if (!hasAuthenticated.current) {
          ws.send(JSON.stringify({
            type: "auth",
            token: WS_BEARER_TOKEN
          }));
          hasAuthenticated.current = true;
          console.log("🔐 Sent authentication token once");
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📦 Received:", data);

          if (data.ok && data.msg === "auth_ok") {
            console.log("🔓 Authentication successful!");
            setConnectionStatus("authenticated");
            return;
          }

          if (data.error) {
            console.warn("⚠️ Server Error:", data.error);
            if (data.error === "invalid_token" || data.error === "unauthorized") {
              hasAuthenticated.current = false; // reset for next reconnect
            }
            return;
          }

          const iaq = data.iaq || 0;
          const dust = data.dust || 0;

          let qualityText = "loading";
          if (iaq > IAQ_BAD || dust > DUST_BAD) {
            qualityText = "Poor";
          } else if (iaq > IAQ_OK || dust > DUST_OK) {
            qualityText = "Moderate";
          } else {
            qualityText = "Good";
          }

          setSensorData({
            temperature: data.temp || 0,
            humidity: data.hum || 0,
            pressure: data.pres || 0,
            gas: data.gas || 0,
            iaq: iaq,
            dust: dust,
            iaqQuality: qualityText,
          });
        } catch (err) {
          console.error("❌ JSON parse error:", err);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
        setConnectionStatus("connection error");
      };

      ws.onclose = () => {
        console.warn("⚠️ WebSocket Disconnected. Retrying in 5s...");
        setConnectionStatus("disconnected - retrying...");
        hasAuthenticated.current = false; // allow auth again on reconnect

        reconnectTimer.current = setTimeout(() => {
          if (ws.readyState === ws.CLOSED) {
            console.log("🔁 Attempting reconnection...");
            connectWS();
          }
        }, 5000);
      };
    }

    connectWS();

    // Cleanup when component unmounts
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // ==========================================================
  // UI
  // ==========================================================
  return (
    <div className="app-container">
      <Header />

      <main>
        <h4 style={{ textAlign: 'center', color: '#555' }}>
          Status: {connectionStatus}
        </h4>

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
            title="Dust Sensor" 
            value={sensorData.dust.toFixed(0)} 
            unit="Raw" 
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
  );
}

export default App;
