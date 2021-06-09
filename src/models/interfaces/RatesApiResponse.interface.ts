import { Currency } from "../enums/Currency.enum";
import { CurrencyRates } from "../types/CurrencyRates.type";

export interface RatesApiResponse {
    base: Currency;
    date: string;
    rates: CurrencyRates;
    success: boolean;
    timestamp: number;
}