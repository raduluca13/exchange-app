import { RatesApiResponse } from "../../../models/interfaces/RatesApiResponse.interface"
import { getInitialExchangeRatesMock, buildExchangeRateTestCases, buildExchangeCalculationTestCases, getInitialAccountsMock } from "../../../test-fakes/fakes"
import { getExchangeRate, calculateExchangeAdjustment, updateAccountsOnChangeCurrency, updateAccountsOnAdjustAmount } from "../accountsHelper"
import { Account } from '../../../models/interfaces/Account.interface';
import { Currency } from "../../../models/enums/Currency.enum";
import { AdjustmentType } from "../../../models/enums/AdjustmentType.enum";

describe('Given accounts Helper', () => {

  describe('when selecting another account', () => {
    const ratesApiResponse: RatesApiResponse = getInitialExchangeRatesMock()
    const initialAccounts: Account[] = getInitialAccountsMock()

    it('then should properly set error', () => { })

    it('then should properly ', () => { })

    it('then should properly set adjustment for other account based on conversion rate', () => { })
  })

  describe('when calculating exchangeRate', () => {
    const ratesApiResponse: RatesApiResponse = getInitialExchangeRatesMock()
    const initialAccounts: Account[] = getInitialAccountsMock()

    // ARRANGE
    const exchangeRateTests = buildExchangeRateTestCases()
    exchangeRateTests.forEach(testCase => {
      const { from, to, expected } = testCase

      it(`should return ${expected} for: ${from} -> to: ${to}`, () => {
        // ACT
        const result = getExchangeRate(ratesApiResponse, to, from)
        //ASSERT
        expect(result).toBe(expected);

      })
    })
  })

  describe('when calculating adjustment at exchangeRate', () => {
    const ratesApiResponse: RatesApiResponse = getInitialExchangeRatesMock()
    const initialAccounts: Account[] = getInitialAccountsMock()
    // ARRANGE
    const amountExchangeTests = buildExchangeCalculationTestCases()
    amountExchangeTests.forEach(testCase => {
      const { from, to, amount, expected } = testCase

      it(`should return ${expected} when exchanging from ${from} to ${to}`, () => {
        // ACT
        const result = calculateExchangeAdjustment(amount, getExchangeRate(ratesApiResponse, to, from))

        // ASSERT
        expect(result).toBe(expected)
      })
    });
  });




  // TODO - no visible bugs here - let it last
  xdescribe('when adjusting amount of one account', () => {
    const ratesApiResponse: RatesApiResponse = getInitialExchangeRatesMock()
    const initialAccounts: Account[] = getInitialAccountsMock()

    it('then it should update amount with exchangeRate applied', () => {
      const amount = '2000.01' // a bit over the limit
      const currency = Currency.EUR
      const resultingAccounts = updateAccountsOnAdjustAmount(initialAccounts, amount, currency, ratesApiResponse)

      resultingAccounts.forEach((resultingAccount: Account, index: number) => {
        if (resultingAccount.adjustmentType === AdjustmentType.NEUTRAL) {
          expect(resultingAccount.adjustment).toEqual('')
          expect(resultingAccount.inputError).toEqual('')
        }

        if (resultingAccount.adjustmentType === AdjustmentType.POSITIVE) {
          expect(resultingAccount.adjustment).toBe(getExchangeRate(ratesApiResponse, resultingAccount.currency, currency) * +initialAccounts[index].amount)
          expect(resultingAccount.inputError.length).toBe(0)
        }


        if (resultingAccount.adjustmentType === AdjustmentType.NEGATIVE) {
          expect(resultingAccount.adjustment).toBe(getExchangeRate(ratesApiResponse, resultingAccount.currency, currency) * +initialAccounts[index].amount)
          expect(resultingAccount.inputError.length).toBeGreaterThan(0)
        }
      })

    })

    it('then should properly set error', () => {

    })

    it('then should properly ', () => {

    })

    it('then should properly set adjustment for other account based on conversion rate', () => {

    })


  })
})

