import React, { Fragment, useState, useCallback, useEffect, createContext, useMemo } from 'react';
import CurrencyInputContainer, { } from './components/currency-input-container/CurrencyInputContainer';
import CurrencyInput from './components/currency-input/CurrencyInput';
import styles from './ExchangeContainer.module.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const FIXER_IO_API = 'http://data.fixer.io/api/latest'
const FIXER_IO_API_KEY = 'd9acfabb4baf13aab8883a8d13c8de89'

export type CurrencyRates = Record<Currency, number>;

export interface RatesApiResponse {
    base: Currency;
    date: string;
    rates: CurrencyRates;
    success: boolean;
    timestamp: number;
}

export interface Account {
    currency: Currency;
    amount: string,
    adjustment: string,
    adjustmentType?: AdjustmentType
}

export interface CurrencyContainerInput {
    currencies: Currency[];
    account: Account;
}

export enum AdjustmentType {
    POSITIVE = 'POSITIVE',
    NEGATIVE = 'NEGATIVE',
    NEUTRAL = 'NEUTRAL' // TESTING PURPOSE - TODO - remove at cleanup
}
export enum ArrowDirection {
    UP = 'UP',
    DOWN = 'DOWN'
}

export enum ExchangeType {
    BUY = 'BUY',
    SELL = 'SELL'
}

export enum Currency {
    RON = 'RON',
    EUR = 'EUR',
    GBP = 'GBP',
    USD = 'USD'
}


// TODO - don't really care about types. this mock should be replaced at a later moment; keep in sync with initialStateBalances
const initialStateCurrencies = [
    Currency.RON,
    Currency.EUR,
    Currency.GBP,
    Currency.USD
]
const initialStateBalances = [
    { currency: Currency.RON, amount: '1000', adjustment: '', adjustmentType: AdjustmentType.POSITIVE },
    { currency: Currency.EUR, amount: '2000', adjustment: '', adjustmentType: AdjustmentType.NEGATIVE },
    { currency: Currency.GBP, amount: '3000', adjustment: '', adjustmentType: AdjustmentType.NEUTRAL },
    { currency: Currency.USD, amount: '4000', adjustment: '', adjustmentType: AdjustmentType.NEUTRAL },
]
const initialCurrencyAdjustments = {
    positiveAdjustedCurrency: Currency.RON,
    negativeAdjustedCurrency: Currency.EUR
}
const initialExchange = {
    type: ExchangeType.SELL,
    direction: ArrowDirection.DOWN
}
const initialResponse = {
    base: Currency.EUR,
    date: '',
    rates: {
        [Currency.RON]: 2,
        [Currency.USD]: 3,
        [Currency.GBP]: 4,
        [Currency.EUR]: 1
    },
    success: false,
    timestamp: 0
}



