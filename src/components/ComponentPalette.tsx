import React, { useState } from 'react';
import type { ComponentType } from '../types';
import { COMPONENT_LIBRARY, COMPONENT_CATEGORIES } from '../data/componentLibrary';
import './ComponentPalette.css';

interface ComponentPaletteProps {
  onDragStart: (type: ComponentType) => void;
}

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onDragStart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: ComponentType) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(type);
  };

  const filteredComponents = Object.entries(COMPONENT_LIBRARY).filter(([type, meta]) => {
    const matchesCategory = selectedCategory === 'all' || meta.category === selectedCategory;
    const matchesSearch = meta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="component-palette">
      <h3>Components Library</h3>
      
      <div className="palette-search">
        <input
          type="text"
          placeholder="🔍 Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-tabs">
        <button
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {COMPONENT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={selectedCategory === cat.id ? 'active' : ''}
            onClick={() => setSelectedCategory(cat.id)}
            title={cat.name}
          >
            {cat.icon}
          </button>
        ))}
      </div>

      <div className="component-list">
        {filteredComponents.length === 0 ? (
          <div className="no-results">No components found</div>
        ) : (
          filteredComponents.map(([type, meta]) => (
            <div
              key={type}
              className="component-item"
              draggable
              onDragStart={(e) => handleDragStart(e, type as ComponentType)}
              title={meta.description}
            >
              <span className="component-icon">{meta.icon}</span>
              <span className="component-label">{meta.name}</span>
            </div>
          ))
        )}
      </div>

      <div className="palette-info">
        <p>📦 {filteredComponents.length} components</p>
        <p>Drag to canvas to add</p>
      </div>
    </div>
  );
};
