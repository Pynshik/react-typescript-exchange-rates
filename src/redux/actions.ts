import axios from "axios";
import {Dispatch} from "redux";
import {SET_ALL_CURRENCIES, SET_FROM_CURRENCY, SET_TO_CURRENCY,
        SET_FROM_AMOUNT, SET_TO_AMOUNT, SET_IS_IN_FROM_CURRENCY,
        SET_EXCHANGE_RATE_FROM, SET_EXCHANGE_RATE_TO, SET_CURRENCY_RATES} from './types';
import {CurrencyRatesType} from '../typesForTS';
import { CurrencyStateType } from './rootReducer';
import {InferActionsTypes} from './rootReducer';

const url = 'https://api.coingecko.com/api/v3/exchange_rates';

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
setAllCurrencies: (allCurrencies: Array<string>) => {
    return ({
        type: SET_ALL_CURRENCIES,
        payload: allCurrencies,
    } as const);
},
setFromCurrency: (fromCurrency: string) => {
    return ({
        type: SET_FROM_CURRENCY,
        payload: fromCurrency,
    } as const);
},
setToCurrency: (toCurrency: string) => {
    return ({
        type: SET_TO_CURRENCY,
        payload: toCurrency,
    } as const);
},
setFromAmount: (fromAmount: number) => {
    return ({
        type: SET_FROM_AMOUNT,
        payload: fromAmount,
    } as const);
},
setToAmount: (toAmount: number) => {
    return ({
        type: SET_TO_AMOUNT,
        payload: toAmount,
    } as const);
},
setIsInFromCurrency: (isInFromCurrency: boolean) => {
    return ({
        type: SET_IS_IN_FROM_CURRENCY,
        payload: isInFromCurrency,
    } as const);
},
setCurrencyRates: (currencyRates: CurrencyRatesType) => {
    return ({
        type: SET_CURRENCY_RATES,
        payload: currencyRates,
    } as const);
},
setExchangeRateFrom: (nameOfCurrency: string) => {
    return ({
        type: SET_EXCHANGE_RATE_FROM,
        payload: nameOfCurrency,
    } as const);
},
setExchangeRateTo: (nameOfCurrency: string) => {
    return ({
        type: SET_EXCHANGE_RATE_TO,
        payload: nameOfCurrency,
    } as const);
}
}

type GetStateType = () => CurrencyStateType;
type DispatchType = Dispatch<ActionsTypes>;

type ResponseDataType = {
    rates: {
      [path: string] : {
        name: string,
        unit: string,
        value: number,
        type: string
      }
  }
}

export const getCurrenciesThunkCreator = () => {
  return  async (dispatch: DispatchType, getState: GetStateType) => {
    await axios.get<ResponseDataType>(url)
      .then(res => {
        dispatch(actions.setAllCurrencies([...Object.keys(res.data.rates)]));
        dispatch(actions.setCurrencyRates(res.data.rates));
      })
      .catch(err=>{
        console.log(`No data received. ${err}`)
      });
  }
}