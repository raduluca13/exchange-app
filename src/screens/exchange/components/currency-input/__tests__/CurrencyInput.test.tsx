import { create } from "react-test-renderer";
import CurrencyInput, { CurrencyInputProps } from "../CurrencyInput";

describe("Given A Currency Input component", () => {

    describe('when receives error', () => {
        const props: CurrencyInputProps = {
            error: 'exceeds balance',
            selectedCurrencyLabel: '',
            selectedValue: '999',
            onChangeAmount: jest.fn()
        }

        const currencyInputRoot = create(<CurrencyInput {...props} />).root;
        const input = currencyInputRoot.findByType("input");
        const span = currencyInputRoot.findByType("span");
        const label = currencyInputRoot.findByType("label");

        test('input should have error class', () => {
            expect(input.props.className).toEqual("currencyInputWithoutValue");
        })

        test('input has proper value', () => {
            expect(input.props.value).toEqual(props.selectedValue);
        })

        test('label should have error class', () => {
            expect(label.props.className).toEqual("currencyInputLabelWithoutValue");
        })

        test('span should have error class', () => {
            expect(span.props.className).toEqual("currencyInputError");
        })
    });

    describe("when receives no error", () => {
        const props: CurrencyInputProps = {
            error: '',
            selectedCurrencyLabel: '',
            selectedValue: '999',
            onChangeAmount: jest.fn()
        }

        const currencyInputRoot = create(<CurrencyInput {...props} />).root;
        const input = currencyInputRoot.findByType("input");
        const label = currencyInputRoot.findByType("label");

        test('input should NOT have error class', () => {
            expect(input.props.className).toEqual("currencyInputWithValue");
        })
        
        test('input has proper value', () => {
            expect(input.props.value).toEqual(props.selectedValue);
        })

        test('label should NOT have error class', () => {
            expect(label.props.className).toEqual("currencyInputLabelWithValue");
        })

        test('span should NOT have error class', () => {
            expect(() => currencyInputRoot.findByType("span")).toThrow();
        })
    })

})