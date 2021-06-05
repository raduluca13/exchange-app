import React, { useState, useCallback, useEffect } from 'react'
import CurrencyBalance from '../currency-balance/CurrencyBalance'
import CurrencyDropdown from '../currency-dropdown/CurrencyDropdown'
import CurrencyInput from '../currency-input/CurrencyInput'
import styles from './CurrencyInputContainer.module.css';
import { Account, Currency } from '../../ExchangeContainer';

export interface CurrencyInputContainerProps {
    currencies: Currency[];
    account: Account;
    onChangeAccount: (newCurrency: Currency, oldCurrency: Currency) => void;
    onChangeValue: (amount: string, selectedCurrency: string) => void
}

const CurrencyInputContainer = (props: CurrencyInputContainerProps) => {
    const { currencyInputContainer } = styles
    const { currencies, account, onChangeAccount, onChangeValue } = props
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(account.currency)
    const [selectedAmount, setSelectedAmount] = useState('');
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        if (selectedCurrency !== account.currency) {
            onChangeAccount(selectedCurrency, account.currency)
        }
    }, [selectedCurrency])

    useEffect(() => {
        onChangeValue(selectedAmount, selectedCurrency)
    }, [selectedAmount])

    const onChangeSelectedCurrency = (event: any) => {
        setSelectedCurrency(event.target.value)
    }

    const onChangeAmount = (event: any) => {
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
            setSelectedAmount(stringValue)

            if (+account.amount < numberValue) {
                setInputError('Amount exceeded')
            } else {
                setInputError('')
            }
            return
        }
    }

    return <div className={currencyInputContainer}>
        <CurrencyDropdown
            currencies={currencies}
            selectedValue={selectedCurrency}
            onChangeSelection={onChangeSelectedCurrency} />

        <CurrencyInput
            error={inputError}
            selectedValue={selectedAmount}
            onChangeAmount={onChangeAmount}
            selectedCurrencyLabel={selectedCurrency} />

        <CurrencyBalance {...account} />
    </div>
}

export default CurrencyInputContainer