const ExchangeContainer = () => {
    // console.log(' - Exchange Container RENDERED - ', Date.now())
    // const { ExchangeContextProvider, ExchangeContextConsumer } = createContext({})
    const { inputsContainer, confirmationButton, currencyToggler, svg, h3 } = styles
    const [liveFeed, setLiveFeed] = useState('') // TODO
    const [ratesApiResponse, setRatesApiResponse] = useState(initialResponse)


    const [title, setTitle] = useState<ExchangeType>(initialExchange.type)
    const [arrowDirection, setArrowDirection] = useState<ArrowDirection>(initialExchange.direction)
    const [currencies, setCurrencies] = useState<Currency[]>(initialStateCurrencies)
    const [accounts, setAccounts] = useState<Account[]>(initialStateBalances)

    const ratesFetcher = async () => {
        // console.log('- calling API -', Date.now())
        const wantedCurrencies = Object.keys(Currency).join(',')
        const url = `${FIXER_IO_API}?access_key=${FIXER_IO_API_KEY}&symbols=${wantedCurrencies}`
        const response = await fetch(url)
        const json = await response.json();
        setRatesApiResponse(json);
    }


    useEffect(() => {
        ratesFetcher();
        let interval = setInterval(() => ratesFetcher(), (1000 * 10))
        // console.log('interval descriptor: ', interval)
        //destroy interval on unmount
        return () => clearInterval(interval)
    }, [])

    const onChangeValue = useCallback((amount: string, selectedCurrency: Currency, changed: number) => {
        setAccounts(accounts => {
            return accounts.map(account => {
                const accountCurrency = account.currency;
                if (account.adjustmentType !== AdjustmentType.NEUTRAL) {
                    if (accountCurrency === selectedCurrency) {
                        return { ...account, adjustment: amount }
                    } else {
                        const isBase = ratesApiResponse.base === accountCurrency

                        const exchangeRate = isBase
                            ? 1 / ratesApiResponse.rates[selectedCurrency]
                            : ratesApiResponse.rates[accountCurrency]
                        return { ...account, adjustment: (+amount * exchangeRate).toString() }

                    }
                }

                return { ...account }
            })
        })

    }, [ratesApiResponse])

    const toggleArrow = useCallback(() => {
        if (arrowDirection === ArrowDirection.UP) {
            setArrowDirection(ArrowDirection.DOWN)
            setTitle(ExchangeType.SELL)
        } else {
            setArrowDirection(ArrowDirection.UP)
            setTitle(ExchangeType.BUY)
        }

        setAccounts(accounts => {
            const mapped = accounts.map(account => {
                if (account.adjustmentType === AdjustmentType.NEGATIVE) {
                    return { ...account, adjustmentType: AdjustmentType.POSITIVE }
                }

                if (account.adjustmentType === AdjustmentType.POSITIVE) {
                    return { ...account, adjustmentType: AdjustmentType.NEGATIVE }

                }

                return { ...account }
            })

            return mapped
        })
    }, [arrowDirection])

    const onChangeAccount = useCallback((newCurrency: Currency, oldCurrency: Currency) => {
        setAccounts(accounts => {
            const oldCurrencyIndex = accounts.findIndex(account => account.currency === oldCurrency)
            const newCurrencyIndex = accounts.findIndex(account => account.currency === newCurrency)
            const oldCurrencyState = accounts[oldCurrencyIndex].adjustmentType

            const mappedAccounts = accounts.map((account, index) => {
                if (index === oldCurrencyIndex && oldCurrencyIndex !== newCurrencyIndex) {
                    return { ...account, adjustmentType: AdjustmentType.NEUTRAL, adjustment: '' }
                }

                if (index === newCurrencyIndex) {
                    return { ...account, adjustmentType: oldCurrencyState }
                }

                return { ...account }
            })
            return mappedAccounts
        })
    }, [])

    // useEffect(() => {
    //     if (ratesApiResponse.success) {
    //         setAccounts(accounts => {
    //             return accounts.map(account => {
    //                 const accountCurrency = account.currency
    //                 if (accountCurrency !== ratesApiResponse.base && account.adjustmentType !== AdjustmentType.NEUTRAL) {
    //                     const exchangeRate = ratesApiResponse.rates[accountCurrency]
    //                     const oldAdjustment = account.adjustment
    //                     return { ...account, adjustment: (+oldAdjustment * exchangeRate).toString() }
    //                 }

    //                 return { ...account }
    //             })
    //         })
    //     }
    // }, [ratesApiResponse])


    const negativeAdjustingAccount = { ...accounts[accounts.findIndex(account => account.adjustmentType === AdjustmentType.NEGATIVE)] }
    const positiveAdjustingAccount = { ...accounts[accounts.findIndex(account => account.adjustmentType === AdjustmentType.POSITIVE)] }
    const currenciesWithoutNegative = currencies.filter(currency => currency !== negativeAdjustingAccount.currency)
    const currenciesWithoutPositive = currencies.filter(currency => currency !== positiveAdjustingAccount.currency)

    const isSelling = title === ExchangeType.SELL

    const topAccount = isSelling
        ? { account: negativeAdjustingAccount, currencies: currenciesWithoutPositive }
        : { account: positiveAdjustingAccount, currencies: currenciesWithoutNegative }

    const bottomAccount = isSelling
        ? { account: positiveAdjustingAccount, currencies: currenciesWithoutNegative }
        : { account: negativeAdjustingAccount, currencies: currenciesWithoutPositive }

    return <Fragment>
        {/* TITLE: SELL / BUY */}
        <h3>
            {title} {topAccount.account.currency}
        </h3>

        {/* Market order live feed  */}


        <div className={inputsContainer}>
            <CurrencyInputContainer index={0} {...topAccount} onChangeAccount={onChangeAccount} onChangeValue={onChangeValue} />

            <div className={currencyToggler} onClick={toggleArrow}>
                {(arrowDirection === ArrowDirection.DOWN) && <ArrowDownwardIcon color="primary"></ArrowDownwardIcon>}
                {(arrowDirection === ArrowDirection.UP) && <ArrowUpwardIcon color="primary"></ArrowUpwardIcon>}
            </div>

            <CurrencyInputContainer index={1} {...bottomAccount} onChangeAccount={onChangeAccount} onChangeValue={onChangeValue} />
        </div>

        {/*  Confirmation button*/}
        <button className={confirmationButton} onClick={() => { }}>{title} {topAccount.account.currency} for {bottomAccount.account.currency}</button>
    </Fragment>
}


export default ExchangeContainer;
