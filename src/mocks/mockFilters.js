import { COLUMN_DATA } from '../util/Constants';
import { createNumericFilter, createStringFilter } from '../util/Filters';

export default {
  [COLUMN_DATA.PROJECT_NAME.key]: createStringFilter(COLUMN_DATA.PROJECT_NAME),
  [COLUMN_DATA.AFFORDABLE_BEDS.key]: createNumericFilter(COLUMN_DATA.AFFORDABLE_BEDS),
};