import { create } from "react-test-renderer";
import { Currency } from "../../../../../models/enums/Currency.enum";
import CurrencyDropdown, { CurrencyDropdownProps } from "../CurrencyDropdown";

describe("Given A Currency Dropdown component", () => {
    const props: CurrencyDropdownProps = {
        currencies: [Currency.EUR, Currency.GBP, Currency.USD],
        selectedValue: 'EUR',
        onChangeSelection: jest.fn()
    }

    const currencyDropdownRoot = create(<CurrencyDropdown {...props} />).root;
    const select = currencyDropdownRoot.findByType("select");

    it('should have the proper selected value', () => {
        expect(select.props.value).toEqual(props.selectedValue)
    })

    it('should render a number of option items equal to the available currencies list length', () => {
        const optionList = currencyDropdownRoot.findAll(node => node.type === 'option')
        expect(optionList.length).toEqual(3);
    })
});