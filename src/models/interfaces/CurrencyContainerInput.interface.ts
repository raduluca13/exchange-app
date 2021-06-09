import { Currency } from "../enums/Currency.enum";
import {Account} from "../interfaces/Account.interface"

export interface CurrencyContainerInput {
    currencies: Currency[];
    account: Account;
}