import React, { ChangeEventHandler } from 'react';
import styles from './CurrencyInput.module.css'

export interface CurrencyInputProps {
    error: string;
    selectedCurrencyLabel: string;
    selectedValue: string;
    onChangeAmount: ChangeEventHandler<HTMLInputElement>
}

const CurrencyInput = (props: CurrencyInputProps) => {
    const { currencyInputContainer, currencyInput, currencyInputLabel, currencyInputError, currencyInputTopRow, currencyInputBottomRow } = styles
    const { error, selectedCurrencyLabel, selectedValue, onChangeAmount } = props
    // console.log({ selectedValue })
    return <div className={currencyInputContainer}>
        <div className={currencyInputTopRow}>
            <input
                className={currencyInput}
                value={selectedValue}
                onChange={onChangeAmount} />
            <label className={currencyInputLabel}>{selectedCurrencyLabel}</label>

        </div>
        <div className={currencyInputBottomRow}>
            {error.length > 0 && <span className={currencyInputError}>{error}</span>}
        </div>
    </div>
}

export default CurrencyInput