import React from 'react';
import { createUseStyles } from 'react-jss';
import { getPercent } from '../../util/numberUtils';

const BORDER_STYLE = '1px solid rgb(176, 176, 176)';

const baseFilterStyles = {
  position: 'absolute',
  backgroundColor: '#FFFFFF40',
  top: 0,
  height: '100%',
};

const useFilterOverlayStyles = createUseStyles({
  minFilterOverlay: ({ minValue }) => ({
    ...baseFilterStyles,
    left: '0%',
    width: `${minValue}%`,
    borderRight: minValue !== 0 && minValue !== 100 && BORDER_STYLE,
  }),
  maxFilterOverlay: ({ maxValue }) => ({
    ...baseFilterStyles,
    width: `${100 - maxValue}%`,
    right: '0%',
    borderLeft: maxValue !== 0 && maxValue !== 100 && BORDER_STYLE,
  }),
});

const FilterOverlays = ({ filterMin, filterMax, min, max }) => {
  const filterClasses = useFilterOverlayStyles({
    minValue: getPercent(filterMin, min, max),
    maxValue: getPercent(filterMax, min, max),
  });

  return (
    <>
      <div className={filterClasses.minFilterOverlay} />
      <div className={filterClasses.maxFilterOverlay} />
    </>
  );
};

export default FilterOverlays;
