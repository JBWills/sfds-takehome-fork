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

function createHeaderData(key, phrase, isNumeric=false, rowToValue=(row) => row[key]) {
  return {
    key,
    phrase,
    rowToValue,
    isNumeric,
    comparator: isNumeric ? compareByNumberColumn : compareByStringColumn,
  };
}

export const HEADER_DATA = {
  PROJECT_ID: createHeaderData('project_id', 'Project ID'),
  PROJECT_NAME: createHeaderData('project_name', 'Project Name'),
  STREET_NUMBER: createHeaderData('street_number', 'Street Number', true),
  STREET_NAME: createHeaderData('street_name', 'Street Name'),
  STREET_TYPE: createHeaderData('street_type', 'Street Type'),
  PROJECT_ADDRESS: createHeaderData('project_address', 'Address'),
  NEIGHBORHOOD: createHeaderData('neighborhood', 'Neighborhood'),
  SUPERVISOR_DISTRICT: createHeaderData('supervisor_district', 'Supervisor District'),
  PROJECT_SPONSOR: createHeaderData('project_sponsor', 'Sponsor'),
  TOTAL_UNITS: createHeaderData('total_units', 'Total Units', true),
  TOTAL_BEDS: createHeaderData('total_beds', 'Total Beds', true),
  AFFORDABLE_UNITS: createHeaderData('affordable_units', 'Affordable Units', true),
  AFFORDABLE_BEDS: createHeaderData('affordable_beds', 'Affordable Beds', true),
  SINGLE_ROOM_OCCUPANCY_UNITS: createHeaderData('single_room_occupancy_units', 'Single Room Occupancy Units', true),
  STUDIO_UNITS: createHeaderData('studio_units', 'Studio Units', true),
  ONE_BEDROOM_UNITS: createHeaderData('_1_bedroom_units', '1 Bedroom Units', true),
  TWO_BEDROOM_UNITS: createHeaderData('_2_bedroom_units', '2 Bedroom Units', true),
  THREE_BEDROOM_UNITS: createHeaderData('_3_bedroom_units', '3 Bedroom Units', true),
  FOUR_BEDROOM_UNITS: createHeaderData('_4_bedroom_units', '4 Bedroom Units', true),
  FIVE_PLUS_BEDROOM_UNITS: createHeaderData('_5_bedroom_or_larger_units', '5+ Bedroom Units', true),
  FAMILY_UNITS: createHeaderData('family_units', 'Family Units', true),
  SENIOR_UNITS: createHeaderData('senior_units', 'Senior Units', true),
  TAY_UNITS: createHeaderData('tay_units', 'TAY Units', true),
  HOMELESS_UNITS: createHeaderData('homeless_units', 'Homeless Units', true),
  LOSP_UNITS: createHeaderData('losp_units', 'LOSP Units', true),
  DISABLED_UNITS: createHeaderData('disabled_units', 'Disabled Units', true),
  UNITS_AT_20_AMI: createHeaderData('units_at_20_ami', 'Units at 20 AMI', true),
  UNITS_AT_30_AMI: createHeaderData('units_at_30_ami', 'Units at 30 AMI', true),
  UNITS_AT_40_AMI: createHeaderData('units_at_40_ami', 'Units at 40 AMI', true),
  UNITS_AT_50_AMI: createHeaderData('units_at_50_ami', 'Units at 50 AMI', true),
  UNITS_AT_60_AMI: createHeaderData('units_at_60_ami', 'Units at 60 AMI', true),
  UNITS_AT_80_AMI: createHeaderData('units_at_80_ami', 'Units at 80 AMI', true),
  UNITS_AT_120_AMI: createHeaderData('units_at_120_ami', 'Units at 120 AMI', true),
  UNITS_GREATER_THAN_120_AMI: createHeaderData('units_greater_than_120_ami', 'Units Greater than 120 AMI', true),
  YEAR_BUILDING_CONSTRUCTED: createHeaderData('year_building_constructed', 'Year Constructed', true),
  YEAR_AFFORDABILITY_BEGAN: createHeaderData('year_affordability_began', 'Year Affordability Began', true),
  LATITUDE: createHeaderData('latitude', 'Latitude'),
  LONGITUDE: createHeaderData('longitude', 'Longitude'),
  LOCATION: createHeaderData('location', 'Location'),
  STREET_ADDRESS: createHeaderData('street_address', 'Street Address', false, ({ street_number, street_name, street_type }) => `${street_number} ${street_name} ${street_type}`),
};

export const VISIBLE_COLUMNS = [
  HEADER_DATA.PROJECT_NAME,
  HEADER_DATA.STREET_ADDRESS,
  HEADER_DATA.NEIGHBORHOOD,
  HEADER_DATA.AFFORDABLE_UNITS,
  HEADER_DATA.TOTAL_UNITS,
  HEADER_DATA.AFFORDABLE_BEDS,
  HEADER_DATA.TOTAL_BEDS,
];