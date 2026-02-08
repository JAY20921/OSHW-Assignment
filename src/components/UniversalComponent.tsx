import React, { useEffect, useRef } from 'react';
import '@wokwi/elements';
import type { ComponentConfig } from '../types';
import { COMPONENT_LIBRARY } from '../data/componentLibrary';
import './UniversalComponent.css';

interface UniversalComponentProps {
  component: ComponentConfig;
  onPinChange?: (componentId: string, pinName: string, newPin: number | string) => void;
  onInteract?: (componentId: string, action: string) => void;
  onMove?: (componentId: string, x: number, y: number) => void;
  onResize?: (componentId: string, scale: number) => void;
  onRemove?: (componentId: string) => void;
  isSimulating?: boolean;
}

export const UniversalComponent: React.FC<UniversalComponentProps> = ({
  component,
  onPinChange,
  onInteract,
  onMove,
  onResize,
  onRemove,
  isSimulating = false
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elementRef = useRef<any>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = React.useState(false);
  const [scale, setScale] = React.useState(component.properties?.scale || 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const metadata = COMPONENT_LIBRARY[component.type];

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isSimulating) return;

    // Set up event listeners for interactive components
    const handleInteraction = (e: Event) => {
      if (onInteract) {
        onInteract(component.id, e.type);
      }
    };

    // Add listeners based on component type
    if (component.type === 'pushbutton') {
      element.addEventListener('button-press', handleInteraction);
      element.addEventListener('button-release', handleInteraction);
    } else if (component.type === 'potentiometer') {
      element.addEventListener('value-changed', handleInteraction);
    } else if (component.type === 'slide-switch') {
      element.addEventListener('change', handleInteraction);
    }

    return () => {
      if (element) {
        element.removeEventListener('button-press', handleInteraction);
        element.removeEventListener('button-release', handleInteraction);
        element.removeEventListener('value-changed', handleInteraction);
        element.removeEventListener('change', handleInteraction);
      }
    };
  }, [isSimulating, component.id, component.type, onInteract]);
  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) return; // Ignore right-click
    if ((e.target as HTMLElement).tagName === 'SELECT') return; // Don't drag when using dropdowns
    
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    e.preventDefault();
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (onMove && containerRef.current?.parentElement) {
        const parentRect = containerRef.current.parentElement.getBoundingClientRect();
        const newX = Math.max(0, e.clientX - parentRect.left - dragOffset.x);
        const newY = Math.max(0, e.clientY - parentRect.top - dragOffset.y);
        onMove(component.id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, component.id, onMove]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(component.id);
    }
    setShowMenu(false);
  };

  const handleResize = (newScale: number) => {
    setScale(newScale);
    if (onResize) {
      onResize(component.id, newScale);
    }
    setShowMenu(false);
  };
  const renderWokwiElement = () => {
    const props: any = { ref: elementRef };

    // Add component-specific props
    if (component.properties) {
      Object.assign(props, component.properties);
    }

    // Map component type to wokwi element
    const elementMap: Record<string, string> = {
      'arduino-uno': 'wokwi-arduino-uno',
      'arduino-mega': 'wokwi-arduino-mega',
      'arduino-nano': 'wokwi-arduino-nano',
      'esp32': 'wokwi-esp32-devkit-v1',
      'pi-pico': 'wokwi-pi-pico',
      'led-red': 'wokwi-led',
      'led-green': 'wokwi-led',
      'led-blue': 'wokwi-led',
      'led-yellow': 'wokwi-led',
      'led-white': 'wokwi-led',
      'rgb-led': 'wokwi-rgb-led',
      'pushbutton': 'wokwi-pushbutton',
      'slide-switch': 'wokwi-slide-switch',
      'dip-switch-8': 'wokwi-dip-switch-8',
      'potentiometer': 'wokwi-potentiometer',
      'lcd1602': 'wokwi-lcd1602',
      '7segment': 'wokwi-7segment',
      'ssd1306': 'wokwi-ssd1306',
      'dht22': 'wokwi-dht22',
      'hc-sr04': 'wokwi-hc-sr04',
      'pir-sensor': 'wokwi-pir-motion-sensor',
      'membrane-keypad': 'wokwi-membrane-keypad',
      'servo': 'wokwi-servo',
      'buzzer': 'wokwi-buzzer',
      'relay-module': 'wokwi-relay-module',
      'resistor': 'wokwi-resistor',
      'neopixels': 'wokwi-neopixel'
    };

    const wokwiElement = elementMap[component.type];

    // Set color for LEDs
    if (component.type.startsWith('led-')) {
      const colorMap: Record<string, string> = {
        'led-red': 'red',
        'led-green': 'green',
        'led-blue': 'blue',
        'led-yellow': 'yellow',
        'led-white': 'white'
      };
      props.color = colorMap[component.type];
    }

    return React.createElement(wokwiElement, props);
  };

  const renderPinSelectors = () => {
    if (!component.pins || metadata.category === 'microcontroller') return null;

    return (
      <div className="pin-selectors">
        {Object.entries(component.pins).map(([pinName, pinValue]) => {
          if (pinValue === 0) return null; // Skip GND

          return (
            <div key={pinName} className="pin-selector-row">
              <label>{pinName.toUpperCase()}</label>
              <select
                value={pinValue}
                onChange={(e) => {
                  if (onPinChange) {
                    const newValue = e.target.value.startsWith('A') 
                      ? e.target.value 
                      : Number(e.target.value);
                    onPinChange(component.id, pinName, newValue);
                  }
                }}
                className="pin-select"
              >
                {pinName === 'signal' && component.type === 'potentiometer' ? (
                  <>
                    <option value="A0">A0</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                  </>
                ) : (
                  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(pin => (
                    <option key={pin} value={pin}>D{pin}</option>
                  ))
                )}
              </select>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`universal-component ${metadata.category} ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'absolute',
        left: component.position.x,
        top: component.position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        zIndex: isDragging ? 1000 : 1
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
    >
      <div className="component-header">
        <span className="component-name">{metadata.name}</span>
        {metadata.category !== 'microcontroller' && (
          <span className="component-category">{metadata.category}</span>
        )}
      </div>
      
      <div className="component-body">
        {renderWokwiElement()}
      </div>

      {renderPinSelectors()}

      {!isSimulating && metadata.category !== 'microcontroller' && (
        <div className="component-status">Start simulation to test</div>
      )}

      {/* Context Menu */}
      {showMenu && (
        <div className="context-menu" onClick={(e) => e.stopPropagation()}>
          <button className="menu-item" onClick={handleRemove}>
            🗑️ Remove
          </button>
          <button className="menu-item" onClick={() => handleResize(0.8)}>
            🔽 Smaller (80%)
          </button>
          <button className="menu-item" onClick={() => handleResize(1.0)}>
            ⚖️ Normal (100%)
          </button>
          <button className="menu-item" onClick={() => handleResize(1.2)}>
            🔼 Larger (120%)
          </button>
          <button className="menu-item" onClick={() => setShowMenu(false)}>
            ❌ Close
          </button>
        </div>
      )}
    </div>
  );
};
