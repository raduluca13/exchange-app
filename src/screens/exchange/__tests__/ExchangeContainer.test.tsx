import { create } from "react-test-renderer";
// import { render, screen, fireEvent } from '@testing-library/react';
import '../ExchangeContainer'
import ExchangeContainer from '../ExchangeContainer';
// import TestRenderer from 'react-test-renderer';
import CurrencyInput, { CurrencyInputProps } from '../components/currency-input/CurrencyInput';

function MockedCurrencyInput(props: CurrencyInputProps) {
    return <div>
        <input
            data-testid="input-test"
            value={''}
        // onChange={onChangeAmount} 
        />
        <label >
            {/* {selectedCurrencyLabel} */}
        </label>

    </div>
}

// jest.mock('../components/currency-input/CurrencyInput', () => {
//     return { CurrencyInput: MockedCurrencyInput };
// });

describe('Given an Exchange Container component', () => {

    // afterAll(() => {
    //     jest.resetAllMocks();
    // });

    it('should render works', () => {
        const exchangeContainerRoot = create(<ExchangeContainer />).root;
        const currencyInput = exchangeContainerRoot.findAll(node => node.type === CurrencyInput)

        expect(currencyInput).toBeDefined();
        expect(true).toBeTruthy()
    })

});