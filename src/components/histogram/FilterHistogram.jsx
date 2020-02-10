import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import BarContainer from './BarContainer';
import { bound } from '../../util/numberUtils';
import SliderKnob from './SliderKnob';
import FilterOverlays from './FilterOverlays';
import {
  LARGE_BREAKPOINT,
  MEDIUM_BREAKPOINT,
  SMALL_BREAKPOINT,
} from '../../util/jssConstants';

const MAX_KNOB_CLOSENESS = 15;

const useStyles = createUseStyles({
  mainContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  [SMALL_BREAKPOINT]: {
    mainContainer: {
      width: '100%',
    },
  },

  [MEDIUM_BREAKPOINT]: {
    mainContainer: {
      width: '50%',
    },
  },

  [LARGE_BREAKPOINT]: {
    mainContainer: {
      width: '50%',
    },
  },
});

/**
 * We don't want the min knob to go past the max knob, and vice versa,
 * this bounds currentKnob so the two knobs never go more
 * than MAX_KNOB_CLOSENESS points or closer to one another.
 * @param {*} currentKnobValue the position of the knob the user is dragging (in histogram x values)
 * @param {*} otherKnobValue the position of the other knob (in histogram x values)
 * @param {*} min the minimum value of the histogram
 * @param {*} max the maximum value of the histogram
 * @param {*} isMinKnob true if the knob being dragged is the minimum knob, false if it's the max knob.
 *
 * return the new, bounded currentKnob value in histogram x coordinates.
 */
const getBoundedValue = (
  currentKnobValue,
  otherKnobValue,
  min,
  max,
  isMinKnob
) => {
  const minValue = isMinKnob ? min : otherKnobValue + MAX_KNOB_CLOSENESS;
  const maxValue = isMinKnob ? otherKnobValue - MAX_KNOB_CLOSENESS : max;

  return bound(currentKnobValue, minValue, maxValue);
};

/**
 * Return the histogram value that the current mouse location corresponds to.
 *
 * @param e The MouseEvent
 * @param boundingBox the bounding box of the histogram, where left = min and right = max.
 * @param min the minimum value of the histogram
 * @param max the maximum value of the histogram
 */
const valueFromPosition = (e, boundingBox, min, max) => {
  const x = e.clientX;

  const boundStartX = boundingBox.left;

  const posX = x - boundStartX;
  const percent = posX / boundingBox.width;

  const valueUnbounded = Math.floor(percent * (max - min)) + min;

  return bound(valueUnbounded, min, max);
};

/**
 * We need this to be a separate functional component because the
 * createUseStyles hook cannot be used in class components.
 */
const MainHistogramContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <div
      onMouseDown={e => e.preventDefault()}
      onMouseUp={e => e.preventDefault()}
      onTouchStart={e => e.preventDefault()}
      onTouchEnd={e => e.preventDefault()}
      className={classes.mainContainer}
    >
      {children}
    </div>
  );
};

export class FilterHistogram extends Component {
  constructor(props) {
    super(props);

    this.histogramRef = React.createRef();
  }

  handleDrag = (e, isMinKnob) => {
    const {
      filterMax,
      filterMin,
      max,
      min,
      onMaxChanged,
      onMinChanged,
    } = this.props;

    const histRect = this.histogramRef.current.getBoundingClientRect();
    const newValue = getBoundedValue(
      valueFromPosition(e, histRect, min, max),
      isMinKnob ? filterMax : filterMin,
      min,
      max,
      isMinKnob
    );

    isMinKnob ? onMinChanged(newValue) : onMaxChanged(newValue);
  };

  render() {
    const { filterMax, filterMin, histogram, max, min } = this.props;

    return (
      <MainHistogramContainer>
        <BarContainer histogram={histogram} ref={this.histogramRef} />
        <FilterOverlays
          filterMin={filterMin}
          filterMax={filterMax}
          min={min}
          max={max}
        />
        <SliderKnob
          min={min}
          max={max}
          value={filterMin}
          onDrag={e => this.handleDrag(e, true)}
        />
        <SliderKnob
          min={min}
          max={max}
          value={filterMax}
          onDrag={e => this.handleDrag(e, false)}
        />
      </MainHistogramContainer>
    );
  }
}

FilterHistogram.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  histogram: PropTypes.arrayOf(PropTypes.number).isRequired,
  onMinChanged: PropTypes.func.isRequired,
  onMaxChanged: PropTypes.func.isRequired,
};

export default FilterHistogram;
