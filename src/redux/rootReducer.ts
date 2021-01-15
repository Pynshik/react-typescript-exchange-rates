import {currencyReducer} from './currencyReducer';

export const rootReducer = currencyReducer;

type RootReducerType = typeof rootReducer;
export type CurrencyStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>;
