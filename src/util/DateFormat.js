import moment from 'moment';

export const formatTimestamp = timestamp =>
  moment.unix(timestamp).format('MMM Do, YYYY');
