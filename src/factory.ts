import { Deploy } from "../generated/Factory/Factory";
import { Dividend } from "../generated/schema";
import { Dividend as DividendTemplate } from "../generated/templates";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleDeploy(event: Deploy): void {
    let dividend = Dividend.load(event.params.deployed.toHexString());

    if (dividend == null) {
        dividend = new Dividend(event.params.deployed.toHexString());

        dividend.token = event.params.token;
        dividend.packable = event.params.packable;
        dividend.packableId = event.params.packableId;
        dividend.transfers = BigInt.fromI32(0);
        dividend.supply = BigInt.fromI32(0);
        dividend.holders = BigInt.fromI32(0);
        dividend.payAmount = BigInt.fromI32(0);
        dividend.isConfigured = false;
        dividend.isPaying = false;
        dividend.index = BigInt.fromI32(0);
        dividend.isFinished = false;

        dividend.save();

        DividendTemplate.create(event.params.deployed);
    }
}