import { memo } from 'react';
import { AdjustmentType } from '../../../../models/enums/AdjustmentType.enum';
import { Account } from '../../../../models/interfaces/Account.interface';
import styles from './CurrencyBalance.module.css'

const { currencyBalanceContainer, currencyBalance } = styles

// TODO - should be renamed to something like AccountSummaryExchangeView
const CurrencyBalance = (props: Account) => {
    const { amount, currency, adjustment, adjustmentType } = props
    const positiveAdjustmentSign = adjustmentType === AdjustmentType.POSITIVE
    const displayValue = `${amount} ${currency} ${positiveAdjustmentSign ? "+" : "-"} ${adjustment}`

    return <div className={currencyBalanceContainer}>
        <span className={currencyBalance}>{displayValue}</span>
    </div>
}


export default memo(CurrencyBalance)