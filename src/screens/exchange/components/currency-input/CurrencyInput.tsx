import React, { ChangeEventHandler } from 'react';
import './CurrencyInput.css'

export interface CurrencyInputProps {
    selectedCurrency: string;
    selectedValue: string;
    onChangeAmount: ChangeEventHandler<HTMLInputElement>
}

const CurrencyInput = (props: CurrencyInputProps) => {
    const { selectedCurrency, selectedValue, onChangeAmount } = props


    return <div className='currency-input__container'>
        <input
            className='currency-input__input'
            value={selectedValue}
            onChange={onChangeAmount} />
        <label className='currency-input__label'>{selectedCurrency}</label>
    </div>
}

export default CurrencyInput