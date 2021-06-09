import { AdjustmentType } from "../enums/AdjustmentType.enum";
import { Currency } from "../enums/Currency.enum";

export interface Account {
    inputError: string;
    currency: Currency;
    amount: string,
    adjustment: string,
    adjustmentType: AdjustmentType
}