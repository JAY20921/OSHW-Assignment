import React, { useEffect, useRef } from 'react';
import '@wokwi/elements';
import type { Position } from '../types';
import './WokwiComponents.css';

interface WokwiButtonProps {
  position: Position;
  pin: number;
  availablePins: number[];
  onPinChange: (pin: number) => void;
  onPress: () => void;
  onRelease: () => void;
  isSimulating: boolean;
}

export const WokwiButton: React.FC<WokwiButtonProps> = ({
  position,
  pin,
  availablePins,
  onPinChange,
  onPress,
  onRelease,
  isSimulating,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || !isSimulating) return;

    const handleDown = () => {
      console.log('Button pressed');
      onPress();
    };

    const handleUp = () => {
      console.log('Button released');
      onRelease();
    };

    button.addEventListener('button-press', handleDown);
    button.addEventListener('button-release', handleUp);

    return () => {
      button.removeEventListener('button-press', handleDown);
      button.removeEventListener('button-release', handleUp);
    };
  }, [isSimulating, onPress, onRelease]);

  return (
    <div
      className="wokwi-component button-component"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    >
      <div className="component-header">
        <span className="component-label">Push Button</span>
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
      <div className="button-container">
        <wokwi-pushbutton
          ref={buttonRef}
          color="red"
        ></wokwi-pushbutton>
        <div className="button-instruction">
          {isSimulating ? 'Click to press' : 'Start simulation to test'}
        </div>
      </div>
    </div>
  );
};
