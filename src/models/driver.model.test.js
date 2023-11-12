import { calculateSumMinusMeanAge } from './driver.model';

describe('calculateSumMinusMeanAge', () => {
  it('should return the correct sum of differences', () => {
    const ages = [20, 30, 40, 50];
    const expected = 0;
    const result = calculateSumMinusMeanAge(ages);
    expect(result).toEqual(expected);
  });

  it('should return the correct sum of differences for negative numbers', () => {
    const ages = [-10, -20, -30, -40];
    const expected = 0;
    const result = calculateSumMinusMeanAge(ages);
    expect(result).toEqual(expected);
  });

  it('should return the correct sum of differences for mixed numbers', () => {
    const ages = [-10, 20, -30, 40];
    const expected = 0;
    const result = calculateSumMinusMeanAge(ages);
    expect(result).toEqual(expected);
  });
});