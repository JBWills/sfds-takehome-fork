function flipSign(num, shouldFlipSign) {
  return shouldFlipSign ? -1 * num : num;
}

function compareByStringColumn(row1, row2, columnToCompareOn, ascending) {
  const value1 = columnToCompareOn.rowToValue(row1);
  const value2 = columnToCompareOn.rowToValue(row2);
  let result = 0;
  if (value1 > value2) {
    result = 1;
  }
  if (value1 < value2) {
    result = -1;
  }

  return flipSign(result, !ascending);
}

function compareByNumberColumn(row1, row2, columnToCompareOn, ascending) {
  const value1 = parseInt(columnToCompareOn.rowToValue(row1));
  const value2 = parseInt(columnToCompareOn.rowToValue(row2));
  return flipSign(value1 - value2, !ascending);
}

function createColumnData(
  key,
  phrase,
  isNumeric = false,
  rowToValue = row => row[key]
) {
  return {
    key,
    phrase,
    rowToValue,
    isNumeric,
    comparator: isNumeric ? compareByNumberColumn : compareByStringColumn,
  };
}

export const COLUMN_DATA = {
  PROJECT_ID: createColumnData('project_id', 'Project ID'),
  PROJECT_NAME: createColumnData('project_name', 'Project Name'),
  STREET_NUMBER: createColumnData('street_number', 'Street Number', true),
  STREET_NAME: createColumnData('street_name', 'Street Name'),
  STREET_TYPE: createColumnData('street_type', 'Street Type'),
  PROJECT_ADDRESS: createColumnData('project_address', 'Address'),
  NEIGHBORHOOD: createColumnData('neighborhood', 'Neighborhood'),
  SUPERVISOR_DISTRICT: createColumnData(
    'supervisor_district',
    'Supervisor District'
  ),
  PROJECT_SPONSOR: createColumnData('project_sponsor', 'Sponsor'),
  TOTAL_UNITS: createColumnData('total_units', 'Total Units', true),
  TOTAL_BEDS: createColumnData('total_beds', 'Total Beds', true),
  AFFORDABLE_UNITS: createColumnData(
    'affordable_units',
    'Affordable Units',
    true
  ),
  AFFORDABLE_BEDS: createColumnData('affordable_beds', 'Affordable Beds', true),
  SINGLE_ROOM_OCCUPANCY_UNITS: createColumnData(
    'single_room_occupancy_units',
    'Single Room Occupancy Units',
    true
  ),
  STUDIO_UNITS: createColumnData('studio_units', 'Studio Units', true),
  ONE_BEDROOM_UNITS: createColumnData(
    '_1_bedroom_units',
    '1 Bedroom Units',
    true
  ),
  TWO_BEDROOM_UNITS: createColumnData(
    '_2_bedroom_units',
    '2 Bedroom Units',
    true
  ),
  THREE_BEDROOM_UNITS: createColumnData(
    '_3_bedroom_units',
    '3 Bedroom Units',
    true
  ),
  FOUR_BEDROOM_UNITS: createColumnData(
    '_4_bedroom_units',
    '4 Bedroom Units',
    true
  ),
  FIVE_PLUS_BEDROOM_UNITS: createColumnData(
    '_5_bedroom_or_larger_units',
    '5+ Bedroom Units',
    true
  ),
  FAMILY_UNITS: createColumnData('family_units', 'Family Units', true),
  SENIOR_UNITS: createColumnData('senior_units', 'Senior Units', true),
  TAY_UNITS: createColumnData('tay_units', 'TAY Units', true),
  HOMELESS_UNITS: createColumnData('homeless_units', 'Homeless Units', true),
  LOSP_UNITS: createColumnData('losp_units', 'LOSP Units', true),
  DISABLED_UNITS: createColumnData('disabled_units', 'Disabled Units', true),
  UNITS_AT_20_AMI: createColumnData('units_at_20_ami', 'Units at 20 AMI', true),
  UNITS_AT_30_AMI: createColumnData('units_at_30_ami', 'Units at 30 AMI', true),
  UNITS_AT_40_AMI: createColumnData('units_at_40_ami', 'Units at 40 AMI', true),
  UNITS_AT_50_AMI: createColumnData('units_at_50_ami', 'Units at 50 AMI', true),
  UNITS_AT_60_AMI: createColumnData('units_at_60_ami', 'Units at 60 AMI', true),
  UNITS_AT_80_AMI: createColumnData('units_at_80_ami', 'Units at 80 AMI', true),
  UNITS_AT_120_AMI: createColumnData(
    'units_at_120_ami',
    'Units at 120 AMI',
    true
  ),
  UNITS_GREATER_THAN_120_AMI: createColumnData(
    'units_greater_than_120_ami',
    'Units Greater than 120 AMI',
    true
  ),
  YEAR_BUILDING_CONSTRUCTED: createColumnData(
    'year_building_constructed',
    'Year Constructed',
    true
  ),
  YEAR_AFFORDABILITY_BEGAN: createColumnData(
    'year_affordability_began',
    'Year Affordability Began',
    true
  ),
  LATITUDE: createColumnData('latitude', 'Latitude'),
  LONGITUDE: createColumnData('longitude', 'Longitude'),
  LOCATION: createColumnData('location', 'Location'),
  STREET_ADDRESS: createColumnData(
    'street_address',
    'Street Address',
    false,
    ({ street_number, street_name, street_type }) =>
      `${street_number || ''} ${street_name || ''} ${street_type || ''}`
  ),
  AFFORDABLE_BEDROOM_SUMMARY: createColumnData(
    'affordable_bedroom_summary',
    'Number of Units with 0/1/2/3+ Bedrooms',
    false,
    row =>
      [
        row.studio_units,
        row._1_bedroom_units,
        row._2_bedroom_units,
        parseInt(row._3_bedroom_units) +
          parseInt(row._4_bedroom_units) +
          parseInt(row._5_bedroom_or_larger_units),
      ].join('/')
  ),
};

// These are the columns that should be visible in the data
export const VISIBLE_COLUMNS = [
  COLUMN_DATA.PROJECT_NAME,
  COLUMN_DATA.STREET_ADDRESS,
  COLUMN_DATA.NEIGHBORHOOD,
  COLUMN_DATA.AFFORDABLE_UNITS,
  COLUMN_DATA.TOTAL_UNITS,
  COLUMN_DATA.AFFORDABLE_BEDS,
  COLUMN_DATA.TOTAL_BEDS,
  COLUMN_DATA.AFFORDABLE_BEDROOM_SUMMARY,
];

// These are the columns to include filters on.
export const FILTERABLE_COLUMNS = [
  COLUMN_DATA.PROJECT_NAME,
  COLUMN_DATA.NEIGHBORHOOD,
  COLUMN_DATA.AFFORDABLE_UNITS,
  COLUMN_DATA.TOTAL_UNITS,
  COLUMN_DATA.STUDIO_UNITS,
  COLUMN_DATA.ONE_BEDROOM_UNITS,
  COLUMN_DATA.TWO_BEDROOM_UNITS,
];
