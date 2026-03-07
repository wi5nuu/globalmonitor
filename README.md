# Global Monitoring Dashboard 🌍✈️

A modern, fast, and real-time aircraft tracking dashboard built with **React**, **Vite**, and **Leaflet**. This application leverages the public OpenSky Network API to display live flight data on an interactive map.

![Global Monitoring Dashboard](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![Leaflet](https://img.shields.io/badge/Leaflet-1.x-green)

## ✨ Features

- **Real-Time Tracking**: Live rendering of aircraft positions across the globe with ~10s update intervals.
- **100% Free Infrastructure**: Uses OpenStreetMap tiles (via Leaflet) and the public OpenSky API—no API keys or paid subscriptions required!
- **Detailed Aircraft Info**: Click on any aircraft to view flight specifics including Callsign, Origin Country, Altitude, and Ground Speed.
- **Fast & Responsive**: Built with Vite and Tailwind CSS for blazing-fast performance and full responsiveness across Desktop and Mobile devices.
- **Dark Mode UI**: Professional, intelligence-style dark mode aesthetic using Radix UI and Lucide icons.
- **CORS Bypassed**: Development setup includes a built-in proxy to easily bypass browser CORS restrictions when fetching from OpenSky.

## 🛠️ Technology Stack

- **Frontend**: React (TypeScript), Next UI / Radix UI, Tailwind CSS
- **Map Engine**: React-Leaflet, Leaflet (OpenStreetMap Tiles)
- **Build Tool**: Vite
- **Data Source**: [OpenSky Network API](https://opensky-network.org/)

## 🚀 Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/global-monitoring-dashboard.git
   cd global-monitoring-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # Run with --host to test on your mobile device via local network
   npm run dev -- --host
   ```

4. **Open the App**
   Navigate to `http://localhost:5173/` in your browser. 
   To access it on your phone, look at your terminal for the Network IP (e.g., `http://192.168.x.x:5173/`) and open it on a device connected to the same Wi-Fi.

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```
You can preview the built app using:
```bash
npm run preview
```

## 📱 Mobile App (Optional)

Because this app is a lightweight Single Page Application (SPA), it can easily be wrapped into a native Android APK or iOS app using **Capacitor**. 

*(Instructions for Capacitor setup can be found in the Capacitor documentation).*

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OpenSky Network](https://opensky-network.org/) for providing the free live aircraft data.
- [OpenStreetMap](https://www.openstreetmap.org/) for the map tiles.
