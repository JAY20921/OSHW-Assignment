# Demo Recording Guide - Arduino Simulator

## Complete Demo Workflow (3-5 minutes)

This guide will help you record a complete demonstration of all features for the FOSSEE OSHW Internship submission.

---

## Screen Recording Setup

1. **Open the application**: http://localhost:5173
2. **Start screen recording software** (OBS, Windows Game Bar, etc.)
3. **Set recording area**: Full browser window
4. **No voiceover required** - let the visuals speak

---

## Demo Script

### Part 1: Interface Overview (15 seconds)
1. Show the main interface with three sections:
   - Left: Component Palette
   - Center: Canvas workspace
   - Top: Toolbar with controls

### Part 2: Task 1 - Drag & Drop Components (30 seconds)

**Step 1: Add Arduino Uno**
- Hover over Arduino Uno in the component palette
- Drag and drop it to the center of the canvas
- Show the Arduino Uno component appearing on canvas

**Step 2: Add LED**
- Drag the LED from the palette
- Drop it on the canvas (right side of Arduino)
- Notice: LED shows "Pin 10" automatically
- Notice: LED status shows "OFF (LOW)"

**Step 3: Add Push Button**
- Drag the Push Button from the palette
- Drop it on the canvas (left side of Arduino)
- Notice: Button shows "Pin 2" automatically
- Notice: Green info box appears showing:
  - "🔌 Circuit Connected"
  - "LED → Pin 10"
  - "Button → Pin 2"
  - "✓ Ready to simulate"

### Part 3: Task 2 - Auto-Wiring & Pin Configuration (45 seconds)

**View Auto-Generated Code**
- Click "Code View" button in toolbar
- Show the split screen:
  - Left: Circuit components
  - Right: Auto-generated Arduino code
- Point out the code structure:
  ```cpp
  const int LED_PIN = 10;
  const int BUTTON_PIN = 2;
  ```

**Change LED Pin**
- Click the pin selector dropdown on the LED component
- Change from Pin 10 to Pin 11
- Show that:
  - The code updates automatically
  - `const int LED_PIN = 11;` in the code
  - Wiring info box updates

**Change Button Pin**
- Click the pin selector dropdown on the Button component
- Change from Pin 2 to Pin 3
- Show that:
  - The code updates automatically
  - `const int BUTTON_PIN = 3;` in the code
  - Wiring info box updates

**Try Invalid Pin Assignment** (Optional)
- Try to select Pin 3 for LED (same as button)
- Show that Pin 3 is not available in the dropdown (prevented)
- This demonstrates pin conflict detection

### Part 4: Task 3 - Simulation (60 seconds)

**Switch Back to Circuit View**
- Click "Circuit View" button
- Show full canvas with components

**Start Simulation**
- Click "▶ Start Simulation" button in toolbar
- Notice:
  - Button changes to "⏹ Stop Simulation"
  - Green "● Simulating" indicator appears
  - Button instruction changes to "Click to press"

**Test Button → LED Control**
- Click and HOLD the push button
- Show:
  - LED turns RED
  - LED status changes to "ON (HIGH)"
  - Button appears pressed
- Release the button
- Show:
  - LED turns OFF (dark gray)
  - LED status changes to "OFF (LOW)"

**Repeat 2-3 times**
- Press and release button multiple times
- Show consistent LED response

**Stop Simulation**
- Click "⏹ Stop Simulation" button
- Show LED turns off
- Simulation indicator disappears

### Part 5: Complete Pin Change & Re-simulation (30 seconds)

**Change Pins Again**
- Change LED to Pin 12
- Change Button to Pin 4
- Click "Code View" to show updated code
- Return to "Circuit View"

**Run Simulation Again**
- Click "▶ Start Simulation"
- Press button → LED responds
- Show that simulation works with new pins

**Final Code View**
- Switch to "Code View"
- Click "📋 Copy Code" button
- Show "Code copied to clipboard!" alert
- This demonstrates code is ready for Arduino IDE

---

## Key Features to Highlight

### ✅ Task 1 Completion
- [x] Component palette with 3 components
- [x] Drag-and-drop functionality
- [x] Canvas workspace
- [x] Start/Stop controls
- [x] View toggle (Circuit/Code)

### ✅ Task 2 Completion
- [x] Default auto-wiring (LED→10, Button→2)
- [x] Pin configuration dropdowns
- [x] Pin conflict prevention
- [x] Available pins update dynamically
- [x] Visual feedback (wiring info box)

### ✅ Task 3 Completion
- [x] Auto code generation
- [x] Code updates on pin change
- [x] Logic-level simulation
- [x] Button HIGH → LED ON
- [x] Button LOW → LED OFF
- [x] Real-time visual feedback

---

## Recording Tips

1. **Go Slow**: Don't rush through the demo
2. **Pause Between Actions**: Let viewers see each change
3. **Show Hover States**: Hover over buttons before clicking
4. **Demonstrate Errors**: Try the pin conflict scenario
5. **Multiple Tests**: Press button 3-4 times during simulation
6. **Clean Movements**: Smooth mouse movements, no erratic clicking

---

## Troubleshooting During Recording

**If LED doesn't respond:**
- Make sure you clicked "Start Simulation"
- Check that all 3 components are on canvas
- Stop and restart simulation

**If drag-and-drop doesn't work:**
- Make sure to drag from component palette
- Drop clearly on the canvas area

**If pin dropdown doesn't show options:**
- Refresh the page and start over

---

## After Recording

1. **Review the video** - make sure all features are shown
2. **Check video length** - aim for 3-5 minutes
3. **Upload to YouTube** (unlisted) or Google Drive
4. **Get shareable link**
5. **Submit through Google Form** with:
   - Video link
   - GitHub repository link (if applicable)
   - Self-declaration document

---

## Expected Final Demonstration Flow

1. Start with empty canvas ✓
2. Drag Arduino → Canvas ✓
3. Drag LED → Auto-wired to Pin 10 ✓
4. Drag Button → Auto-wired to Pin 2 ✓
5. View auto-generated code ✓
6. Change LED to Pin 11 → Code updates ✓
7. Change Button to Pin 3 → Code updates ✓
8. Start simulation ✓
9. Press button → LED ON ✓
10. Release button → LED OFF ✓
11. Repeat test ✓
12. Stop simulation ✓
13. Change pins again (optional) ✓
14. Show code copy feature ✓

**Total Time: 3-5 minutes**

---

Good luck with your submission! 🚀
