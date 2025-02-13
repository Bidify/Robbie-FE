import { InjectedConnector } from "@web3-react/injected-connector";
import { supportedChainIds } from "./config";

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds,
});
