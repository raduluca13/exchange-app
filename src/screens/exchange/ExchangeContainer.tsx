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

export enum ExchangeType {
    BUY = 'BUY',
    SELL = 'SELL'
}

export enum Currency {
    EURO = 'EURO',
    RON = 'RON',
    GPB = 'GPB',
    USD = 'USD'
}

const ExchangeContainer = () => {
    // const { ExchangeContextProvider, ExchangeContextConsumer } = createContext({})
    const [currencies, setCurrencies] = useState<Currency[]>([Currency.RON, Currency.EURO, Currency.GPB, Currency.RON])
    const [accountBalances, setAccountBalances] = useState<AccountBalance[]>([
        { currency: Currency.EURO, amount: '1000' },
        { currency: Currency.GPB, amount: '2000' },
        { currency: Currency.USD, amount: '3000' },
        { currency: Currency.RON, amount: '4000' },
    ])
    const [title, setTitle] = useState<ExchangeType>(ExchangeType.SELL)
    const [arrowDirection, setArrowDirection] = useState<ArrowDirection>(ArrowDirection.DOWN)

    useEffect(() => {
        if (!accountBalances.length) {
            setAccountBalances(currencies.map(currency => { return { currency, amount: '15' } }))
        }
    }, [accountBalances, currencies])

    const toggleArrow = useCallback(() => {
        if (arrowDirection === ArrowDirection.UP) {
            setArrowDirection(ArrowDirection.DOWN)
            setTitle(ExchangeType.SELL)
        }

        if (arrowDirection === ArrowDirection.DOWN) {
            setArrowDirection(ArrowDirection.UP)
            setTitle(ExchangeType.BUY)
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
