import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  barContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'relative',
  },
});

const useBarStyles = createUseStyles({
  bar: barHeight => ({
    backgroundColor: '#999999',
    flex: '1 0 0',
    boxSizing: 'border-box',
    marginLeft: '0.2%',
    marginRight: '0.2%',
    height: barHeight,
  }),
});

const getBarHeight = (bar, scaleFactor) => {
  let barHeight;
  if (bar === 0) {
    barHeight = 0;
  } else {
    const baseBarHeightPercent = bar / scaleFactor;

    // give a slight boost to non-zero but small bars to make sure they show up on screen
    const baseBarHeightPercentScaled = Math.min(1, baseBarHeightPercent + 0.05);
    barHeight = `${baseBarHeightPercentScaled * 90}%`;
  }

  return barHeight;
};

const Bar = ({ bar, scaleFactor }) => {
  const barClasses = useBarStyles(getBarHeight(bar, scaleFactor));
  return <div className={barClasses.bar} />;
};

const BarContainer = ({ histogram }, ref) => {
  const scaleFactor = Math.max(...histogram);
  return (
    <div className={useStyles().barContainer} ref={ref}>
      {histogram.map((bar, index) => (
        <Bar key={index} bar={bar} scaleFactor={scaleFactor} />
      ))}
    </div>
  );
};

export default React.forwardRef(BarContainer);
