import React, { useState } from 'react';
import './SliderColors.css';


function SliderColors({values}) {
    const {myColors} = values
    const [colors, setColors] = useState(myColors)
    const [selectedIdx, setSelectedIdx] = useState(0);

  const handleCircleClick = (idx) => {
    setSelectedIdx(idx);
  }

  const circles = colors.map((color, idx) => (
    <div
      key={idx}
      className={`circle ${selectedIdx === idx ? 'selected' : ''}`}
      style={{ backgroundColor: `#${color.hex_code}` }}
      onClick={() => handleCircleClick(idx)}
    />
  ));

  return (
    <div className="slider">
      {circles}
    </div>
  );
}

export default SliderColors;
