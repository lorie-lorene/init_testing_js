import {describe,expect,it,vi,afterEach} from 'vitest'
import { getExchangeRate} from '../js/promotions/exchange/exchange'
import {exchangeRateProvider} from '../js/promotions/exchange/exchangeRateProvider';

vi.mock('../js/promotions/exchange/exchangeRateProvider', () => {
  return {
    exchangeRateProvider: {
      callExchangeRateProvider: vi.fn(),
    },
  };
});

describe('getExchangeRate', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call exchangeRateProvider with the correct currency code', async () => {
    const currencyCode = 'EUR';
    const exchangeRate = 1.2;
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(exchangeRate);

    await getExchangeRate(currencyCode, () => {});

    expect(vi.mocked(exchangeRateProvider.callExchangeRateProvider)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(exchangeRateProvider.callExchangeRateProvider)).toHaveBeenCalledWith(currencyCode);
  });

  it('should return the correct response object', async () => {
    const currencyCode = 'EUR';
    const exchangeRate = 1.2;
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockResolvedValue(exchangeRate);

    const callback = vi.fn();
    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate,
    });
  });

  it('should handle error when exchangeRateProvider rejects', async () => {
    const currencyCode = 'EUR';
    const error = new Error('Error calling exchange rate provider');
    vi.mocked(exchangeRateProvider.callExchangeRateProvider).mockRejectedValue(error);

    const callback = vi.fn();
    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ error }));
  });

  it('should handle empty currency code', async () => {
    const currencyCode = '';
    const callback = vi.fn();

    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ error: 'Currency code is required' }));
  });

  it('should handle null currency code', async () => {
    const currencyCode = null;
    const callback = vi.fn();

    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ error: 'Currency code is required' }));
  });

  it('should handle undefined currency code', async () => {
    const currencyCode = undefined;
    const callback = vi.fn();

    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ error: 'Currency code is required' }));
  });
});