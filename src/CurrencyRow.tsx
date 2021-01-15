import * as React from "react";
import {connect} from "react-redux";
import { CurrencyStateType } from "./redux/rootReducer";

type MapStatePropsType = {
  allCurrencies: Array<string>
}

type MapDispatchPropsType = {};

type OwnPropsType = {
  amount: number,
  selectedCurrency: string,
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const CurrencyRow: React.FC<PropsType> = (props) => {
  return (
    <div>
      <input type="number" className="input" value={props.amount} onChange={props.onChangeAmount} />
        <select value={props.selectedCurrency} onChange={props.onChangeCurrency}>
          {props.allCurrencies?.map((option: string)=> {
            const newOption = option.toUpperCase();
            return <option key={option} value={newOption}>{newOption}</option>
          })}
        </select>
    </div>
  )
}

const mapStateToProps = (state: CurrencyStateType): MapStatePropsType => {
  return {
    allCurrencies: state.allCurrencies,
  };
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, CurrencyStateType>(mapStateToProps)(CurrencyRow);
