import React from 'react';
import PropTypes from 'prop-types';
import { FILTER_TYPE } from '../util/Filters';
import debounce from 'lodash.debounce';

const StyledInput = ({ labelText, showLabelTextAfterChildren=false, children }) => {
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
          defaultChecked={filter.enabled}
          onChange={() => onFilterChanged({...filter, enabled: !filter.enabled})}
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
            onChange={(e) => onFilterChanged({...filter, enabled: filter.enabled, min: e.target.value})}
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
        onChange={(e) => onFilterChanged({...filter, enabled: !!e.target.value, searchVal: e.target.value })}
      />
    </StyledInput>
  );
};

const Filter = ({ filter, onFilterChanged }) => {
  switch(filter.filterType) {
  case FILTER_TYPE.NUMERIC:
    return <NumericFilter filter={filter} onFilterChanged={onFilterChanged} />;
  case FILTER_TYPE.STRING:
    return <StringFilter filter={filter} onFilterChanged={onFilterChanged} />;
  default: return null;
  }
};

const FilterPanel = ({ filters, onFilterChanged }) => {
  const debouncedFilter = debounce((filter) => {
    onFilterChanged(filter);
  }, 100);

  return (
    <div className="FilterPanelContainer">
      <form>
        {Object.values(filters).map(filter => (
          <div key={filter.column.key}>
            <Filter
              filter={filter}
              onFilterChanged={debouncedFilter.bind(this)}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

FilterPanel.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
};

export default FilterPanel;
