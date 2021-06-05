import React, { Fragment, useState, useCallback, useEffect, createContext } from 'react';
import CurrencyInputContainer, { AccountBalance } from './components/currency-input-container/CurrencyInputContainer';
import CurrencyInput from './components/currency-input/CurrencyInput';
import './ExchangeContainer.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export enum ArrowDirection {
    UP = 'up',
    DOWN = 'down'
}

const ExchangeContainer = () => {
    // const { ExchangeContextProvider, ExchangeContextConsumer } = createContext({})
    const [currencies, setCurrencies] = useState<string[]>(['RON', 'GPB', 'EURO', 'USD'])
    const [accountBalances, setAccountBalances] = useState<AccountBalance[]>([])
    const [title, setTitle] = useState("Sell")
    const [arrowDirection, setArrowDirection] = useState<ArrowDirection>(ArrowDirection.DOWN)

    useEffect(() => {
        if (!accountBalances.length) {
            setAccountBalances(currencies.map(currency => { return { currency, amount: 15 } }))
        }
    }, [accountBalances, currencies])

    const toggleArrow = useCallback(() => {
        if (arrowDirection === ArrowDirection.UP) {
            setArrowDirection(ArrowDirection.DOWN)
        }

        if (arrowDirection === ArrowDirection.DOWN) {
            setArrowDirection(ArrowDirection.UP)
        }
    }, [arrowDirection])

    return <Fragment>
        {/* TITLE: SELL / BUY */}
        <h3>
            {title}
        </h3>

        {/* Market order live feed  */}
        <div className="inputs-container">
            <CurrencyInputContainer currencies={currencies} accountBalances={accountBalances} />
            <div className='currency-toggler' onClick={toggleArrow}>
                {(arrowDirection === ArrowDirection.DOWN) && <ArrowDownwardIcon color="primary"></ArrowDownwardIcon>}
                {(arrowDirection === ArrowDirection.UP) && <ArrowUpwardIcon color="primary"></ArrowUpwardIcon>}
            </div>
            <CurrencyInputContainer currencies={currencies} accountBalances={accountBalances} />
        </div>

        {/*  Confirmation button*/}
        <button className='confirmation-button' type="submit">{title} currency1 for currency2</button>
    </Fragment>
}


export default ExchangeContainer;
