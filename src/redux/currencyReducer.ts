import {SET_ALL_CURRENCIES, SET_FROM_CURRENCY, SET_TO_CURRENCY, 
    SET_FROM_AMOUNT, SET_TO_AMOUNT, SET_IS_IN_FROM_CURRENCY, 
    SET_EXCHANGE_RATE_FROM, SET_EXCHANGE_RATE_TO, SET_CURRENCY_RATES} from './types';
import {InitialStateType} from '../typesForTS';
import {ActionsTypes} from './actions'
    
const initialState:InitialStateType = {
    allCurrencies: [],
    fromCurrency: '',
    toCurrency: '',
    fromAmount: 1,
    toAmount: 1,
    isInFromCurrency: true,
    exchangeRateFrom: 1,
    exchangeRateTo: 1,
    currencyRates: {}
};

export const currencyReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
switch (action.type) {
    case SET_ALL_CURRENCIES:
        return {...state, allCurrencies: action.payload};
    case SET_FROM_CURRENCY:
        return {...state, fromCurrency: action.payload};
    case SET_TO_CURRENCY:
        return {...state, toCurrency: action.payload};
    case SET_FROM_AMOUNT:
        return {...state, fromAmount: action.payload};
    case SET_TO_AMOUNT:
        return {...state, toAmount: action.payload};
    case SET_IS_IN_FROM_CURRENCY:
        return {...state, isInFromCurrency: action.payload};
    case SET_CURRENCY_RATES:
        return {...state, currencyRates: action.payload};
    case SET_EXCHANGE_RATE_FROM:
        const fromCurrencyInLowerCase = action.payload.toLowerCase();
        const fromRateOfCurrency = state.currencyRates[fromCurrencyInLowerCase].value;
        return {...state, exchangeRateFrom: fromRateOfCurrency};
    case SET_EXCHANGE_RATE_TO:
        const toCurrencyInLowerCase = action.payload.toLowerCase();
        const toRateOfCurrency = state.currencyRates[toCurrencyInLowerCase].value;
        return {...state, exchangeRateTo: toRateOfCurrency};
    default: return state;
}
}
