import React, { Fragment, useState, useCallback, useEffect, createContext } from 'react';
import CurrencyInputContainer, { } from './components/currency-input-container/CurrencyInputContainer';
import CurrencyInput from './components/currency-input/CurrencyInput';
import styles from './ExchangeContainer.module.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export interface Account {
    currency: Currency;
    amount: string,
    adjustment?: string,
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
    { currency: Currency.RON, amount: '1000' },
    { currency: Currency.EURO, amount: '2000' },
    { currency: Currency.GPB, amount: '3000' },
    { currency: Currency.USD, amount: '4000' },
]

const ExchangeContainer = () => {
    // const { ExchangeContextProvider, ExchangeContextConsumer } = createContext({})
    const { inputsContainer, confirmationButton, currencyToggler, svg, h3 } = styles
    const [liveFeed, setLiveFeed] = useState('') // TODO

    const [title, setTitle] = useState<ExchangeType>(ExchangeType.SELL)
    const [arrowDirection, setArrowDirection] = useState<ArrowDirection>(ArrowDirection.DOWN)

    const [currencies, setCurrencies] = useState<Currency[]>(initialStateCurrencies)
    const [accounts, setAccounts] = useState<Account[]>(initialStateBalances)

    const [currencyToExtractFrom, setCurrencyToExtractFrom] = useState(Currency.RON)
    const [currencyToAddTo, setCurrencyToAddTo] = useState(Currency.EURO)
    const [accountInputToExtractFrom, setAccountInputToExtractFrom] = useState({
        currencies: currencies,
        account: accounts[accounts.findIndex(balance => balance.currency === currencyToExtractFrom)],

    })
    const [accountInputToAddTo, setAccountInputToAddTo] = useState({
        currencies: currencies,
        account: accounts[accounts.findIndex(balance => balance.currency === currencyToAddTo)],
    })

    const onExchangeCurrency = useCallback(() => {
        // console.log({ accounts },)
    }, [accounts])

    const onChangeAccount = (newCurrency: Currency, oldCurrency: Currency) => {
        if (oldCurrency === currencyToExtractFrom) {
            setCurrencyToExtractFrom(newCurrency)
        }

        if (oldCurrency === currencyToAddTo) {
            setCurrencyToAddTo(newCurrency)
        }
    }

    const onChangeValue = (amount: string, selectedCurrency: string) => {
        const balance = accounts[accounts.findIndex(balance => balance.currency === selectedCurrency)]
        console.log({ balance })
    }

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

    useEffect(() => {
        const newCurrencies = currencies.filter(currency => currency !== currencyToAddTo);
        const account = accounts[accounts.findIndex(balance => balance.currency === currencyToExtractFrom)];
        const newAccountToExtractFrom = { currencies: newCurrencies, account }
        console.log({ newAccountToExtractFrom })

        setAccountInputToExtractFrom(newAccountToExtractFrom)
        const currenciesForOtherInput = currencies.filter(currency => currency !== currencyToExtractFrom);
        setAccountInputToAddTo(accountToAddTo => { return { ...accountToAddTo, currencies: currenciesForOtherInput } });
    }, [currencyToExtractFrom])

    useEffect(() => {
        const newCurrencies = currencies.filter(currency => currency !== currencyToExtractFrom);
        const account = accounts[accounts.findIndex(balance => balance.currency === currencyToAddTo)];
        const newAccountToAddTo = { currencies: newCurrencies, account }
        console.log({ newAccountToAddTo })

        setAccountInputToAddTo(newAccountToAddTo)
        const currenciesForOtherInput = currencies.filter(currency => currency !== currencyToAddTo);
        setAccountInputToExtractFrom(accountToExtractFrom => { return { ...accountToExtractFrom, currencies: currenciesForOtherInput } });
    }, [currencyToAddTo])

    return <Fragment>
        {/* TITLE: SELL / BUY */}
        <h3>
            {title}
        </h3>

        {/* Market order live feed  */}


        <div className={inputsContainer}>
            <CurrencyInputContainer {...accountInputToExtractFrom} onChangeAccount={onChangeAccount} onChangeValue={onChangeValue} />

            <div className={currencyToggler} onClick={toggleArrow}>
                {(arrowDirection === ArrowDirection.DOWN) && <ArrowDownwardIcon color="primary"></ArrowDownwardIcon>}
                {(arrowDirection === ArrowDirection.UP) && <ArrowUpwardIcon color="primary"></ArrowUpwardIcon>}
            </div>

            <CurrencyInputContainer {...accountInputToAddTo} onChangeAccount={onChangeAccount} onChangeValue={onChangeValue} />
        </div>

        {/*  Confirmation button*/}
        <button className={confirmationButton} onClick={onExchangeCurrency}>{title} currency1 for currency2</button>
    </Fragment>
}


export default ExchangeContainer;
