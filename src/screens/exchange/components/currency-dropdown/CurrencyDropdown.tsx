import { ChangeEventHandler, memo } from 'react';
import styles from './CurrencyDropdown.module.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Currency } from '../../../../models/enums/Currency.enum';

export interface CurrencyDropdownProps {
    currencies: Currency[];
    selectedValue: string;
    onChangeSelection: ChangeEventHandler<HTMLSelectElement>
}

const { currencyDropdown, currencyDropdownIcon } = styles

const CurrencyDropdown = (props: CurrencyDropdownProps) => {
    const { currencies, onChangeSelection, selectedValue } = props

    const createDropdownOptions = () => {
        return currencies.map((currency, index) =>
            <option value={currency} key={index + currency}>
                {currency}
            </option>
        )
    }

    return (
        <div className={currencyDropdown}>
            <select value={selectedValue} onChange={onChangeSelection}>
                {createDropdownOptions()}
            </select>
            <div className={currencyDropdownIcon}>
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </div>
        </div>
    )
}


export default memo(CurrencyDropdown)