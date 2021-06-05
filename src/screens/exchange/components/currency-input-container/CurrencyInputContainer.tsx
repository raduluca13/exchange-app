import React, { useState, Fragment, useCallback } from 'react'
import CurrencyBalance from '../currency-balance/CurrencyBalance'
import CurrencyDropdown from '../currency-dropdown/CurrencyDropdown'
import CurrencyInput from '../currency-input/CurrencyInput'
import './CurrencyInputContainer.css';
import PropTypes from 'prop-types';

export interface CurrencyInputContainerProps {
    currencies: string[];
    accountBalances: AccountBalance[]
    // exchangedValues: number[]
}

export interface AccountBalance {
    currency: string;
    amount: number
}

const CurrencyInputContainer = (props: CurrencyInputContainerProps) => {
    const { currencies, accountBalances } = props
    const [selectedCurrency, setSelectedCurrency] = useState<string>('RON')
    const [selectedAmount, setSelectedAmount] = useState('');

    const onChangeSelectedCurrency = (event: any) => {
        const selectedValue = event.target.value;
        if (isNaN(selectedValue)) {
            return
        }

        setSelectedCurrency(selectedValue)
    }

    const onChangeAmount = (event: any) => {
        const stringValue = event.target.value.trim()
        const numberValue = +stringValue

        const isNumber = !isNaN(numberValue)

        const indexOfDelimiter = stringValue.indexOf('.') || stringValue.indexOf(',')
        console.log({ indexOfDelimiter })
        const hasDelimiter = indexOfDelimiter !== -1
        console.log({ hasDelimiter })
        const hasDelimiterOnlyOnLastPosition = ['.', ','].includes(stringValue[stringValue.length - 1])
        console.log({ hasDelimiterOnlyOnLastPosition })

        if (!isNumber) {
            return
        }

        const maxTwoDigits = hasDelimiter && stringValue.length - indexOfDelimiter - 1 <= 2
        console.log({ maxTwoDigits })
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

        <CurrencyBalance />
    </div>
}

export default CurrencyInputContainer