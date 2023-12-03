import { expect, test } from 'vitest';
import { getPeriod } from '../src/utils/helpers';

test('getPeriod', () => {
  expect(getPeriod(1)).toBe(6.283185307179586)
});
