import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_TYPE } from '../util/Filters';
import debounce from 'lodash.debounce';
import FilterHistogram from './histogram/FilterHistogram';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  panelContainer: {
    backgroundColor: 'moccasin',
    padding: '20px',
    marginBottom: '20px',
  },

  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '30px',
  },

  smallHorizontalPadding: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },

  verticallyCenteredWithPadding: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '5px',
    paddingRight: '5px',
  },
});

const StyledInput = ({
  labelText,
  showLabelTextAfterChildren = false,
  children,
}) => {
  const classes = useStyles();
  return (
    <label className={classes.itemContainer}>
      {!showLabelTextAfterChildren && labelText}
      <div className={classes.verticallyCenteredWithPadding}>{children}</div>
      {showLabelTextAfterChildren && labelText}
    </label>
  );
};

const NumericFilter = ({ filter, histogramData, onFilterChanged }) => {
  if (!histogramData) {
    return null;
  }

  const updateFilter = (min, max, enabled) => {
    onFilterChanged({
      ...filter,
      enabled,
      min,
      max,
    });
  };

  const updateEnabled = enabled =>
    updateFilter(filter.min, filter.max, enabled);
  const updateMin = min => updateFilter(min, filter.max, filter.enabled);
  const updateMax = max => updateFilter(filter.min, max, filter.enabled);

  const currentMin = Math.max(histogramData.min, filter.min);
  const currentMax = Math.min(histogramData.max, filter.max);

  return (
    <div>
      <StyledInput labelText={`Filter by minimum ${filter.column.phrase}`}>
        <input
          name={`filterBy${filter.column.key}Enabled `}
          type="checkbox"
          checked={filter.enabled}
          onChange={() => updateEnabled(!filter.enabled)}
        />
      </StyledInput>
      {filter.enabled && (
        <>
          <FilterHistogram
            min={histogramData.min}
            max={histogramData.max}
            filterMin={currentMin}
            filterMax={currentMax}
            histogram={histogramData.histogram}
            onMinChanged={updateMin}
            onMaxChanged={updateMax}
          />
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            {`Min: ${currentMin}  Max: ${currentMax}`}
          </div>
        </>
      )}
    </div>
  );
};

const StringFilter = ({ filter, onFilterChanged }) => {
  return (
    <StyledInput labelText={`Filter by ${filter.column.phrase}`}>
      <input
        name={`filterBy${filter.column.key}Enabled `}
        type="text"
        value={filter.searchVal}
        onChange={e =>
          onFilterChanged({
            ...filter,
            enabled: !!e.target.value,
            searchVal: e.target.value,
          })
        }
      />
    </StyledInput>
  );
};

const Filter = ({ filter, histogramData, onFilterChanged }) => {
  switch (filter.filterType) {
    case FILTER_TYPE.NUMERIC:
      return (
        <NumericFilter
          filter={filter}
          histogramData={histogramData}
          onFilterChanged={onFilterChanged}
        />
      );
    case FILTER_TYPE.STRING:
      return <StringFilter filter={filter} onFilterChanged={onFilterChanged} />;
    default:
      return null;
  }
};

const FilterPanelContainer = ({ filters, histograms, onFilterChanged }) => {
  const classes = useStyles();
  return (
    <div className={classes.panelContainer}>
      <form>
        {Object.values(filters).map(filter => (
          <div key={filter.column.key}>
            <Filter
              filter={filter}
              histogramData={histograms[filter.column.key]}
              onFilterChanged={onFilterChanged}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

/**
 * This is a fully uncontrolled component
 * (see https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key)
 *
 * It will only use the initial props passed to it, so if you need to refresh this component
 * you need to use a key component that changes when you want the component to refresh completely.
 */
export class FilterPanel extends Component {
  constructor(props) {
    super(props);

    // Store filters in state so that the visual state updates don't need to be debounced.
    this.state = {
      filters: this.props.filters,
    };
  }

  debouncedFilter = debounce(filter => {
    this.props.onFilterChanged(filter);
  }, 100);

  onFilterChanged = filter => {
    this.setState({
      filters: { ...this.state.filters, [filter.column.key]: filter },
    });
    this.debouncedFilter(filter);
  };

  render() {
    const { filters } = this.state;
    const { histograms } = this.props;

    return (
      <FilterPanelContainer
        filters={filters}
        histograms={histograms}
        onFilterChanged={this.onFilterChanged}
      />
    );
  }
}

FilterPanel.propTypes = {
  filters: PropTypes.object.isRequired,
  histograms: PropTypes.object.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
};

export default FilterPanel;
