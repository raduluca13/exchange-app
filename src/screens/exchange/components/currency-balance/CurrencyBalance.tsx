import React, { } from 'react';
import { Account } from '../../ExchangeContainer';

import styles from './CurrencyBalance.module.css'


const CurrencyBalance = (props: Account) => {
    const { currencyBalance } = styles
    const { amount, currency } = props

    return <div className={currencyBalance}>
        {amount} {currency}
    </div>
}


export default CurrencyBalance