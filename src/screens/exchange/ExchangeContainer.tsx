import React, { Fragment, useState, useCallback, useEffect, createContext } from 'react';
import CurrencyInputContainer, { } from './components/currency-input-container/CurrencyInputContainer';
import CurrencyInput from './components/currency-input/CurrencyInput';
import './ExchangeContainer.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export interface AccountBalance {
    currency: Currency;
    amount: string,
    balanceIndex: number
}

export enum ArrowDirection {
    UP = 'up',
    DOWN = 'down'
}

export enum ExchangeType {
    BUY = 'BUY',
    SELL = 'SELL'
}

export enum Currency {
    RON = 'RON',
    EURO = 'EURO',
    GPB = 'GPB',
    USD = 'USD'
}

const initialStateCurrencies = [
    Currency.RON,
    Currency.EURO,
    Currency.GPB,
    Currency.USD
]

const initialStateBalances = [
    { currency: Currency.RON, amount: '1000', balanceIndex: 0 },
    { currency: Currency.EURO, amount: '2000', balanceIndex: 1 },
    { currency: Currency.GPB, amount: '3000', balanceIndex: 2 },
    { currency: Currency.USD, amount: '4000', balanceIndex: 3 },
]

const ExchangeContainer = () => {
    // const { ExchangeContextProvider, ExchangeContextConsumer } = createContext({})
    const [liveFeed, setLiveFeed] = useState('') // TODO
    const [currencies, setCurrencies] = useState<Currency[]>(initialStateCurrencies)
    const [accountBalances, setAccountBalances] = useState<AccountBalance[]>(initialStateBalances)
    const [title, setTitle] = useState<ExchangeType>(ExchangeType.SELL)
    const [arrowDirection, setArrowDirection] = useState<ArrowDirection>(ArrowDirection.DOWN)

    const onExchangeCurrency = useCallback(() => {
        // console.log({ accountBalances },)
    }, [accountBalances])

    const onChangeAccount = (currency: string, previousBalanceIndex: number) => {
        const newBalances = [...accountBalances]
        const newBalanceIndex = newBalances.findIndex(balance => balance.currency === currency)

        setInputs(inputs => {
            const newInputs = [...inputs]
            const replacedInputIndex = inputs.findIndex(input => input.accountBalance.balanceIndex === previousBalanceIndex)

            newInputs[replacedInputIndex].accountBalance = accountBalances[newBalanceIndex]

            return newInputs
        })
    }

    const [inputs, setInputs] = useState([
        {
            currencies: currencies,
            accountBalance: accountBalances[0],
            onChangeAccount
        },
        {
            currencies: currencies,
            accountBalance: accountBalances[1],
            onChangeAccount
        }
    ])
    // useEffect(() => {
    //     if (!accountBalances.length) {
    //         setAccountBalances(currencies.map(currency => { return { currency, amount: '15' } }))
    //     }
    // }, [accountBalances, currencies])


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
            <CurrencyInputContainer {...inputs[0]} />
            <div className='currency-toggler' onClick={toggleArrow}>
                {(arrowDirection === ArrowDirection.DOWN) && <ArrowDownwardIcon color="primary"></ArrowDownwardIcon>}
                {(arrowDirection === ArrowDirection.UP) && <ArrowUpwardIcon color="primary"></ArrowUpwardIcon>}
            </div>
            <CurrencyInputContainer {...inputs[1]} />
        </div>

        {/*  Confirmation button*/}
        <button className='confirmation-button' onClick={onExchangeCurrency}>{title} currency1 for currency2</button>
    </Fragment>
}


export default ExchangeContainer;
