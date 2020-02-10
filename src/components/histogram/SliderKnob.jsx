import React from 'react';
import { createUseStyles } from 'react-jss';
import { getPercent, bound } from '../../util/numberUtils';

const useKnobStyles = createUseStyles({
  knob: ({ min, max, value, size }) => {
    return {
      position: 'absolute',
      backgroundColor: '#FFFFFFF0',
      borderRadius: '50%',
      border: '1px solid rgb(176, 176, 176)',
      display: 'inline-block',
      top: `calc(100% - ${size / 2}px)`,
      left: `calc(${getPercent(value, min, max)}% - ${size / 2}px)`,
      height: size,
      width: size,
    };
  },
});

const SliderKnob = ({ min, max, value, onDrag }) => {
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    onDrag(e);
  };

  const handleDragEnd = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handleDragStart = () => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      className={
        useKnobStyles({ min, max, value: bound(value, min, max), size: 24 })
          .knob
      }
    />
  );
};

export default SliderKnob;
