import { create } from "react-test-renderer";
import { AdjustmentType } from "../../../../../models/enums/AdjustmentType.enum";
import { Currency } from "../../../../../models/enums/Currency.enum";
import { Account } from "../../../../../models/interfaces/Account.interface";

import CurrencyBalance from "../CurrencyBalance";

describe("Given A Currency Balance component", () => {

    it('should display positive sign if adjustmentType is positive', () => {
        const props: Account = {
            inputError: '',
            currency: Currency.EUR,
            amount: '22',
            adjustment: '10',
            adjustmentType: AdjustmentType.POSITIVE
        }

        const CurrencyBalanceRoot = create(<CurrencyBalance {...props} />).root;
        const span = CurrencyBalanceRoot.findByType("span");

        expect(span.props.className).toEqual('currencyBalance')
        expect(span.children.includes(`${props.amount} ${props.currency} + ${props.adjustment}`)).toBeTruthy();
    })

    it('should display negative sign if adjustmentType is negative', () => {
        const props: Account = {
            inputError: '',
            currency: Currency.EUR,
            amount: '22',
            adjustment: '10',
            adjustmentType: AdjustmentType.NEGATIVE
        }

        const CurrencyBalanceRoot = create(<CurrencyBalance {...props} />).root;
        const span = CurrencyBalanceRoot.findByType("span");

        expect(span.children.includes(`${props.amount} ${props.currency} - ${props.adjustment}`)).toBeTruthy();
    })

})