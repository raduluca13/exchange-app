import React, { ChangeEventHandler } from 'react';
import './CurrencyInput.css'

export interface CurrencyInputProps {
    selectedCurrencyLabel: string;
    selectedValue: string;
    onChangeAmount: ChangeEventHandler<HTMLInputElement>
}

const CurrencyInput = (props: CurrencyInputProps) => {
    const { selectedCurrencyLabel, selectedValue, onChangeAmount } = props


    return <div className='currency-input__container'>
        <input
            className='currency-input__input'
            value={selectedValue}
            onChange={onChangeAmount} />
        <label className='currency-input__label'>{selectedCurrencyLabel}</label>
    </div>
}

export default CurrencyInput