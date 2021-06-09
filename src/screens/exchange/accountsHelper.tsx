import { AdjustmentType } from "../../models/enums/AdjustmentType.enum"
import { Currency } from "../../models/enums/Currency.enum"
import { RatesApiResponse } from "../../models/interfaces/RatesApiResponse.interface"
import { Account } from "../../models/interfaces/Account.interface"
import { ExchangeType } from "../../models/enums/ExchangeType.enum"
import { CurrencyContainerInput } from "../../models/interfaces/CurrencyContainerInput.interface"

export const updateAccountsOnExchangeFinished = (accounts: Account[]) => {
    return accounts.map(account => {
        if (account.adjustmentType === AdjustmentType.NEGATIVE) {
            const oldAmount = +account.amount
            const adjustment = +account.adjustment
            return { ...account, amount: (oldAmount - adjustment).toFixed(2), adjustment: '' }
        }

        if (account.adjustmentType === AdjustmentType.POSITIVE) {
            const oldAmount = +account.amount
            const adjustment = +account.adjustment
            return { ...account, amount: (oldAmount + adjustment).toFixed(2), adjustment: '' }

        }

        return { ...account }
    })
}

export const getExchangeRate = (ratesApiResponse: RatesApiResponse, newCurrency: Currency, oldCurrency: Currency): number => {
    const isOldCurrencyBaseRate = ratesApiResponse.base === oldCurrency
    const isNewCurrencyBaseRate = ratesApiResponse.base === newCurrency
    const BASE_CURRENCY_RATE = 1;

    if (!isOldCurrencyBaseRate && !isNewCurrencyBaseRate) {
        return ratesApiResponse.rates[newCurrency] / ratesApiResponse.rates[oldCurrency]
    }

    if (isOldCurrencyBaseRate && !isNewCurrencyBaseRate) {
        // from base to non-base
        return ratesApiResponse.rates[newCurrency]
    }

    if (isNewCurrencyBaseRate && !isOldCurrencyBaseRate) {
        // from non-base to base
        return BASE_CURRENCY_RATE / ratesApiResponse.rates[oldCurrency]
    }

    // from base to identity
    return BASE_CURRENCY_RATE;
}

export const updateAccountsOnAdjustAmount = (
    accounts: Account[],
    amount: string,
    updatedCurrency: Currency,
    ratesApiResponse: RatesApiResponse
) => {
    return accounts.map(account => {
        if (account.adjustmentType === AdjustmentType.NEUTRAL) {
            return { ...account }
        }

        const accountCurrency = account.currency;
        if (accountCurrency !== updatedCurrency) {
            const exchangeRate = getExchangeRate(ratesApiResponse, accountCurrency, updatedCurrency)
            const adjustment = calculateExchangeAdjustment(amount, exchangeRate)
            const notAllowed = isNegativeAdjustmentType(account) && isExceedingBalance(account, +adjustment)

            return {
                ...account,
                adjustment: adjustment,
                inputError: notAllowed ? 'exceeds balance' : ''
            }
        }

        const notAllowed = isNegativeAdjustmentType(account) && isExceedingBalance(account, +amount)
        return {
            ...account,
            adjustment: amount,
            inputError: notAllowed ? 'exceeds balance' : ''
        }

    })
}

export const updateAccountsOnChangeCurrency = (
    accounts: Account[],
    newCurrency: Currency,
    oldCurrency: Currency,
    ratesApiResponse: RatesApiResponse
) => {
    const oldAccountIndex = accounts.findIndex(account => account.currency === oldCurrency)
    const oldAccount = { ...accounts[oldAccountIndex] }
    const newAccountIndex = accounts.findIndex(account => account.currency === newCurrency)
    const newAccount = { ...accounts[newAccountIndex] }
    const oldAccountAdjustmentType = accounts[oldAccountIndex].adjustmentType
    const otherAccountAdjustmentType = oldAccountAdjustmentType === AdjustmentType.POSITIVE
        ? AdjustmentType.NEGATIVE
        : AdjustmentType.POSITIVE
    const otherAccount = { ...accounts[accounts.findIndex(account => account.adjustmentType === otherAccountAdjustmentType)] }

    return accounts.map((account, index) => {
        if (index === oldAccountIndex && oldAccountIndex !== newAccountIndex) {
            return {
                ...account,
                adjustmentType: AdjustmentType.NEUTRAL,
                adjustment: '',
                inputError: ''
            }
        }

        if (index === newAccountIndex) {
            const exchangeRate = getExchangeRate(ratesApiResponse, newCurrency, otherAccount.currency)
            const newAdjustment = calculateExchangeAdjustment(otherAccount.adjustment, exchangeRate)
            const notAllowed = isNegativeAdjustmentType(account) && isExceedingBalance(account, +newAdjustment)

            return {
                ...account,
                adjustmentType: oldAccountAdjustmentType,
                adjustment: newAdjustment,
                inputError: notAllowed ? 'exceeds balance' : ''
            }
        }

        return { ...account }
    })
}

export const updateAccountsOnToggle = (accounts: Account[]) => {
    return accounts.map(account => {
        if (account.adjustmentType === AdjustmentType.NEGATIVE) {
            return {
                ...account,
                adjustmentType: AdjustmentType.POSITIVE,
                inputError: ''
            }
        }

        if (account.adjustmentType === AdjustmentType.POSITIVE) {
            const notAllowed = isExceedingBalance(account, +account.adjustment)
            return {
                ...account,
                adjustmentType: AdjustmentType.NEGATIVE,
                inputError: notAllowed ? 'exceeds balance' : ''
            }
        }

        return { ...account }
    })
}

export const isNegativeAdjustmentType = (account: Account): boolean => {
    return account.adjustmentType === AdjustmentType.NEGATIVE
}

export const isExceedingBalance = (account: Account, adjustment: number): boolean => {
    return +account.amount < adjustment
}

export const calculateExchangeAdjustment = (amount: string, exchangeRate: number): string => {
    return (+amount * exchangeRate).toFixed(2)
}

export const findAccountByAdjustmentType = (accounts: Account[], adjustmentType: AdjustmentType): Account => {
    return { ...accounts[accounts.findIndex(account => account.adjustmentType === adjustmentType)] }
}

export const getAccountsToRender =
    (accounts: Account[], currencies: Currency[], exchangeType: ExchangeType): {
        topAccount: CurrencyContainerInput,
        bottomAccount: CurrencyContainerInput
    } => {
        const negativeAdjustingAccount = findAccountByAdjustmentType(accounts, AdjustmentType.NEGATIVE)
        const positiveAdjustingAccount = findAccountByAdjustmentType(accounts, AdjustmentType.POSITIVE)
        const currenciesWithoutNegative = currencies.filter(currency => currency !== negativeAdjustingAccount.currency)
        const currenciesWithoutPositive = currencies.filter(currency => currency !== positiveAdjustingAccount.currency)

        const isSelling = exchangeType === ExchangeType.SELL
        const topAccount = isSelling
            ? { account: negativeAdjustingAccount, currencies: currenciesWithoutPositive }
            : { account: positiveAdjustingAccount, currencies: currenciesWithoutNegative }

        const bottomAccount = isSelling
            ? { account: positiveAdjustingAccount, currencies: currenciesWithoutNegative }
            : { account: negativeAdjustingAccount, currencies: currenciesWithoutPositive }

        return { topAccount, bottomAccount }
    }
