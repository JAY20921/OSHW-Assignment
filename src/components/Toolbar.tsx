import React from 'react';
import type { ViewMode } from '../types';
import './Toolbar.css';

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isSimulating: boolean;
  onStart: () => void;
  onStop: () => void;
  canSimulate: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  viewMode,
  onViewModeChange,
  isSimulating,
  onStart,
  onStop,
  canSimulate,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h2>Arduino Simulator</h2>
      </div>

      <div className="toolbar-section">
        <div className="view-toggle">
          <button
            className={viewMode === 'component' ? 'active' : ''}
            onClick={() => onViewModeChange('component')}
          >
            Circuit View
          </button>
          <button
            className={viewMode === 'code' ? 'active' : ''}
            onClick={() => onViewModeChange('code')}
          >
            Code View
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <div className="simulation-controls">
          {!isSimulating ? (
            <button
              className="btn-start"
              onClick={onStart}
              disabled={!canSimulate}
              title={!canSimulate ? 'Add Arduino, LED, and Button to start' : 'Start simulation'}
            >
              ▶ Start Simulation
            </button>
          ) : (
            <button className="btn-stop" onClick={onStop}>
              ⏹ Stop Simulation
            </button>
          )}
          {isSimulating && (
            <span className="simulation-indicator">● Simulating</span>
          )}
        </div>
      </div>
    </div>
  );
};
