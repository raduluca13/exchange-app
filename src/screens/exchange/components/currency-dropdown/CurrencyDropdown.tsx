import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { Currency } from '../../ExchangeContainer';
import './CurrencyDropdown.css';

export interface CurrencyDropdownProps {
    currencies: Currency[];
    selectedValue: string;
    onChangeSelection: ChangeEventHandler<HTMLSelectElement>
}

const CurrencyDropdown = (props: CurrencyDropdownProps) => {
    const { currencies, onChangeSelection, selectedValue } = props
    const [dropdownOptions, setDropdownOptions] = useState<JSX.Element[]>([])

    useEffect(() => {
        if (currencies.length) {
            const currencyOptions = currencies.map((currency, index) => <option value={currency} key={index + currency}> {currency} </option>)
            setDropdownOptions(currencyOptions)
        }
    }, [currencies])

    return (
        <select value={selectedValue} className="currency-dropdown" onChange={onChangeSelection}>
            {dropdownOptions}
        </select>
    )
}


export default CurrencyDropdown