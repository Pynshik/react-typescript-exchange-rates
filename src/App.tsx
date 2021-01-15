import React, { useEffect } from "react";
import {connect} from "react-redux";
import {getCurrenciesThunkCreator, actions} from "./redux/actions"
import CurrencyRow from "./CurrencyRow";
import { CurrencyStateType } from "./redux/rootReducer";

type MapStatePropsType = {
  fromCurrency: string,
  toCurrency: string,
  fromAmount: number,
  toAmount: number,
  exchachangeRateFrom: number,
  exchachangeRateTo: number,
  isInFromCurrency: boolean,
}

type MapDispatchPropsType = {
  getCurrenciesThunkCreator: () => void,
  setFromCurrency: (fromCurrency: string) => void,
  setToCurrency: (toCurrency: string) => void,
  setFromAmount: (fromAmount: number) => void,
  setToAmount: (toAmount: number) => void,
  setIsInFromCurrency: (isInFromCurrency: boolean) => void,
  setExchangeRateFrom: (nameOfCurrency: string) => void,
  setExchangeRateTo: (nameOfCurrency: string) => void,
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const App: React.FC<PropsType> = (props) => {

  useEffect(() => {
    props.getCurrenciesThunkCreator();
  }, [props.fromCurrency, props.toCurrency,
      props.fromAmount, props.toAmount])

  useEffect(() => {
    if(props.isInFromCurrency){
      if(props.exchachangeRateFrom && props.fromAmount && props.exchachangeRateTo){
        props.setToAmount(+(props.fromAmount / props.exchachangeRateFrom * props.exchachangeRateTo).toFixed(4))
      } else if (props.exchachangeRateFrom && props.fromAmount) {
        props.setToAmount(+(props.fromAmount / props.exchachangeRateFrom).toFixed(4))
      } else if (props.fromAmount && props.exchachangeRateTo) {
        props.setToAmount(+(props.fromAmount * props.exchachangeRateTo).toFixed(4))
      } else if (props.fromAmount) {
        props.setToAmount(+(props.fromAmount).toFixed(4))
      } else {props.setToAmount(1)}
    } else {
      if(props.exchachangeRateFrom && props.toAmount && props.exchachangeRateTo){
        props.setFromAmount(+(props.toAmount / props.exchachangeRateTo * props.exchachangeRateFrom).toFixed(4))
      } else if (props.exchachangeRateTo && props.toAmount) {
        props.setFromAmount(+(props.toAmount / props.exchachangeRateTo).toFixed(4))
      } else if (props.toAmount) {
        props.setFromAmount(+(props.toAmount * props.exchachangeRateFrom).toFixed(4))
      } else {props.setFromAmount(1)}
    }
  }, [props.fromCurrency,props.toCurrency, 
      props.fromAmount, props.toAmount]);

  return (
    <div className="wrapper">
      <h1>Convert</h1>
      <CurrencyRow 
        selectedCurrency={props.fromCurrency}
        onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>)=> {
          props.setIsInFromCurrency(true);
          props.setExchangeRateFrom((e.target as HTMLSelectElement).value);
          props.setFromCurrency((e.target as HTMLSelectElement).value);
          }
        }
        onChangeAmount={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setFromAmount(+(e.target as HTMLInputElement).value);
          props.setIsInFromCurrency(true)}
        }
        amount={props.fromAmount} />
      <div className="equals">=</div>
      <CurrencyRow 
        selectedCurrency={props.toCurrency}
        onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => {
        props.setIsInFromCurrency(false)
        props.setToCurrency((e.target as HTMLSelectElement).value); 
        props.setExchangeRateTo((e.target as HTMLSelectElement).value)}
      }
      onChangeAmount={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.setToAmount(+(e.target as HTMLInputElement).value);
        props.setIsInFromCurrency(false)}
      }
      amount={props.toAmount} />
    </div>
  );
}

const mapStateToProps = (state: CurrencyStateType): MapStatePropsType => {
  return {
    fromCurrency: state.fromCurrency,
    toCurrency: state.toCurrency,
    fromAmount: state.fromAmount,
    toAmount: state.toAmount,
    exchachangeRateFrom: state.exchangeRateFrom,
    exchachangeRateTo: state.exchangeRateTo,
    isInFromCurrency: state.isInFromCurrency,
  }
}
const mapDispatchToProps = {
  getCurrenciesThunkCreator, setFromCurrency: actions.setFromCurrency, setToCurrency: actions.setToCurrency,
  setFromAmount: actions.setFromAmount, setToAmount: actions.setToAmount,
  setIsInFromCurrency: actions.setIsInFromCurrency, setExchangeRateFrom: actions.setExchangeRateFrom, 
  setExchangeRateTo: actions.setExchangeRateTo
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, CurrencyStateType>(mapStateToProps, mapDispatchToProps)(App);
