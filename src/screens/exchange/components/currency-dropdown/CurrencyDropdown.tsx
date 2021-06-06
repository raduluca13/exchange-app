import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { Currency } from '../../ExchangeContainer';
import styles from './CurrencyDropdown.module.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
export interface CurrencyDropdownProps {
    currencies: Currency[];
    selectedValue: string;
    onChangeSelection: ChangeEventHandler<HTMLSelectElement>
}

const CurrencyDropdown = (props: CurrencyDropdownProps) => {
    const { currencyDropdown, currencyDropdownIcon } = styles
    const { currencies, onChangeSelection, selectedValue } = props
    const [dropdownOptions, setDropdownOptions] = useState<JSX.Element[]>([])

    useEffect(() => {
        if (currencies.length) {
            const currencyOptions = currencies.map((currency, index) => <option value={currency} key={index + currency}>
                {currency}
            </option>)
            setDropdownOptions(currencyOptions)
        }
    }, [currencies])

    return (
        <div className={currencyDropdown}>
            <select value={selectedValue} onChange={onChangeSelection}>
                {dropdownOptions}
            </select>
            <div className={currencyDropdownIcon}>
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </div>
        </div>
    )
}


export default CurrencyDropdown