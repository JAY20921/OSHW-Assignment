import { useState, useCallback, useEffect, useMemo } from 'react';
import { ComponentPalette } from './components/ComponentPalette';
import { ComponentPaletteSimple } from './components/ComponentPaletteSimple';
import { SimpleCanvas } from './components/SimpleCanvas';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { CodeView } from './components/CodeView';
import { FOSSEECodeGenerator } from './engine/FOSSEECodeGenerator';
import { AdvancedCodeGenerator } from './engine/AdvancedCodeGenerator';
import type { ComponentType, ViewMode, Circuit } from './types';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('component');
  const [isSimulating, setIsSimulating] = useState(false);
  const [circuit, setCircuit] = useState<Circuit>({ components: [], microcontroller: null });
  const [generatedCode, setGeneratedCode] = useState<string>('// Add components to generate code');
  const [mode, setMode] = useState<'fossee' | 'advanced'>('fossee');
  const [ledState, setLedState] = useState(false);

  // Use appropriate code generator based on mode
  const fosseeGenerator = useMemo(() => new FOSSEECodeGenerator(), []);
  const advancedGenerator = useMemo(() => new AdvancedCodeGenerator(), []);

  // Handle circuit changes
  const handleCircuitChange = useCallback((newCircuit: Circuit) => {
    setCircuit(newCircuit);

    // Generate code using the appropriate generator
    const code = mode === 'fossee' 
      ? fosseeGenerator.generate(newCircuit)
      : advancedGenerator.generate(newCircuit);
    
    setGeneratedCode(code);
    console.log('Circuit updated - Code regenerated');
  }, [mode, fosseeGenerator, advancedGenerator]);

  // Handle component interactions
  const handleComponentInteract = useCallback((componentId: string, action: string) => {
    const component = circuit.components.find(c => c.id === componentId);
    
    if (component?.type === 'pushbutton' && isSimulating) {
      if (action === 'button-press') {
        console.log('✓ Button pressed → GPIO HIGH → LED ON');
        setLedState(true);
      } else if (action === 'button-release') {
        console.log('✓ Button released → GPIO LOW → LED OFF');
        setLedState(false);
      }
    }
  }, [circuit.components, isSimulating]);

  // Update LED visual state when ledState changes
  useEffect(() => {
    if (!isSimulating) return;

    const ledComponent = circuit.components.find(c => c.type === 'led-red');
    if (!ledComponent) return;

    // Update LED element directly via DOM
    const ledElements = document.querySelectorAll('wokwi-led');
    ledElements.forEach((el: any) => {
      if (el) {
        el.value = ledState;
        el.color = ledState ? 'red' : '#2d2d2d';
      }
    });
  }, [ledState, isSimulating, circuit]);

  // Handle simulation start
  const handleStart = useCallback(async () => {
    const arduino = circuit.microcontroller;
    
    if (!arduino) {
      alert('⚠️  Please add a microcontroller first!');
      return;
    }

    if (mode === 'fossee') {
      const led = circuit.components.find(c => c.type === 'led-red');
      const button = circuit.components.find(c => c.type === 'pushbutton');

      if (!led || !button) {
        alert('⚠️  FOSSEE Mode requires:\n\n1. Arduino Uno\n2. LED\n3. Push Button');
        return;
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ Starting FOSSEE Arduino Simulation');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📍 LED Pin: ${led.pins?.anode}`);
      console.log(`📍 Button Pin: ${button.pins?.pin}`);
      console.log('🔘 Click the button to control the LED');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ Starting Advanced Mode Simulation');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📦 Components: ${circuit.components.length}`);
      console.log('🎮 Interact with input components');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
    
    setIsSimulating(true);
    setLedState(false);
  }, [circuit, mode]);

  // Handle simulation stop
  const handleStop = useCallback(() => {
    console.log('⏹  Simulation stopped');
    setIsSimulating(false);
    setLedState(false);
  }, []);

  // Handle component drag start
  const handleDragStart = useCallback((type: ComponentType) => {
    console.log('Dragging:', type);
  }, []);

  const arduino = circuit.microcontroller;
  const led = circuit.components.find(c => c.type === 'led-red');
  const button = circuit.components.find(c => c.type === 'pushbutton');
  
  // Different validation for different modes
  const canSimulate = mode === 'fossee' 
    ? !!(arduino && led && button)
    : !!(arduino && circuit.components.length > 1);

  return (
    <div className="app">
      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isSimulating={isSimulating}
        onStart={handleStart}
        onStop={handleStop}
        canSimulate={canSimulate}
      />

      <div className="mode-selector">
        <button 
          className={`mode-btn ${mode === 'fossee' ? 'active' : ''}`}
          onClick={() => setMode('fossee')}
          title="FOSSEE Task: Arduino Uno + LED + Button only"
        >
          📋 FOSSEE Mode
        </button>
        <button 
          className={`mode-btn ${mode === 'advanced' ? 'active' : ''}`}
          onClick={() => setMode('advanced')}
          title="All Wokwi components available"
        >
          🚀 Advanced Mode
        </button>
      </div>

      <div className="app-content">
        {mode === 'fossee' ? (
          <ComponentPaletteSimple onDragStart={handleDragStart} />
        ) : (
          <ComponentPalette onDragStart={handleDragStart} />
        )}

        <div className="main-area">
          {viewMode === 'component' ? (
            mode === 'fossee' ? (
              <SimpleCanvas
                circuit={circuit}
                onCircuitChange={handleCircuitChange}
                onComponentInteract={handleComponentInteract}
                isSimulating={isSimulating}
              />
            ) : (
              <Canvas
                circuit={circuit}
                onCircuitChange={handleCircuitChange}
                onComponentInteract={handleComponentInteract}
                isSimulating={isSimulating}
              />
            )
          ) : (
            <div className="split-view">
              {mode === 'fossee' ? (
                <SimpleCanvas
                  circuit={circuit}
                  onCircuitChange={handleCircuitChange}
                  onComponentInteract={handleComponentInteract}
                  isSimulating={isSimulating}
                />
              ) : (
                <Canvas
                  circuit={circuit}
                  onCircuitChange={handleCircuitChange}
                  onComponentInteract={handleComponentInteract}
                  isSimulating={isSimulating}
                />
              )}
              <CodeView code={generatedCode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
