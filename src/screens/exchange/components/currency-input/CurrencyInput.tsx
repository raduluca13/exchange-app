import React, { ChangeEventHandler } from 'react';
import styles from './CurrencyInput.module.css'

export interface CurrencyInputProps {
    error: string;
    selectedCurrencyLabel: string;
    selectedValue: string;
    onChangeAmount: ChangeEventHandler<HTMLInputElement>
}

const CurrencyInput = (props: CurrencyInputProps) => {
    const { currencyInputContainer, currencyInput, currencyInputLabel, currencyInputError } = styles
    const { error, selectedCurrencyLabel, selectedValue, onChangeAmount } = props

    return <div className={currencyInputContainer}>
        <input
            className={currencyInput}
            value={selectedValue}
            onChange={onChangeAmount} />
        <label className={currencyInputLabel}>{selectedCurrencyLabel}</label>
        {error.length > 0 && <span className={currencyInputError}>{error}</span>}
    </div>
}

export default CurrencyInput