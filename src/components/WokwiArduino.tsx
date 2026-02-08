import React, { useEffect, useRef } from 'react';
import '@wokwi/elements';
import type { Position } from '../types';
import './WokwiComponents.css';

interface WokwiArduinoProps {
  position: Position;
}

export const WokwiArduino: React.FC<WokwiArduinoProps> = ({ position }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arduinoRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Arduino element if needed
    if (arduinoRef.current) {
      console.log('Arduino Uno initialized at position:', position);
    }
  }, [position]);

  return (
    <div
      className="wokwi-component arduino-component"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    >
      <div className="component-label">Arduino Uno</div>
      <wokwi-arduino-uno ref={arduinoRef}></wokwi-arduino-uno>
    </div>
  );
};
