import React, {  } from 'react';
import { AccountBalance } from '../currency-input-container/CurrencyInputContainer';
import './CurrencyBalance.css'

const CurrencyBalance = (props: AccountBalance) => {
    const { amount, currency } = props

    return <div className="currency-balance">
        {amount} {currency}
    </div>
}


export default CurrencyBalance