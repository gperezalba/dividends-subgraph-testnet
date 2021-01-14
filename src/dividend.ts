import { Dividend } from "../generated/schema";
import {
    HoldersUpdate,
    ConfigPay,
    PayUpdate,
    PayFinish
} from "../generated/templates/Dividend/Dividend";

export function handleHoldersUpdate(event: HoldersUpdate): void {
    let dividend = Dividend.load(event.address.toHexString());

    if (dividend != null) {
        dividend.transfers = event.params.transfers;
        dividend.supply = event.params.holdersSupply;
        dividend.holders = event.params.nHolders;

        dividend.save();
    }
}

export function handleConfigPay(event: ConfigPay): void {
    let dividend = Dividend.load(event.address.toHexString());

    if (dividend != null) {
        dividend.isConfigured = true;
        dividend.payAmount = event.params.payAmount;

        dividend.save();
    }
}

export function handlePayUpdate(event: PayUpdate): void {
    let dividend = Dividend.load(event.address.toHexString());

    if (dividend != null) {
        dividend.isPaying = true;
        dividend.index = event.params.index;

        dividend.save();
    }
}

export function handlePayFinish(event: PayFinish): void {
    let dividend = Dividend.load(event.address.toHexString());

    if (dividend != null) {
        dividend.isFinished = true;

        dividend.save();
    }
}