import { formatTimestamp } from '../DateFormat';

test('formats timestamps properly', () => {
  expect(formatTimestamp(1558396800)).toEqual('May 20th, 2019');
});