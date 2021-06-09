import { ChangeEventHandler, memo } from 'react';
import styles from './CurrencyInput.module.css'

export interface CurrencyInputProps {
    error: string;
    selectedCurrencyLabel: string;
    selectedValue: string;
    onChangeAmount: ChangeEventHandler<HTMLInputElement>
}

const { currencyInputContainer, currencyInputWithoutValue, currencyInputWithValue, currencyInputLabelWithValue, currencyInputLabelWithoutValue, currencyInputError, currencyInputTopRow, currencyInputBottomRow } = styles

const CurrencyInput = (props: CurrencyInputProps) => {
    const { error, selectedCurrencyLabel, selectedValue, onChangeAmount } = props

    return <div className={currencyInputContainer}>
        <div className={currencyInputTopRow}>
            <input
                className={error || selectedValue === ''
                    ? currencyInputWithoutValue
                    : currencyInputWithValue
                }
                value={selectedValue}
                onChange={onChangeAmount} />
            <label className={error || selectedValue === ''
                ? currencyInputLabelWithoutValue
                : currencyInputLabelWithValue
            }>
                {selectedCurrencyLabel}
            </label>

        </div>
        <div className={currencyInputBottomRow}>
            {error.length > 0 && <span className={currencyInputError}>{error}</span>}
        </div>
    </div>
}

export default memo(CurrencyInput)