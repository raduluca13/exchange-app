import React, {  } from 'react';
import { AccountBalance } from '../../ExchangeContainer';
import './CurrencyBalance.css'

const CurrencyBalance = (props: AccountBalance) => {
    const { amount, currency } = props

    return <div className="currency-balance">
        {amount} {currency}
    </div>
}


export default CurrencyBalance