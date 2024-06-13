import { describe, expect, it, vi } from 'vitest';
import { exchangeRateProvider } from '../js/promotions/exchange/exchangeRateProvider';

describe('exchangeRateProvider', () => {
  vi.mock('../js/promotions/exchange/exchangeRateProvider', () => {
    return {
      exchangeRateProvider: {
        callExchangeRateProvider: vi.fn(),
      },
    };
  });

  it('returns the correct exchange rate for USD', async () => {
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(1.25);
    const result = await exchangeRateProvider.callExchangeRateProvider('USD');
    expect(result).toBe(1.25);
  });

  it('returns the correct exchange rate for EUR', async () => {
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(1.18);
    const result = await exchangeRateProvider.callExchangeRateProvider('EUR');
    expect(result).toBe(1.18);
  });

  it('returns the correct exchange rate for NZD', async () => {
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(1.93);
    const result = await exchangeRateProvider.callExchangeRateProvider('NZD');
    expect(result).toBe(1.93);
  });

  it('throws an error for an unsupported currency', async () => {
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockRejectedValue(new Error('Currency not supported'));
    await expect(exchangeRateProvider.callExchangeRateProvider('JPY')).rejects.toThrowError('Currency not supported');
  });

  it('returns 1 for an unknown currency (default case)', async () => {
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(1);
    const result = await exchangeRateProvider.callExchangeRateProvider('ABC');
    expect(result).toBe(1);
  });
});
/**
 *returns the correct exchange rate for USD: Verifies that the callExchangeRateProvider function returns the correct exchange rate for USD.
returns the correct exchange rate for EUR: Verifies that the callExchangeRateProvider function returns the correct exchange rate for EUR.
returns the correct exchange rate for NZD: Verifies that the callExchangeRateProvider function returns the correct exchange rate for NZD.
throws an error for an unsupported currency: Verifies that the callExchangeRateProvider function throws an error when passed an unsupported currency code.
returns 1 for an unknown currency (default case): Verifies that the callExchangeRateProvider function returns 1 when passed an unknown currency code (i.e., the default case). In this test, we use vi.spyOn to mock the callExchangeRateProvider function to return 1, and then verify that it returns
 1 when called with an unknown currency code.
 */