# Quick Start Guide

## Installation & Running

```bash
# Navigate to project directory
cd arduino-simulator

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open browser to: http://localhost:5173
```

## Using the Simulator

### 1. Build Your Circuit (30 seconds)
1. **Drag Arduino Uno** from left panel → Drop on canvas
2. **Drag LED** from left panel → Drop on canvas (auto-wires to Pin 10)
3. **Drag Push Button** from left panel → Drop on canvas (auto-wires to Pin 2)

### 2. Configure Pins (Optional)
- Click **pin dropdown** on LED component → Select different pin (2-13)
- Click **pin dropdown** on Button component → Select different pin (2-13)
- Watch the **Arduino code update automatically** in Code View

### 3. Run Simulation
1. Click **"▶ Start Simulation"** button (top toolbar)
2. **Click and hold** the push button on canvas
3. Watch **LED turn ON** (red) with "ON (HIGH)" status
4. **Release** button → LED turns OFF with "OFF (LOW)" status
5. Click **"⏹ Stop Simulation"** when done

### 4. View Generated Code
- Click **"Code View"** button in toolbar
- See auto-generated Arduino code
- Click **"📋 Copy Code"** to copy to clipboard
- Ready to paste into Arduino IDE!

## Features At A Glance

| Feature | How to Use |
|---------|-----------|
| Add Component | Drag from left palette, drop on canvas |
| Change Pin | Click dropdown on component, select pin |
| View Code | Click "Code View" button in toolbar |
| Start Simulation | Click "▶ Start Simulation" button |
| Test Circuit | Click button component while simulating |
| Stop Simulation | Click "⏹ Stop Simulation" button |
| Copy Code | Click "📋 Copy Code" in Code View |

## Keyboard Shortcuts

- None currently - all interaction via mouse/touch

## Browser Requirements

- Modern browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- No special plugins required

## Troubleshooting

**Problem:** Can't drag components
- **Solution:** Make sure you're clicking on the component in the palette, not just the icon

**Problem:** LED doesn't respond to button
- **Solution:** Ensure simulation is started (green "Simulating" indicator visible)

**Problem:** Can't select certain pins
- **Solution:** That pin is already used by another component (conflict prevention)

**Problem:** Nothing appears when I drag
- **Solution:** Make sure to drop the component on the gray canvas area

## Complete Workflow Example

```
1. Open http://localhost:5173
2. Drag Arduino Uno to center of canvas
3. Drag LED to right side
4. Drag Button to left side
5. See green "Circuit Connected" info box
6. Click "Code View" - see generated Arduino code
7. Change LED pin to 11 using dropdown
8. See code update: LED_PIN = 11
9. Click "Circuit View" to return
10. Click "▶ Start Simulation"
11. Click and hold button → LED turns red
12. Release button → LED turns off
13. Click "⏹ Stop Simulation"
Done! ✓
```

## Next Steps

- Record demo video following `DEMO_GUIDE.md`
- Submit via FOSSEE internship form
- Include video link and repository URL

## Need Help?

Check the full README.md for detailed documentation.
