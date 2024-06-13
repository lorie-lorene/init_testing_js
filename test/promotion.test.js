import { vi,decribe,it,expect } from 'vitest';
import { applyDiscount, calculateMoneyOff, calculatePercentageDiscount } from '../js/promotions/promotions';;
import { getDiscount } from '../js/promotions/discount/discount';
vi.mock('../js/promotions/discount/discount')
describe('applyDiscount', () => {
  it('applies a MONEYOFF discount', async () => {
    const discountCode = 'MONEYOFF_10';
    const currentTotal = 100;
    const data = { isValid: true, type: 'MONEYOFF', value: 10, minSpend: 50 };
    vi.mocked(getDiscount).mockResolvedValue({ data });

    const result = await applyDiscount(discountCode, currentTotal);
    expect(result).toBe(90);
  });

  it('applies a PERCENTAGEOFF discount', async () => {
    const discountCode = 'PERCENTAGEOFF_20';
    const currentTotal = 100;
    const data = { isValid: true, type: 'PERCENTAGEOFF', value: 20, minSpend: 50 };
    vi.mocked(getDiscount).mockResolvedValue({ data });

    const result = await applyDiscount(discountCode, currentTotal);
    expect(result).toBe(80);
  });

  it('returns the original total if the discount is invalid', async () => {
    const discountCode = 'INVALID_DISCOUNT';
    const currentTotal = 100;
    const data = { isValid: false };
    vi.mocked(getDiscount).mockResolvedValue({ data });

    const result = await applyDiscount(discountCode, currentTotal);
    expect(result).toBe(100);
  });

  it('calls calculateMoneyOff with the correct arguments', async () => {
    const discountCode = 'MONEYOFF_10';
    const currentTotal = 100;
    const data = { isValid: true, type: 'MONEYOFF', value: 10, minSpend: 50 };
    vi.mocked(getDiscount).mockResolvedValue({ data });
    vi.spyOn(calculateMoneyOff, 'default').mockImplementation(() => 90);

    await applyDiscount(discountCode, currentTotal);
    expect(calculateMoneyOff).toHaveBeenCalledTimes(1);
    expect(calculateMoneyOff).toHaveBeenCalledWith(10, 50, 100);
  });

  it('calls calculatePercentageDiscount with the correct arguments', async () => {
    const discountCode = 'PERCENTAGEOFF_20';
    const currentTotal = 100;
    const data = { isValid: true, type: 'PERCENTAGEOFF', value: 20, minSpend: 50 };
    vi.mocked(getDiscount).mockResolvedValue({ data });
    vi.spyOn(calculatePercentageDiscount, 'default').mockImplementation(() => 80);

    await applyDiscount(discountCode, currentTotal);
    expect(calculatePercentageDiscount).toHaveBeenCalledTimes(1);
    expect(calculatePercentageDiscount).toHaveBeenCalledWith(20, 50, 100);
  });
});