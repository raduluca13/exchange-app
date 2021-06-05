import React, { useState, useCallback, useEffect } from 'react'
import CurrencyBalance from '../currency-balance/CurrencyBalance'
import CurrencyDropdown from '../currency-dropdown/CurrencyDropdown'
import CurrencyInput from '../currency-input/CurrencyInput'
import './CurrencyInputContainer.css';
import PropTypes from 'prop-types';
import { Currency } from '../../ExchangeContainer';

export interface CurrencyInputContainerProps {
    currencies: Currency[];
    accountBalances: AccountBalance[]
    // exchangedValues: number[]
}

export interface AccountBalance {
    currency: Currency;
    amount: string,
    // balanceIndex: number 
}

const CurrencyInputContainer = (props: CurrencyInputContainerProps) => {
    const { currencies, accountBalances } = props
    const [selectedCurrency, setSelectedCurrency] = useState<string>(Currency.RON)
    const [selectedAmount, setSelectedAmount] = useState('0');
    const [accountBalance, setAccountBalance] = useState<AccountBalance>({ amount: '0', currency: Currency.RON })

    useEffect(() => {
        console.log({ selectedCurrency }, { accountBalances })
        if (selectedCurrency) {
            const balanceIndex = accountBalances.findIndex(balance => balance.currency === selectedCurrency)
            const balance = {
                currency: accountBalances[balanceIndex].currency,
                amount: accountBalances[balanceIndex].amount
            }
            setAccountBalance(balance)
        }
    }, [accountBalances, selectedCurrency])

    useEffect(() => {
        console.log({ accountBalance })
    }, [accountBalance])

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
            defaultValue={selectedCurrency}
            onChangeSelection={onChangeSelectedCurrency} />

        <CurrencyInput
            selectedValue={selectedAmount}
            onChangeAmount={onChangeAmount}
            selectedCurrency={selectedCurrency} />

        <CurrencyBalance {...accountBalance} />
    </div>
}

export default CurrencyInputContainer