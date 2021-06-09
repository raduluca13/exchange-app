import { fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { AdjustmentType } from "../../../../../models/enums/AdjustmentType.enum";
import { Currency } from "../../../../../models/enums/Currency.enum";
import { InputPosition } from "../../../../../models/enums/InputPosition.enum";
import CurrencyInput, { CurrencyInputProps } from "../../currency-input/CurrencyInput";
import { Account } from "../../../../../models/interfaces/Account.interface";
import CurrencyInputContainer, { CurrencyInputContainerProps } from "../CurrencyInputContainer";
// const TestRenderer = require('react-test-renderer');


// jest.mock('../../currency-input/CurrencyInput', () => {
//     return {
//         CurrencyInput: (props: CurrencyInputProps) => {
//             return <div>
//                 <div>
//                     <input
//                         value={props.selectedValue}
//                         onChange={props.onChangeAmount} />
//                     <label>
//                         {props.selectedCurrencyLabel}
//                     </label>

//                 </div>
//                 <div>
//                     {props.error.length > 0 && <span>{props.error}</span>}
//                 </div>
//             </div>
//         }
//     };
// });

describe('Given a CurrencyInputContainer Component', () => {
    describe('when there are no errors', () => {
        const props: CurrencyInputContainerProps = {
            inputPosition: {} as InputPosition,
            currencies: [Currency.EUR, Currency.GBP, Currency.USD] as Currency[],
            account: {
                inputError: '',
                currency: Currency.EUR,
                amount: '',
                adjustment: '',
                adjustmentType: AdjustmentType.POSITIVE
            } as Account,
            onChangeAccount: jest.fn(),
            onAdjustAmount: jest.fn(),
            onValidation: jest.fn()
        }

        const currencyInputContainerRoot = create(<CurrencyInputContainer {...props}></CurrencyInputContainer>).root

        it('should create', () => {
            expect(currencyInputContainerRoot).toBeDefined();
        })

        it('should render one input', () => {
            expect(currencyInputContainerRoot.findAllByType("input")).toHaveLength(1)
        })

        it('should render one dropdown', () => {
            expect(currencyInputContainerRoot.findAllByType("select")).toHaveLength(1)
        })

        it('should render only one span by default for balance', () => {
            expect(currencyInputContainerRoot.findAllByType("span")).toHaveLength(1)
        })
    })

    describe('when there are errors', () => {
        const props: CurrencyInputContainerProps = {
            inputPosition: {} as InputPosition,
            currencies: [Currency.EUR, Currency.GBP, Currency.USD] as Currency[],
            account: {
                inputError: 'error',
                currency: Currency.EUR,
                amount: '',
                adjustment: '',
                adjustmentType: AdjustmentType.POSITIVE
            } as Account,
            onChangeAccount: jest.fn(),
            onAdjustAmount: jest.fn(),
            onValidation: jest.fn()
        }

        const currencyInputContainerRoot = create(<CurrencyInputContainer {...props}></CurrencyInputContainer>).root
        it('should create', () => {
            expect(currencyInputContainerRoot).toBeDefined();
        })

        it('should render one input', () => {
            expect(currencyInputContainerRoot.findAllByType("input")).toHaveLength(1)
        })

        it('should render one dropdown', () => {
            expect(currencyInputContainerRoot.findAllByType("select")).toHaveLength(1)
        })

        it('should render two spans, one for balance and one for error', () => {
            expect(currencyInputContainerRoot.findAllByType("span")).toHaveLength(2)
        })
    })
})