import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_TYPE } from '../util/Filters';
import debounce from 'lodash.debounce';

const StyledInput = ({
  labelText,
  showLabelTextAfterChildren = false,
  children,
}) => {
  return (
    <label className="FilterItemContainer">
      {!showLabelTextAfterChildren && labelText}
      <div className="SmallHorizontalPadding VerticallyCenteredSingleItem">
        {children}
      </div>
      {showLabelTextAfterChildren && labelText}
    </label>
  );
};

const NumericFilter = ({ filter, onFilterChanged }) => {
  return (
    <div>
      <StyledInput labelText={`Filter by minimum ${filter.column.phrase}`}>
        <input
          name={`filterBy${filter.column.key}Enabled `}
          type="checkbox"
          checked={filter.enabled}
          onChange={() =>
            onFilterChanged({ ...filter, enabled: !filter.enabled })
          }
        />
      </StyledInput>
      {filter.enabled && (
        <StyledInput labelText={filter.min} showLabelTextAfterChildren>
          <input
            name={`filterBy${filter.column.key}Range`}
            type="range"
            min="0"
            max="500"
            defaultValue={filter.min}
            onChange={e =>
              onFilterChanged({
                ...filter,
                enabled: filter.enabled,
                min: e.target.value,
              })
            }
            step="1"
          />
        </StyledInput>
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
        defaultValue={filter.searchVal}
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

const Filter = ({ filter, onFilterChanged }) => {
  switch (filter.filterType) {
    case FILTER_TYPE.NUMERIC:
      return (
        <NumericFilter filter={filter} onFilterChanged={onFilterChanged} />
      );
    case FILTER_TYPE.STRING:
      return <StringFilter filter={filter} onFilterChanged={onFilterChanged} />;
    default:
      return null;
  }
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

    return (
      <div className="FilterPanelContainer">
        <form>
          {Object.values(filters).map(filter => (
            <div key={filter.column.key}>
              <Filter filter={filter} onFilterChanged={this.onFilterChanged} />
            </div>
          ))}
        </form>
      </div>
    );
  }
}

FilterPanel.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
};

export default FilterPanel;
