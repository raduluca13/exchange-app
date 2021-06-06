import React, { useState, useEffect } from 'react';
import { Account, AdjustmentType } from '../../ExchangeContainer';

import styles from './CurrencyBalance.module.css'


const CurrencyBalance = (props: Account) => {
    const { currencyBalanceContainer, currencyBalance } = styles
    const { amount, currency, adjustment, adjustmentType } = props

    const [adjustmentSign, setAdjustmentSign] = useState('')

    useEffect(() => {
        if (adjustmentType === AdjustmentType.NEGATIVE) {
            setAdjustmentSign("-")
        }
        if (adjustmentType === AdjustmentType.POSITIVE) {
            setAdjustmentSign("+")
        }
    }, [adjustmentType])


    return <div className={currencyBalanceContainer}>
        <span className={currencyBalance}>{amount} {currency} {adjustmentSign} {adjustment}</span>
    </div>
}


export default CurrencyBalance