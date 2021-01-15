export type CurrencyRatesType = {
    [path: string] : CurrencyRatesItemType
}

type CurrencyRatesItemType = {
    "name": string,
    "unit": string,
    "value": number,
    "type": string
}

export type InitialStateType = {
   allCurrencies: Array<string>,
   fromCurrency: string,
   toCurrency: string,
   fromAmount: number,
   toAmount: number,
   isInFromCurrency: boolean,
   exchangeRateFrom: number,
   exchangeRateTo: number,
   currencyRates: CurrencyRatesType
}