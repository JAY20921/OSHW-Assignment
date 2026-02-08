import React, { useState, useCallback } from 'react';
import type { Circuit, ComponentConfig } from '../types';
import { UniversalComponent } from './UniversalComponent';
import { COMPONENT_LIBRARY } from '../data/componentLibrary';
import './Canvas.css';

interface SimpleCanvasProps {
  onCircuitChange: (circuit: Circuit) => void;
  onComponentInteract: (componentId: string, action: string) => void;
  isSimulating: boolean;
  circuit?: Circuit; // Allow external circuit state
}

export const SimpleCanvas: React.FC<SimpleCanvasProps> = ({
  onCircuitChange,
  onComponentInteract,
  isSimulating,
  circuit: externalCircuit
}) => {
  const [circuit, setCircuit] = useState<Circuit>(
    externalCircuit || { components: [], microcontroller: null }
  );

  // Update internal state when external circuit changes
  React.useEffect(() => {
    if (externalCircuit) {
      setCircuit(externalCircuit);
    }
  }, [externalCircuit]);

  const [dragOverlay, setDragOverlay] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverlay(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverlay(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOverlay(false);

      const componentType = e.dataTransfer.getData('componentType');
      if (!componentType) return;

      const metadata = COMPONENT_LIBRARY[componentType as keyof typeof COMPONENT_LIBRARY];

      // FOSSEE Task: Only one of each component type
      const existingComponent = circuit.components.find(c => c.type === componentType);
      if (existingComponent) {
        alert(`${metadata.name} already added! Only one of each component allowed.`);
        return;
      }

      // Check if trying to add a second microcontroller
      if (metadata.category === 'microcontroller' && circuit.microcontroller) {
        alert('Only one Arduino Uno allowed!');
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(20, e.clientX - rect.left - 100);
      const y = Math.max(20, e.clientY - rect.top - 50);

      // FOSSEE Task: Default pins - LED → 10, Button → 2
      let pins: { [key: string]: number } = {};
      
      if (componentType === 'led-red') {
        pins = { anode: 10, cathode: 0 };
      } else if (componentType === 'pushbutton') {
        pins = { pin: 2, gnd: 0 };
      }

      const newComponent: ComponentConfig = {
        id: `${componentType}-${Date.now()}`,
        type: componentType as any,
        position: { x, y },
        pins: Object.keys(pins).length > 0 ? pins : undefined,
        properties: {}
      };

      const newCircuit: Circuit = {
        components: [...circuit.components, newComponent],
        microcontroller: metadata.category === 'microcontroller' 
          ? newComponent 
          : circuit.microcontroller,
      };

      setCircuit(newCircuit);
      onCircuitChange(newCircuit);

      console.log(`${metadata.name} added with default pins:`, pins);
    },
    [circuit, onCircuitChange]
  );

  const handlePinChange = useCallback(
    (componentId: string, pinName: string, newPin: number | string) => {
      // FOSSEE Task: Pin conflict detection
      const component = circuit.components.find(c => c.id === componentId);
      if (!component) return;

      // Check if pin is already used by another component
      const pinInUse = circuit.components.some(c => {
        if (c.id === componentId || !c.pins) return false;
        return Object.values(c.pins).includes(newPin as number);
      });

      if (pinInUse) {
        alert(`Pin ${newPin} is already in use! Please select a different pin.`);
        return;
      }

      const updatedComponents = circuit.components.map(comp => {
        if (comp.id === componentId && comp.pins) {
          return {
            ...comp,
            pins: {
              ...comp.pins,
              [pinName]: newPin
            }
          };
        }
        return comp;
      });

      const newCircuit: Circuit = {
        ...circuit,
        components: updatedComponents,
        microcontroller: circuit.microcontroller?.id === componentId 
          ? updatedComponents.find(c => c.id === componentId) || circuit.microcontroller
          : circuit.microcontroller
      };

      setCircuit(newCircuit);
      onCircuitChange(newCircuit);
      
      console.log(`Pin ${pinName} changed to ${newPin} - Code will regenerate`);
    },
    [circuit, onCircuitChange]
  );

  const handleRemove = useCallback((componentId: string) => {
    const updatedComponents = circuit.components.filter(c => c.id !== componentId);
    const newCircuit = {
      components: updatedComponents,
      microcontroller: circuit.microcontroller?.id === componentId ? null : circuit.microcontroller
    };
    setCircuit(newCircuit);
    onCircuitChange(newCircuit);
  }, [circuit, onCircuitChange]);

  const handleMove = useCallback((componentId: string, x: number, y: number) => {
    const updatedComponents = circuit.components.map(c =>
      c.id === componentId ? { ...c, position: { x, y } } : c
    );
    const newCircuit = {
      ...circuit,
      components: updatedComponents,
    };
    setCircuit(newCircuit);
    onCircuitChange(newCircuit);
  }, [circuit, onCircuitChange]);

  const handleResize = useCallback((componentId: string, scale: number) => {
    const updatedComponents = circuit.components.map(c =>
      c.id === componentId 
        ? { ...c, properties: { ...c.properties, scale } } 
        : c
    );
    const newCircuit = {
      ...circuit,
      components: updatedComponents,
    };
    setCircuit(newCircuit);
    onCircuitChange(newCircuit);
  }, [circuit, onCircuitChange]);

  const arduino = circuit.microcontroller;
  const led = circuit.components.find(c => c.type === 'led-red');
  const button = circuit.components.find(c => c.type === 'pushbutton');
  const hasAllComponents = arduino && led && button;

  return (
    <div
      className={`canvas ${dragOverlay ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {circuit.components.length === 0 && (
        <div className="canvas-placeholder">
          <h3>🚀 FOSSEE OSHW Arduino Simulator</h3>
          <p>Step 1: Drag Arduino Uno from left panel</p>
          <p>Step 2: Drag LED to canvas</p>
          <p>Step 3: Drag Push Button to canvas</p>
        </div>
      )}

      {circuit.components.map((component) => (
        <UniversalComponent
          key={component.id}
          component={component}
          onPinChange={handlePinChange}
          onInteract={onComponentInteract}          onMove={handleMove}
          onResize={handleResize}
          onRemove={handleRemove}          isSimulating={isSimulating}
        />
      ))}

      {dragOverlay && (
        <div className="drop-indicator">
          Drop component here
        </div>
      )}

      {hasAllComponents && (
        <div className="circuit-info">
          <h4>✅ Circuit Complete</h4>
          <p>🔲 Arduino Uno: Ready</p>
          <p>💡 LED → Pin {led.pins?.anode || 10}</p>
          <p>🔘 Button → Pin {button.pins?.pin || 2}</p>
          {isSimulating ? (
            <p className="status-running">● Simulation Running</p>
          ) : (
            <p className="status-ready">✓ Ready to Simulate</p>
          )}
        </div>
      )}
    </div>
  );
};
