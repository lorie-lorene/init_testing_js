import {expect,it,describe,jest} from 'vitest'
import { getExchangeRate} from '../js/promotions/exchange/exchange'
import exchangeRateProvider from '../js/promotions/exchange/exchangeRateProvider';

jest.mock('./exchangeRateProvider');

describe('getExchangeRate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call exchangeRateProvider with the correct currency code', async () => {
    const currencyCode = 'EUR';
    const exchangeRate = 1.2;
    exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(exchangeRate);

    await getExchangeRate(currencyCode, () => {});

    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledTimes(1);
    expect(exchangeRateProvider.callExchangeRateProvider).toHaveBeenCalledWith(currencyCode);
  });

  it('should return the correct response object', async () => {
    const currencyCode = 'EUR';
    const exchangeRate = 1.2;
    exchangeRateProvider.callExchangeRateProvider.mockResolvedValue(exchangeRate);

    const callback = jest.fn();
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
    exchangeRateProvider.callExchangeRateProvider.mockRejectedValue(error);

    const callback = jest.fn();
    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ error }));
  });

  it('should handle empty currency code', async () => {
    const currencyCode = '';
    const callback = jest.fn();

    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ error: 'Currency code is required' }));
  });

  it('should handle null currency code', async () => {
    const currencyCode = null;
    const callback = jest.fn();

    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ error: 'Currency code is required' }));
  });

  it('should handle undefined currency code', async () => {
    const currencyCode = undefined;
    const callback = jest.fn();

    await getExchangeRate(currencyCode, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ error: 'Currency code is required' }));
  });
});
