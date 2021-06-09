import { AdjustmentType } from "../models/enums/AdjustmentType.enum"
import { ArrowDirection } from "../models/enums/ArrowDirection.enum"
import { Currency } from "../models/enums/Currency.enum"
import { Account } from "../models/interfaces/Account.interface"
import { ExchangeType } from "../models/enums/ExchangeType.enum"
import { RatesApiResponse } from "../models/interfaces/RatesApiResponse.interface"

export const buildExchangeRateTestCases = () => {
    return [
        // from base to non-base
        { from: Currency.EUR, to: Currency.USD, expected: 5 / 4 },
        { from: Currency.EUR, to: Currency.RON, expected: 5 },
        { from: Currency.EUR, to: Currency.GBP, expected: 4 / 5 },

        // // base - identity
        { from: Currency.EUR, to: Currency.EUR, expected: 1 },

        // non-base to base
        { from: Currency.RON, to: Currency.EUR, expected: 1 / 5 },
        { from: Currency.USD, to: Currency.EUR, expected: 4 / 5 },
        { from: Currency.GBP, to: Currency.EUR, expected: 5 / 4 },

        //non-base to non-base
        { from: Currency.GBP, to: Currency.RON, expected: 25 / 4 },
        { from: Currency.RON, to: Currency.GBP, expected: 4 / 25 },

        { from: Currency.GBP, to: Currency.USD, expected: 25 / 16 },
        { from: Currency.USD, to: Currency.GBP, expected: 16 / 25 },

        { from: Currency.USD, to: Currency.RON, expected: 4 },
        { from: Currency.RON, to: Currency.USD, expected: 1 / 4 },
    ]
}

export const buildExchangeCalculationTestCases = () => {
    return [
        { from: Currency.EUR, to: Currency.RON, amount: '100', expected: '500.00' },
        { from: Currency.EUR, to: Currency.GBP, amount: '100', expected: '80.00' },
        { from: Currency.EUR, to: Currency.USD, amount: '100', expected: '125.00' },

        { from: Currency.EUR, to: Currency.EUR, amount: '100', expected: '100.00' },

        { from: Currency.RON, to: Currency.EUR, amount: '100', expected: '20.00' },
        { from: Currency.USD, to: Currency.EUR, amount: '100', expected: '80.00' },
        { from: Currency.GBP, to: Currency.EUR, amount: '100', expected: '125.00' },

        { from: Currency.GBP, to: Currency.RON, amount: '100', expected: '625.00' },
        { from: Currency.RON, to: Currency.GBP, amount: '100', expected: '16.00' },

        { from: Currency.GBP, to: Currency.USD, amount: '100', expected: '156.25' },
        { from: Currency.USD, to: Currency.GBP, amount: '100', expected: '64.00' },

        { from: Currency.RON, to: Currency.USD, amount: '100', expected: '25.00' },
        { from: Currency.USD, to: Currency.RON, amount: '100', expected: '400.00' },
    ]
}

export const getInitialAccountsMock = (): Account[] => {
    return [
        { currency: Currency.RON, amount: '1000', adjustment: '', adjustmentType: AdjustmentType.POSITIVE, inputError: '' },
        { currency: Currency.EUR, amount: '2000', adjustment: '', adjustmentType: AdjustmentType.NEGATIVE, inputError: '' },
        { currency: Currency.GBP, amount: '3000', adjustment: '', adjustmentType: AdjustmentType.NEUTRAL, inputError: '' },
        { currency: Currency.USD, amount: '4000', adjustment: '', adjustmentType: AdjustmentType.NEUTRAL, inputError: '' },
    ]
}

export const getInitialExchangeTypeMock = () => {
    return {
        type: ExchangeType.SELL,
        direction: ArrowDirection.DOWN
    }
}

export const getInitialExchangeRatesMock = (): RatesApiResponse => {
    return {
        base: Currency.EUR,
        date: '',
        rates: {
            [Currency.RON]: 5,
            [Currency.USD]: 1.25,
            [Currency.GBP]: 0.8,
            [Currency.EUR]: 1
        },
        success: false,
        timestamp: 0
    }
}

export const getCurrenciesMock = (): Currency[] => {
    return [
        Currency.RON,
        Currency.EUR,
        Currency.GBP,
        Currency.USD
    ]
}