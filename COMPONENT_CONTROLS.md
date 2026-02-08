# Component Control Features

## ✨ New Interactive Features

### 🖱️ Move Components
**How to use:**
1. Click and hold on any component
2. Drag to new position
3. Release to drop

**Visual feedback:**
- Component becomes semi-transparent while dragging
- Blue glow appears around component
- Cursor changes to "grabbing hand"
- Component moves to z-index 1000 (appears on top)

**Tips:**
- You can drag any component except when clicking on pin dropdowns
- The circuit stays connected logically even when components move

---

### 📐 Resize Components
**How to use:**
1. **Right-click** on any component
2. Context menu appears
3. Choose size option:
   - 🔽 **Smaller (80%)** - Reduce component size
   - ⚖️ **Normal (100%)** - Reset to default size
   - 🔼 **Larger (120%)** - Increase component size

**Use cases:**
- Make microcontrollers larger for better visibility
- Shrink passive components (resistors, capacitors) to save space
- Adjust LED size based on circuit importance

---

### 🗑️ Remove Components
**Method 1 - Context Menu:**
1. **Right-click** on component
2. Select "🗑️ Remove"

**Method 2 - Close Button:**
- Click the **×** button in component header (if available)

**Effects:**
- Component is immediately removed from canvas
- Code updates automatically (removes references)
- Pin assignments are freed up
- For microcontroller: entire circuit state resets

---

## 🎯 Context Menu Options

**Access:** Right-click on any component

**Available Options:**
```
┌─────────────────────┐
│ 🗑️ Remove           │ ← Delete component
│ 🔽 Smaller (80%)    │ ← Shrink to 80% size
│ ⚖️ Normal (100%)    │ ← Reset to default
│ 🔼 Larger (120%)    │ ← Enlarge to 120%
│ ❌ Close            │ ← Close menu
└─────────────────────┘
```

**Menu behavior:**
- Appears to the right of component
- Click anywhere to close
- Click option to apply action
- Menu has blue border for visibility

---

## 🔧 Technical Details

### Position Tracking
- Components use **absolute positioning** within canvas
- Position stored in circuit state: `{ x: number, y: number }`
- Positions persist when switching views (Component ↔ Code)

### Scale Tracking
- Scale stored in component properties: `{ scale: 0.8 | 1.0 | 1.2 }`
- Uses CSS `transform: scale()` for smooth rendering
- Transform origin: top-left corner (prevents position shift)

### State Persistence
- **Circuit state is now centralized** in App component
- Canvas components receive circuit as prop
- Switching views no longer loses circuit data
- Mode switching (FOSSEE ↔ Advanced) preserves components

---

## 🐛 Fixed Issues

### ✅ Circuit Disappearing When Switching Views
**Problem:** 
- Previously, each Canvas had its own internal state
- Switching from "Component View" to "Code View" created new Canvas instance
- All components were lost

**Solution:**
- Circuit state moved to parent App component
- Canvas receives circuit as prop
- Both view modes now share same circuit state
- Components persist across view changes

**Before:**
```tsx
// ❌ Each Canvas had separate state
const [circuit, setCircuit] = useState<Circuit>({...});
```

**After:**
```tsx
// ✅ Circuit state in App, passed as prop
<Canvas circuit={circuit} onCircuitChange={handleCircuitChange} />
```

---

## 💡 Usage Tips

### Best Practices
1. **Organize your circuit:**
   - Drag components to logical positions
   - Place Arduino at top/center
   - Group related components (LEDs, sensors)

2. **Use resize for clarity:**
   - Make important components larger
   - Shrink decorative or passive components
   - Keep Arduino at 100% or larger for readability

3. **Context menu shortcuts:**
   - Right-click is faster than looking for buttons
   - Hold right-click = menu appears instantly
   - Click outside menu = auto-closes

### Common Workflows

**Rearranging Circuit:**
```
1. Drag Arduino to center-top
2. Drag LED below Arduino (aligned)
3. Drag Button to right of LED
4. Resize LED to 120% (make prominent)
5. Result: Clean, organized layout
```

**Removing and Re-adding:**
```
1. Right-click LED → Remove
2. Circuit updates (LED code disappears)
3. Drag new LED from palette
4. Auto-assigned to available pin
5. Code regenerates with new LED
```

---

## 🎨 Visual Indicators

| State | Visual Effect |
|-------|--------------|
| **Normal** | Gray border, white text |
| **Hover** | Blue border (#61dafb) |
| **Dragging** | Semi-transparent, blue glow, z-index 1000 |
| **Context Menu Open** | Menu appears with blue border |
| **Grab cursor** | Component is draggable |
| **Grabbing cursor** | Currently being dragged |

---

## 🔄 State Synchronization

All component actions update the circuit state:

```typescript
// Move component
onMove(componentId, newX, newY)
→ Updates component.position
→ Circuit state updates
→ All views refresh

// Resize component  
onResize(componentId, scale)
→ Updates component.properties.scale
→ Circuit state updates
→ Visual scale changes

// Remove component
onRemove(componentId)
→ Filters component from array
→ Circuit state updates
→ Code regenerates
→ Canvas re-renders
```

---

## ⌨️ Keyboard Shortcuts (Future Enhancement)

Planned but not yet implemented:
- `Del` - Remove selected component
- `+` / `-` - Increase/decrease size
- Arrow keys - Nudge position
- `Ctrl+Z` - Undo last action

---

## 🎥 Demo Video Additions

When recording demo, showcase:
1. **Drag Arduino** to canvas → position at top
2. **Drag LED** → place below Arduino
3. **Drag Button** → place to right
4. **Right-click LED** → choose "Larger (120%)"
5. **Drag LED again** to move it
6. **Switch to Code View** → circuit persists! ✅
7. **Switch back to Component View** → still there! ✅
8. **Right-click Button** → Remove
9. **Code updates** automatically

---

## ✅ Feature Checklist

- [x] Drag-to-move components
- [x] Right-click context menu
- [x] Resize components (80%, 100%, 120%)
- [x] Remove components via menu
- [x] Visual feedback during drag
- [x] Circuit persistence across view changes
- [x] Cursor changes (grab/grabbing)
- [x] Context menu styling
- [x] State synchronization
- [x] Works in both FOSSEE and Advanced modes

---

**All requested features implemented!** 🎉
