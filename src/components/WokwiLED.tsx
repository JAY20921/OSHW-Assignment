import React, { useEffect, useRef } from 'react';
import '@wokwi/elements';
import type { Position } from '../types';
import './WokwiComponents.css';

interface WokwiLEDProps {
  position: Position;
  pin: number;
  availablePins: number[];
  onPinChange: (pin: number) => void;
  state?: boolean;
}

export const WokwiLED: React.FC<WokwiLEDProps> = ({
  position,
  pin,
  availablePins,
  onPinChange,
  state = false,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ledRef = useRef<any>(null);

  useEffect(() => {
    if (ledRef.current) {
      ledRef.current.value = state;
      ledRef.current.color = state ? 'red' : '#2d2d2d';
    }
  }, [state]);

  return (
    <div
      className="wokwi-component led-component"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    >
      <div className="component-header">
        <span className="component-label">LED</span>
        <select
          className="pin-selector"
          value={pin}
          onChange={(e) => onPinChange(Number(e.target.value))}
        >
          {availablePins.map((p) => (
            <option key={p} value={p}>
              Pin {p}
            </option>
          ))}
        </select>
      </div>
      <div className="led-container">
        <wokwi-led ref={ledRef} color={state ? 'red' : '#2d2d2d'}></wokwi-led>
        <div className="led-status">{state ? 'ON (HIGH)' : 'OFF (LOW)'}</div>
      </div>
    </div>
  );
};
