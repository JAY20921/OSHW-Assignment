# Arduino Simulator - FOSSEE OSHW Internship 2026

A web-based Arduino simulator built for the FOSSEE Semester Long Internship screening task. This simulator allows users to drag-and-drop Arduino components (Arduino Uno, LED, Push Button), automatically wire them, generate Arduino code, and simulate circuit behavior.

## Features

### ✅ Task 1: Web-Based Interface & Component Handling
- Component palette with Arduino Uno, LED, and Push Button
- Drag-and-drop interface for building circuits
- Central canvas workspace
- View toggle between Circuit View and Code View
- Start/Stop simulation controls

### ✅ Task 2: Auto-Wiring Logic with Configurable Pins
- Default pin mapping:
  - LED → Digital Pin 10
  - Push Button → Digital Pin 2
- User-configurable pin assignment (Pins 2-13)
- Automatic pin conflict detection
- Visual feedback for pin assignments

### ✅ Task 3: Auto Code Generation & Logic-Level Simulation
- Automatic Arduino code generation
- Real-time code updates when pins change
- Logic-level simulation:
  - Button pressed → GPIO HIGH → LED ON
  - Button released → GPIO LOW → LED OFF
- Interactive simulation controls

## Technology Stack

- **Frontend Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Simulation Engine:** avr8js (Arduino AVR simulator)
- **UI Components:** @wokwi/elements (Visual Arduino components)
- **Styling:** CSS3 with modern features

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions

1. **Navigate to the project directory:**
   ```bash
   cd arduino-simulator
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:5173`

## Usage Guide

### Building a Circuit

1. **Add Arduino Uno:**
   - Drag the Arduino Uno from the left component palette
   - Drop it on the canvas

2. **Add LED:**
   - Drag the LED component
   - Drop it on the canvas
   - LED is automatically wired to Pin 10

3. **Add Push Button:**
   - Drag the Push Button component
   - Drop it on the canvas
   - Button is automatically wired to Pin 2

### Configuring Pins

- Click the pin selector dropdown on each component (LED/Button)
- Choose from available pins (2-13)
- Pin conflicts are automatically prevented
- Arduino code updates automatically when pins change

### Running Simulation

1. **Start Simulation:**
   - Click "▶ Start Simulation" button in toolbar
   - All three components must be added first

2. **Test Button → LED Control:**
   - Click and hold the push button
   - LED turns ON (shows red color and "ON (HIGH)")
   - Release button
   - LED turns OFF (shows "OFF (LOW)")

3. **Stop Simulation:**
   - Click "⏹ Stop Simulation" button

### Viewing Generated Code

1. Click "Code View" button in toolbar
2. View the auto-generated Arduino code
3. Code updates automatically when pins are changed
4. Click "📋 Copy Code" to copy to clipboard

## Complete Workflow Demonstration

✓ Drag Arduino Uno to canvas
✓ Drag LED → Auto-wire to Pin 10
✓ Drag Push Button → Auto-wire to Pin 2
✓ View auto-generated Arduino code
✓ Change LED pin to 11 → Code updates automatically
✓ Change Button pin to 3 → Code updates automatically
✓ Click Start Simulation
✓ Press button → LED turns ON
✓ Release button → LED turns OFF
✓ Click Stop Simulation

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Compatibility

- Chrome/Edge (recommended): Full support
- Firefox: Full support
- Safari: Full support

## References

- [Wokwi](https://wokwi.com) - Arduino simulator inspiration
- [avr8js](https://github.com/wokwi/avr8js) - Arduino AVR emulator
- [wokwi-elements](https://github.com/wokwi/wokwi-elements) - Visual components

## Author

Created for FOSSEE OSHW Semester Long Internship – 2025 screening task.

## License

This project is created for educational purposes as part of the FOSSEE internship screening process.
