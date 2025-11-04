// src/components/DataCard.jsx

import React from 'react'

function DataCard({ title, value, unit }) {
  return (
    <div className="data-card">
      <h3 className="card-title">{title}</h3>
      <p className="card-value">
        {value}
        <span className="card-unit">{unit}</span>
      </p>
    </div>
  )
}

export default DataCard