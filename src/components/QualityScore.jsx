// src/components/QualityScore.jsx

import React from 'react'

function QualityScore({ score, quality }) {
  
  // This will add a CSS class like "quality-Good", "quality-Moderate", etc.
  const qualityClassName = `quality-${quality.toLowerCase()}`;

  return (
    // We add the dynamic class name here
    <div className={`quality-score-card ${qualityClassName}`}>
      <h2 className="quality-score-title">Overall Air Quality</h2>
      <div className="quality-score-value-container">
        <p className="quality-score-value">{score}</p>
        <p className="quality-score-text">{quality}</p>
      </div>
      <div className="quality-score-info">
        <p>Live data from your BME680 sensor.</p>
      </div>
    </div>
  )
}


export default QualityScore