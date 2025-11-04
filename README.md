<<<<<<< HEAD
# Indoor Air Quality Dashboard

A responsive, real-time web dashboard built with **React + Vite** to visualize live sensor data from an **ESP32** and **BME680** sensor.

![Air Quality Dashboard Screenshot]()

---

## ✨ Features

* **Live Data:** Real-time updates via WebSockets (no page refresh needed).
* **Dynamic UI:** The overall quality score changes color (Green/Yellow/Red) based on the IAQ index.
* **Responsive Design:** Looks great on both desktop and mobile devices.
* **Minimalist Aesthetic:** Clean, dark-mode UI built with React.
* **Local Hardware:** Includes all Arduino code for the ESP32 to run a local web server and read from the BME680.

---

## 🛠️ Tech Stack

### Frontend (Web Dashboard)

* **React** (with Vite)
* **JavaScript (ES6+)**
* **CSS** (for styling and responsiveness)
* **WebSockets** (for data connection)

### Hardware (Sensor Node)

* **ESP32**
* **BME680 Sensor** (Temp, Humidity, Pressure, Gas/IAQ)
* **SSD1306 OLED** (Optional, for local display)
* **Arduino (C++)**
* **Libraries:** `ESPAsyncWebServer`, `ArduinoJson`, `Adafruit_BME680`

---

## How It Works

1.  The **BME680** sensor collects data for temperature, humidity, pressure, and gas resistance.
2.  The **ESP32** reads this data, connects to your local WiFi, and starts an `AsyncWebServer`.
3.  It creates a **WebSocket server** at the `/ws` endpoint.
4.  Every 2-5 seconds, the ESP32 calculates the IAQ, bundles all sensor data into a JSON object, and sends it to all connected WebSocket clients.
5.  The **React App** connects to the ESP32's WebSocket server using its local IP address.
6.  When the React app receives a JSON message, it updates its state, causing the UI to instantly re-render with the new data.

---

## 🚀 Getting Started

You need to set up both the hardware and the frontend.

### 1. Hardware Setup (ESP32)

1.  Open the ESP32 code (in the `/arduino` folder, or wherever you've saved it) in the Arduino IDE.
2.  **Install Libraries:** Make sure you have the following libraries installed via the Library Manager:
    * `Adafruit BME680 Library`
    * `Adafruit Unified Sensor`
    * `Adafruit GFX Library`
    * `Adafruit SSD1306`
    * `ESPAsyncWebServer`
    * `AsyncTCP`
    * `ArduinoJson` (**Version 6.x.x**)
3.  **Configure Credentials:** Update the `ssid` and `password` variables with your WiFi details.
4.  **Upload:** Flash the code to your ESP32.
5.  **Get IP Address:** Open the **Serial Monitor** (Baud: 115200). When it connects to your WiFi, it will print its IP address. Copy this IP!
    ```
    WiFi Connected!
    ESP32 IP Address: 192.168.1.X
    ```

### 2. Frontend Setup (React App)

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
    cd YOUR_REPO_NAME
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure IP Address:**
    * Open the `src/App.jsx` file.
    * Find the `ESP32_WEBSOCKET_URL` variable at the top.
    * Replace the placeholder IP with the IP address you copied from your Arduino Serial Monitor.
    ```javascript
    // src/App.jsx
    const ESP32_WEBSOCKET_URL = 'ws://192.168.1.X/ws'; // <-- CHANGE THIS
    ```
4.  **Run the App:**
    ```bash
    npm run dev
    ```

Your app will now be running at `http://localhost:5173`. Open it in your browser to see the live data!
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 2d81dac (Initial commit)
