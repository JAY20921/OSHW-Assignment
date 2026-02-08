import { useState, useCallback } from 'react';
import { ComponentPalette } from './components/ComponentPalette';
import { ComponentPaletteSimple } from './components/ComponentPaletteSimple';
import { SimpleCanvas } from './components/SimpleCanvas';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { CodeView } from './components/CodeView';
import { FOSSEECodeGenerator } from './engine/FOSSEECodeGenerator';
import type { ComponentType, ViewMode, Circuit } from './types';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('component');
  const [isSimulating, setIsSimulating] = useState(false);
  const [circuit, setCircuit] = useState<Circuit>({ components: [], microcontroller: null });
  const [generatedCode, setGeneratedCode] = useState<string>('// Add Arduino Uno, LED, and Push Button to generate code');
  const [mode, setMode] = useState<'fossee' | 'advanced'>('fossee'); // Toggle between modes
  const [ledState, setLedState] = useState(false);

  const codeGenerator = new FOSSEECodeGenerator();

  // Handle circuit changes
  const handleCircuitChange = useCallback((newCircuit: Circuit) => {
    setCircuit(newCircuit);

    // FOSSEE Task: Generate code for LED + Button circuit
    const code = codeGenerator.generate(newCircuit);
    setGeneratedCode(code);
    console.log('Circuit updated - Code regenerated');
  }, []);

  // Handle component interactions
  const handleComponentInteract = useCallback((componentId: string, action: string, value: any) => {
    const component = circuit.components.find(c => c.id === componentId);
    
    if (component?.type === 'pushbutton' && isSimulating) {
      if (action === 'button-press') {
        console.log('Button pressed → GPIO HIGH → LED ON');
        setLedState(true);
      } else if (action === 'button-release') {
        console.log('Button released → GPIO LOW → LED OFF');
        setLedState(false);
      }
    }
  }, [circuit, isSimulating]);

  // Update LED state in circuit
  const updateLEDState = useCallback(() => {
    const updatedComponents = circuit.components.map(comp => {
      if (comp.type === 'led-red') {
        return {
          ...comp,
          properties: {
            ...comp.properties,
            value: ledState
          }
        };
      }
      return comp;
    });

    if (JSON.stringify(updatedComponents) !== JSON.stringify(circuit.components)) {
      setCircuit({
        ...circuit,
        components: updatedComponents
      });
    }
  }, [circuit, ledState]);

  // Update LED when state changes
  React.useEffect(() => {
    if (isSimulating) {
      updateLEDState();
    }
  }, [ledState, isSimulating, updateLEDState]);

  // Handle simulation start
  const handleStart = useCallback(async () => {
    const arduino = circuit.microcontroller;
    const led = circuit.components.find(c => c.type === 'led-red');
    const button = circuit.components.find(c => c.type === 'pushbutton');

    if (!arduino || !led || !button) {
      alert('Please add Arduino Uno, LED, and Push Button first!');
      return;
    }

    console.log('✅ Starting simulation...');
    console.log('Circuit ready: Arduino + LED + Button');
    console.log(`LED on Pin ${led.pins?.anode}, Button on Pin ${button.pins?.pin}`);
    setIsSimulating(true);
    setLedState(false);
  }, [circuit]);

  // Handle simulation stop
  const handleStop = useCallback(() => {
    console.log('⏹ Stopping simulation...');
    setIsSimulating(false);
    setLedState(false);
  }, []);

  // Handle component drag start
  const handleDragStart = useCallback((type: ComponentType) => {
    console.log('Dragging component:', type);
  }, []);

  const arduino = circuit.microcontroller;
  const led = circuit.components.find(c => c.type === 'led-red');
  const button = circuit.components.find(c => c.type === 'pushbutton');
  const canSimulate = arduino && led && button;

  return (
    <div className="app">
      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isSimulating={isSimulating}
        onStart={handleStart}
        onStop={handleStop}
        canSimulate={!!canSimulate}
      />

      <div className="app-header-info">
        <button 
          className={`mode-toggle ${mode === 'fossee' ? 'active' : ''}`}
          onClick={() => setMode('fossee')}
        >
          📋 FOSSEE Task Mode (Required Components Only)
        </button>
        <button 
          className={`mode-toggle ${mode === 'advanced' ? 'active' : ''}`}
          onClick={() => setMode('advanced')}
        >
          🚀 Advanced Mode (All Components)
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
                onCircuitChange={handleCircuitChange}
                onComponentInteract={handleComponentInteract}
                isSimulating={isSimulating}
              />
            ) : (
              <Canvas
                onCircuitChange={handleCircuitChange}
                onComponentInteract={handleComponentInteract}
                isSimulating={isSimulating}
              />
            )
          ) : (
            <div className="split-view">
              {mode === 'fossee' ? (
                <SimpleCanvas
                  onCircuitChange={handleCircuitChange}
                  onComponentInteract={handleComponentInteract}
                  isSimulating={isSimulating}
                />
              ) : (
                <Canvas
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
