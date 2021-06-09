import { Fragment, useState, useEffect } from 'react';
import CurrencyInputContainer from './components/currency-input-container/CurrencyInputContainer';
import styles from './ExchangeContainer.module.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {
    findAccountByAdjustmentType,
    getAccountsToRender,
    updateAccountsOnAdjustAmount,
    updateAccountsOnChangeCurrency,
    updateAccountsOnExchangeFinished,
    updateAccountsOnToggle
} from './accountsHelper';
import { Account } from '../../models/interfaces/Account.interface';
import { Currency } from '../../models/enums/Currency.enum';
import { AdjustmentType } from '../../models/enums/AdjustmentType.enum';
import { ExchangeType } from '../../models/enums/ExchangeType.enum';
import { ArrowDirection } from '../../models/enums/ArrowDirection.enum';
import {
    getInitialExchangeRatesMock,
    getInitialExchangeTypeMock,
    getInitialAccountsMock,
    getCurrenciesMock
} from '../../test-fakes/fakes';
import { InputPositionErrorMap } from '../../models/types/InputPositionErrorMap.type';
import { InputPosition } from '../../models/enums/InputPosition.enum';

const FIXER_IO_API = 'http://data.fixer.io/api/latest'
const FIXER_IO_API_KEY = 'd9acfabb4baf13aab8883a8d13c8de89'

// TODO - don't really care about types. this mock should be replaced at a later moment; keep in sync with initialAccounts
const initialStateCurrencies = getCurrenciesMock()
const initialAccounts = getInitialAccountsMock()
const initialExchange = getInitialExchangeTypeMock()
const initialResponse = getInitialExchangeRatesMock()
const { inputsContainer, confirmationButton, disabledButton, currencyToggler, svg, h3 } = styles

const ExchangeContainer = () => {
    // console.log(' - Exchange Container RENDERED - ', Date.now())
    // const { ExchangeContextProvider, ExchangeContextConsumer } = createContext({})
    const [liveFeed, setLiveFeed] = useState('') // TODO
    const [ratesApiResponse, setRatesApiResponse] = useState(initialResponse)
    const [exchangeIsValid, setExchangeIsValid] = useState(false) // let's say exchanging amount 0 is ok for now

    const [title, setTitle] = useState<ExchangeType>(initialExchange.type)
    const [arrowDirection, setArrowDirection] = useState<ArrowDirection>(initialExchange.direction)
    const [currencies, setCurrencies] = useState<Currency[]>(initialStateCurrencies)
    const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
    const [errorMap, setErrorMap] = useState<InputPositionErrorMap>({
        [InputPosition.TOP]: true,
        [InputPosition.BOTTOM]: true
    })

    // rates reload.... TODO - api limit reached :(
    // const ratesFetcher = async () => {
    //     // console.log('- calling API -', Date.now())
    //     const wantedCurrencies = Object.keys(Currency).join(',')
    //     const url = `${FIXER_IO_API}?access_key=${FIXER_IO_API_KEY}&symbols=${wantedCurrencies}`
    //     const response = await fetch(url)
    //     const json = await response.json();
    //     setRatesApiResponse(json);
    // }

    // useEffect(() => {
    //     ratesFetcher();
    //     let interval = setInterval(() => ratesFetcher(), (1000 * 10))
    //     //destroy interval on unmount
    //     return () => clearInterval(interval)
    // }, [])

    const onAdjustAmount = (amount: string, selectedCurrency: Currency) => {
        setAccounts(updateAccountsOnAdjustAmount(accounts, amount, selectedCurrency, ratesApiResponse))
    }

    const onChangeAccount = (newCurrency: Currency, oldCurrency: Currency) => {
        setAccounts(updateAccountsOnChangeCurrency(accounts, newCurrency, oldCurrency, ratesApiResponse))
    }

    const onExchange = () => {
        const newAccounts = updateAccountsOnExchangeFinished(accounts)
        setAccounts(newAccounts)
    }

    const toggleArrow = () => {
        if (arrowDirection === ArrowDirection.UP) {
            setArrowDirection(ArrowDirection.DOWN)
            setTitle(ExchangeType.SELL)
        } else {
            setArrowDirection(ArrowDirection.UP)
            setTitle(ExchangeType.BUY)
        }

        const newAccounts = updateAccountsOnToggle(accounts)
        setAccounts(newAccounts)
    }



    const onValidation = (hasError: boolean, inputPosition: InputPosition) => {
        const newErrorMap = { ...errorMap, [inputPosition]: hasError }
        setErrorMap(newErrorMap)
    }

    useEffect(() => {
        const hasSomeErr = accounts.map(account => !account.inputError.length).includes(false)
        setExchangeIsValid(!hasSomeErr)
    }, [accounts])

    const { topAccount, bottomAccount } = getAccountsToRender(accounts, currencies, title)

    // TODO - return objects from

    return <Fragment>
        {/* TITLE: SELL / BUY */}
        <h3>
            {title} {topAccount.account.currency}
        </h3>

        {/* Market order live feed  */}


        <div className={inputsContainer}>
            <CurrencyInputContainer
                inputPosition={InputPosition.TOP}
                {...topAccount}
                onChangeAccount={onChangeAccount}
                onAdjustAmount={onAdjustAmount}
                onValidation={onValidation} />

            <div className={currencyToggler} onClick={toggleArrow}>
                {(arrowDirection === ArrowDirection.DOWN) && <ArrowDownwardIcon color="primary"></ArrowDownwardIcon>}
                {(arrowDirection === ArrowDirection.UP) && <ArrowUpwardIcon color="primary"></ArrowUpwardIcon>}
            </div>

            <CurrencyInputContainer
                inputPosition={InputPosition.BOTTOM}
                {...bottomAccount}
                onChangeAccount={onChangeAccount}
                onAdjustAmount={onAdjustAmount}
                onValidation={onValidation} />
        </div>

        {/*  Confirmation button*/}
        {
            exchangeIsValid
                ?
                <button
                    className={confirmationButton}
                    onClick={onExchange}>
                    {title} {topAccount.account.currency} for {bottomAccount.account.currency}
                </button>
                :
                <button
                    className={disabledButton}
                    disabled>
                    {title} {topAccount.account.currency} for {bottomAccount.account.currency}
                </button>
        }

    </Fragment>
}


export default ExchangeContainer;