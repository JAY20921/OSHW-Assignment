import React from 'react';
import './CodeView.css';

interface CodeViewProps {
  code: string;
}

export const CodeView: React.FC<CodeViewProps> = ({ code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="code-view">
      <div className="code-header">
        <h3>Auto-Generated Arduino Code</h3>
        <button onClick={handleCopy} className="btn-copy">
          📋 Copy Code
        </button>
      </div>
      <pre className="code-content">
        <code>{code}</code>
      </pre>
      <div className="code-info">
        <p>✓ Code updates automatically when pins are changed</p>
        <p>✓ Ready to upload to Arduino Uno</p>
      </div>
    </div>
  );
};
