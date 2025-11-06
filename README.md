🏠 Indoor Air Quality Monitor — Web Dashboard (React + WebSocket)


██╗███╗   ██╗██████╗  ██████╗  ██████╗ ██████╗ 
██║████╗  ██║██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗
██║██╔██╗ ██║██████╔╝██║   ██║██║  ███╗██████╔╝
██║██║╚██╗██║██╔══██╗██║   ██║██║   ██║██╔══██╗
██║██║ ╚████║██║  ██║╚██████╔╝╚██████╔╝██║  ██║
╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝

       Indoor Air Quality Monitor — Web Dashboard


A modern, real-time React dashboard that visualizes sensor data streamed from the ESP32 air-quality monitoring firmware.

✅ Built with React + Vite
✅ Secure WebSocket authentication
✅ Real-time sensor cards
✅ Quality scoring system
✅ Responsive UI

📦 Project Structure
air_indoor_quality/
│── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── QualityScore.jsx
│   │   └── DataCard.jsx
│   ├── assets/
│   └── main.jsx
│── dist/ (build output)
│── .gitignore
│── package.json
└── README.md

🚀 Features

✅ Secure WebSocket connection with Bearer token

✅ Real-time temperature, humidity, IAQ, VOC, dust

✅ Intelligent IAQ scoring (Good / Moderate / Poor)

✅ Auto-reconnect logic

✅ Clean & responsive UI design

✅ Setup Guide

This section explains how to run the React web interface locally or deploy it.

✅ 1. Clone the Repo
git clone https://github.com/<user>/<repo>.git
cd air_indoor_quality

✅ 2. Install Dependencies
npm install

✅ 3. Configure WebSocket URL + Token

Edit src/App.jsx:

const ESP32_WEBSOCKET_URL = "ws://192.168.1.5/ws";

const WS_BEARER_TOKEN =
  "your_64_byte_token_here"; // match the ESP32 token


Make sure:

✅ IP address matches your ESP32
✅ Token matches WS_BEARER_TOKEN in firmware

✅ 4. Run Development Server
npm run dev


Open:

👉 http://localhost:5173

✅ 5. Build for Production
npm run build


Output is stored in:

dist/


You can deploy it to:

GitHub Pages

Netlify

Vercel

Your own server

ESP32-hosted static site (optional)

🔐 WebSocket Authentication

Client → ESP32:

{
  "type": "auth",
  "token": "your_token_here"
}


ESP32 replies:

✅ auth_ok
❌ auth_fail

No sensor data is streamed until authentication succeeds.

📡 WebSocket Data Format

The ESP32 sends packets like:

{
  "temp": 23.7,
  "hum": 62.1,
  "pres": 1004.9,
  "gas": 19500,
  "iaq": 48,
  "dust": 320
}

🎨 UI Components
✅ Sensor Cards

Temperature / Humidity / Pressure / Gas

✅ IAQ Quality Score

Color-coded score wheel (Good / Moderate / Poor)

✅ Header

Project title + status indicator

⚠️ Troubleshooting
✅ WebSocket won’t connect

Check ESP32 IP

Check firewall/router

Ensure both devices on same network

✅ Auth fails

Tokens must match exactly

ESP32 must be flashed with same token

✅ No dust readings

GP2Y sensor requires correct wiring

LED pin must pulse

ADC pin must be GPIO 34/35/36

📄 License

MIT License.

🙌 Contributions

PRs and issues are welcome!
