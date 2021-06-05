import React, { useState, useEffect, ChangeEventHandler } from 'react';
import './CurrencyDropdown.css';

export interface CurrencyDropdownProps {
    currencies: string[];
    defaultValue: string;
    onChangeSelection: ChangeEventHandler<HTMLSelectElement>
}

const CurrencyDropdown = (props: CurrencyDropdownProps) => {
    const { currencies, onChangeSelection, defaultValue } = props

    const [currencyList, setCurrencyList] = useState<string[]>([])
    const [dropdownOptions, setDropdownOptions] = useState<JSX.Element[]>([])

    // const [currency, setCurrency] = useState<string>('');

    useEffect(() => {
        if (currencies.length) {
            const currencyOptions = currencies.map((currency, index) => <option key={index + currency}> {currency} </option>)
            setCurrencyList(currencies)
            setDropdownOptions(currencyOptions)
        }
    }, [currencies])

    return <select defaultValue={defaultValue} className="currency-dropdown" onChange={onChangeSelection}>
        {dropdownOptions}
    </select>
}


export default CurrencyDropdown