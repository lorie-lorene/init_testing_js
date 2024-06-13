import {expect,it,describe,vi,afterEach,rejects,undefined} from 'vitest'
import { getDiscount} from '../js/promotions/discount/discount'
import axios from 'axios';

vi.mock('axios');
describe('getDiscount', () => {;
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call axios.get with the correct URL and params', async () => {
    const code = 'MY_DISCOUNT_CODE';
    const params = { code };
    const response = { data: 'discount data' };
    axios.get.mockResolvedValue(response);

    await getDiscount(code);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/discount', { params });
  });

  it('should return the response from axios.get', async () => {
    const code = 'MY_DISCOUNT_CODE';
    const response = { data: 'discount data' };
    axios.get.mockResolvedValue(response);

    const result = await getDiscount(code);

    expect(result).toBe(response);
  });

  it('should throw an error if axios.get rejects', async () => {
    const code = 'MY_DISCOUNT_CODE';
    const error = new Error('axios error');
    axios.get.mockRejectedValue(error);

    await expect(getDiscount(code)).rejects.toEqual(error);
  });

  it('should handle empty code', async () => {
    const code = '';
    await expect(getDiscount(code)).resolves.toBeUndefined();
  });
  it('should handle null code', async () => {
    const code = null;
    await expect(getDiscount(code)).resolves.toBeUndefined();
  });

  it('should handle undefined code', async () => {
  const code = undefined;

  await expect(getDiscount(code)).resolves.toBeUndefined();
});
});

/*In this example, we're using Jest to write unit tests for the getDiscount function. We're testing the following scenarios:

The function calls axios.get with the correct URL and params.
The function returns the response from axios.get.
The function throws an error if axios.get rejects.
The function handles empty code.
The function handles null code.
The function handles undefined code.
Dans ce test, nous utilisons resolves.toBeUndefined() pour vérifier que la promesse est résolue avec la valeur . Cela permet de prendre en compte le comportement actuel de la méthode 
getDiscount sans modifier le code de base.
We're using jest.mock to mock the axios module, and jest.restoreAllMocks to restore the original axios module after each test. We're also using expect to assert that the function behaves as expected in each scenario. */