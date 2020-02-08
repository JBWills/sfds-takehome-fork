import mockRows from '../../mocks/mockRows';
import mockFilters from '../../mocks/mockRows';
import {
  FILTER_TYPE,
  createNumericFilter,
  createStringFilter,
  rowPassesFilters,
} from '../Filters';
import { COLUMN_DATA } from '../Constants';

test('creates numeric filters with correct default params', () => {
  expect(createNumericFilter(COLUMN_DATA.AFFORDABLE_BEDS)).toEqual({
    filterType: FILTER_TYPE.NUMERIC,
    column: COLUMN_DATA.AFFORDABLE_BEDS,
    enabled: false,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  });
});

test('creates numeric filters with specific params', () => {
  expect(createNumericFilter(COLUMN_DATA.AFFORDABLE_BEDS, true, 1, 3)).toEqual({
    filterType: FILTER_TYPE.NUMERIC,
    column: COLUMN_DATA.AFFORDABLE_BEDS,
    enabled: true,
    min: 1,
    max: 3,
  });
});

test('creates string filters with correct default params', () => {
  expect(createStringFilter(COLUMN_DATA.PROJECT_NAME)).toEqual({
    filterType: FILTER_TYPE.STRING,
    column: COLUMN_DATA.PROJECT_NAME,
    enabled: false,
    searchVal: '',
  });
});

test('creates string filters with specific params', () => {
  expect(createStringFilter(COLUMN_DATA.PROJECT_NAME, true, 'testval')).toEqual(
    {
      filterType: FILTER_TYPE.STRING,
      column: COLUMN_DATA.PROJECT_NAME,
      enabled: true,
      searchVal: 'testval',
    }
  );
});

test('row passes filters with no filters', () => {
  expect(rowPassesFilters({}, mockRows[0])).toEqual(true);
});

test('row passes filters with all disabled filters', () => {
  expect(rowPassesFilters(mockFilters, mockRows[0])).toEqual(true);
});

test('row passes filters with all matching enabled filters', () => {
  const filters = {
    [COLUMN_DATA.PROJECT_NAME.key]: createStringFilter(
      COLUMN_DATA.PROJECT_NAME,
      true,
      'Project'
    ),
    [COLUMN_DATA.AFFORDABLE_BEDS.key]: createNumericFilter(
      COLUMN_DATA.AFFORDABLE_BEDS,
      true,
      0,
      10
    ),
  };

  expect(rowPassesFilters(filters, mockRows[0])).toEqual(true);
});

test('row fails filters with one non-matching string filter', () => {
  const filters = {
    [COLUMN_DATA.PROJECT_NAME.key]: createStringFilter(
      COLUMN_DATA.PROJECT_NAME,
      true,
      'Projject'
    ),
    [COLUMN_DATA.AFFORDABLE_BEDS.key]: createNumericFilter(
      COLUMN_DATA.AFFORDABLE_BEDS,
      true,
      0,
      10
    ),
  };

  expect(rowPassesFilters(filters, mockRows[0])).toEqual(false);
});

test('row fails filters with one non-matching numeric filter', () => {
  const filters = {
    [COLUMN_DATA.PROJECT_NAME.key]: createStringFilter(
      COLUMN_DATA.PROJECT_NAME,
      true,
      'Project'
    ),
    [COLUMN_DATA.AFFORDABLE_BEDS.key]: createNumericFilter(
      COLUMN_DATA.AFFORDABLE_BEDS,
      true,
      2,
      10
    ),
  };

  expect(rowPassesFilters(filters, mockRows[0])).toEqual(false);
});

test('row fails filters with all non-matching filters', () => {
  const filters = {
    [COLUMN_DATA.PROJECT_NAME.key]: createStringFilter(
      COLUMN_DATA.PROJECT_NAME,
      true,
      'Projject'
    ),
    [COLUMN_DATA.AFFORDABLE_BEDS.key]: createNumericFilter(
      COLUMN_DATA.AFFORDABLE_BEDS,
      true,
      2,
      10
    ),
  };

  expect(rowPassesFilters(filters, mockRows[0])).toEqual(false);
});
