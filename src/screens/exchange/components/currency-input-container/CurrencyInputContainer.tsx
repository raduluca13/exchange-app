import React, { useState, useCallback, useMemo } from 'react'
import CurrencyBalance from '../currency-balance/CurrencyBalance'
import CurrencyDropdown from '../currency-dropdown/CurrencyDropdown'
import CurrencyInput from '../currency-input/CurrencyInput'
import styles from './CurrencyInputContainer.module.css';
import { Account, AdjustmentType, Currency } from '../../ExchangeContainer';

export interface CurrencyInputContainerProps {
    index: number;
    currencies: Currency[];
    account: Account;
    onChangeAccount: (newCurrency: Currency, oldCurrency: Currency) => void;
    onChangeValue: (amount: string, currency: Currency, index: number) => void
}

const CurrencyInputContainer = (props: CurrencyInputContainerProps) => {
    const { currencyInputContainer } = styles
    const { index, currencies, account, onChangeAccount, onChangeValue } = props

    const amountMemo = useMemo(() => account.amount, [account.amount])
    const inputMemo = useMemo(() => {
        return {
            currency: account.currency,
            adjustment: account.adjustment,
            adjustmentType: account.adjustmentType
        }
    }, [account.currency, account.adjustment, account.adjustmentType])

    const [inputError, setInputError] = useState('');

    const onChangeSelectedCurrency = useCallback((event: any) => {
        const newCurrency = event.target.value
        onChangeAccount(newCurrency, account.currency)
    }, [inputMemo])

    const onChangeAmount = useCallback((event: any) => {
        const stringValue = event.target.value.trim()
        const numberValue = +stringValue
        const isNumber = !isNaN(numberValue)

        const indexOfDelimiter = stringValue.indexOf('.') || stringValue.indexOf(',')
        const hasDelimiter = indexOfDelimiter !== -1
        const hasDelimiterOnlyOnLastPosition = ['.', ','].includes(stringValue[stringValue.length - 1])

        if (!isNumber) {
            return
        }

        const maxTwoDigits = hasDelimiter && stringValue.length - indexOfDelimiter - 1 <= 2
        if (!hasDelimiter || hasDelimiterOnlyOnLastPosition || maxTwoDigits) {
            onChangeValue(stringValue, inputMemo.currency, index)
            if (+amountMemo < numberValue && inputMemo.adjustmentType === AdjustmentType.NEGATIVE) {
                setInputError('Amount exceeded')
            } else {
                setInputError('')
            }
            return
        }
    }, [amountMemo, inputMemo])

    return <div className={currencyInputContainer}>
        <CurrencyDropdown
            currencies={currencies}
            selectedValue={inputMemo.currency}
            onChangeSelection={onChangeSelectedCurrency} />

        <CurrencyInput
            error={inputError}
            selectedValue={inputMemo.adjustment}
            onChangeAmount={onChangeAmount}
            selectedCurrencyLabel={inputMemo.currency} />

        <CurrencyBalance {...account} />
    </div>
}

export default CurrencyInputContainer