import CurrencyBalance from '../currency-balance/CurrencyBalance'
import CurrencyDropdown from '../currency-dropdown/CurrencyDropdown'
import CurrencyInput from '../currency-input/CurrencyInput'
import styles from './CurrencyInputContainer.module.css';
import { memo } from 'react';
import { Currency } from '../../../../models/enums/Currency.enum';
import { Account } from '../../../../models/interfaces/Account.interface';
import { InputPosition } from '../../../../models/enums/InputPosition.enum';

export interface CurrencyInputContainerProps {
    inputPosition: InputPosition;
    currencies: Currency[];
    account: Account;
    onChangeAccount: (newCurrency: Currency, oldCurrency: Currency) => void;
    onAdjustAmount: (amount: string, currency: Currency, inputPosition: InputPosition) => void;
    onValidation: (hasError: boolean, inputPosition: InputPosition) => void
}

const { currencyInputContainer } = styles

const CurrencyInputContainer = (props: CurrencyInputContainerProps) => {
    const { inputPosition, currencies, account, onChangeAccount, onAdjustAmount } = props

    const onChangeSelectedCurrency = (event: any) => {
        const newCurrency = event.target.value
        onChangeAccount(newCurrency, account.currency)
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
            onAdjustAmount(stringValue, account.currency, inputPosition)
        }
    }

    return <div className={currencyInputContainer}>
        <CurrencyDropdown
            currencies={currencies}
            selectedValue={account.currency}
            onChangeSelection={onChangeSelectedCurrency} />

        <CurrencyInput
            error={account.inputError}
            selectedValue={account.adjustment}
            onChangeAmount={onChangeAmount}
            selectedCurrencyLabel={account.currency} />

        <CurrencyBalance {...account} />
    </div>
}

export default memo(CurrencyInputContainer)