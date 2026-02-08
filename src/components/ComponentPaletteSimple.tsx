import React from 'react';
import type { ComponentType } from '../types';
import './ComponentPalette.css';

interface ComponentPaletteProps {
  onDragStart: (type: ComponentType) => void;
}

export const ComponentPaletteSimple: React.FC<ComponentPaletteProps> = ({ onDragStart }) => {
  // FOSSEE Task: Only Arduino Uno, LED, and Push Button
  const requiredComponents = [
    { type: 'arduino-uno' as ComponentType, label: 'Arduino Uno', icon: '🔲' },
    { type: 'led-red' as ComponentType, label: 'LED', icon: '💡' },
    { type: 'pushbutton' as ComponentType, label: 'Push Button', icon: '🔘' },
  ];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: ComponentType) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(type);
  };

  return (
    <div className="component-palette">
      <h3>Components</h3>
      
      <div className="component-list">
        {requiredComponents.map((component) => (
          <div
            key={component.type}
            className="component-item"
            draggable
            onDragStart={(e) => handleDragStart(e, component.type)}
            title={component.label}
          >
            <span className="component-icon">{component.icon}</span>
            <span className="component-label">{component.label}</span>
          </div>
        ))}
      </div>

      <div className="palette-info">
        <p>📦 {requiredComponents.length} components</p>
        <p>Drag to canvas to add</p>
      </div>
    </div>
  );
};
