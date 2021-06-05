import React, { useState, useCallback, useEffect } from 'react'
import CurrencyBalance from '../currency-balance/CurrencyBalance'
import CurrencyDropdown from '../currency-dropdown/CurrencyDropdown'
import CurrencyInput from '../currency-input/CurrencyInput'
import './CurrencyInputContainer.css';
import { AccountBalance, Currency } from '../../ExchangeContainer';

export interface CurrencyInputContainerProps {
    currencies: Currency[];
    accountBalance: AccountBalance;
    onChangeAccount: (currency: string, previousBalanceIndex: number) => void
}

const CurrencyInputContainer = (props: CurrencyInputContainerProps) => {
    const { currencies, accountBalance, onChangeAccount } = props
    const [selectedCurrency, setSelectedCurrency] = useState<string>(accountBalance.currency)
    const [selectedAmount, setSelectedAmount] = useState('0');

    useEffect(() => {
        onChangeAccount(selectedCurrency, accountBalance.balanceIndex)
    }, [selectedCurrency, onChangeAccount])

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
            return
        }
    }

    return <div className="currency-input-container">
        <CurrencyDropdown
            currencies={currencies}
            selectedValue={selectedCurrency}
            onChangeSelection={onChangeSelectedCurrency} />

        <CurrencyInput
            selectedValue={selectedAmount}
            onChangeAmount={onChangeAmount}
            selectedCurrencyLabel={selectedCurrency} />

        <CurrencyBalance {...accountBalance} />
    </div>
}

export default CurrencyInputContainer