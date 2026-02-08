import React, { useState, useCallback } from 'react';
import type { Circuit, ComponentConfig, ComponentType } from '../types';
import { UniversalComponent } from './UniversalComponent';
import { COMPONENT_LIBRARY } from '../data/componentLibrary';
import './Canvas.css';

interface CanvasProps {
  onCircuitChange: (circuit: Circuit) => void;
  onComponentInteract: (componentId: string, action: string) => void;
  isSimulating: boolean;
  circuit?: Circuit; // Allow external circuit state
}

export const Canvas: React.FC<CanvasProps> = ({
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

      const componentType = e.dataTransfer.getData('componentType') as ComponentType;
      if (!componentType) return;

      const metadata = COMPONENT_LIBRARY[componentType];

      // Check if trying to add a second microcontroller
      if (metadata.category === 'microcontroller' && circuit.microcontroller) {
        alert('Only one microcontroller allowed! Remove the existing one first.');
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(20, e.clientX - rect.left - 100);
      const y = Math.max(20, e.clientY - rect.top - 50);

      // Auto-assign default pins
      const defaultPins = metadata.defaultPins || {};
      const pins: { [key: string]: number | string } = {};
      
      Object.entries(defaultPins).forEach(([pinName, pinValue]) => {
        pins[pinName] = pinValue;
      });

      const newComponent: ComponentConfig = {
        id: `${componentType}-${Date.now()}`,
        type: componentType,
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

      console.log(`${metadata.name} added at position (${x}, ${y})`);
    },
    [circuit, onCircuitChange]
  );

  const handlePinChange = useCallback(
    (componentId: string, pinName: string, newPin: number | string) => {
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
      
      console.log(`Pin ${pinName} of ${componentId} changed to ${newPin}`);
    },
    [circuit, onCircuitChange]
  );

  const handleRemove = useCallback(
    (componentId: string) => {
      const updatedComponents = circuit.components.filter((c) => c.id !== componentId);
      const newCircuit = {
        components: updatedComponents,
        microcontroller: circuit.microcontroller?.id === componentId ? null : circuit.microcontroller,
      };
      setCircuit(newCircuit);
      onCircuitChange(newCircuit);
    },
    [circuit, onCircuitChange]
  );

  const handleMove = useCallback(
    (componentId: string, x: number, y: number) => {
      const updatedComponents = circuit.components.map((c) =>
        c.id === componentId ? { ...c, position: { x, y } } : c
      );
      const newCircuit = {
        ...circuit,
        components: updatedComponents,
      };
      setCircuit(newCircuit);
      onCircuitChange(newCircuit);
    },
    [circuit, onCircuitChange]
  );

  const handleResize = useCallback(
    (componentId: string, scale: number) => {
      const updatedComponents = circuit.components.map((c) =>
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
    },
    [circuit, onCircuitChange]
  );

  const hasMicrocontroller = circuit.microcontroller !== null;
  const hasComponents = circuit.components.length > 1; // More than just microcontroller

  return (
    <div
      className={`canvas ${dragOverlay ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {circuit.components.length === 0 && (
        <div className="canvas-placeholder">
          <h3>🚀 Start Building Your Circuit</h3>
          <p>Drag a microcontroller from the left panel</p>
          <p className="hint">Then add sensors, LEDs, buttons, and more!</p>
        </div>
      )}

      {circuit.components.map((component) => (
        <UniversalComponent
          key={component.id}
          component={component}
          onPinChange={handlePinChange}
          onInteract={onComponentInteract}
          onMove={handleMove}
          onResize={handleResize}
          onRemove={handleRemove}
          isSimulating={isSimulating}
        />
      ))}

      {dragOverlay && (
        <div className="drop-indicator">
          Drop component here
        </div>
      )}

      {hasMicrocontroller && hasComponents && (
        <div className="circuit-info">
          <h4>📊 Circuit Status</h4>
          <p>🔲 Microcontroller: {COMPONENT_LIBRARY[circuit.microcontroller!.type].name}</p>
          <p>🔧 Components: {circuit.components.length - 1}</p>
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
