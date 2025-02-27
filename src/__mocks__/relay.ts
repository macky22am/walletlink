import { MOCK_ADDERESS, MOCK_TX } from "../fixtures/provider";
import { ScopedLocalStorage } from "../lib/ScopedLocalStorage";
import { Session } from "../relay/Session";
import {
  CancelablePromise,
  WalletSDKRelayAbstract,
} from "../relay/WalletSDKRelayAbstract";
import { Web3Method } from "../relay/Web3Method";
import {
  AddEthereumChainResponse,
  EthereumAddressFromSignedMessageResponse,
  GenericResponse,
  RequestEthereumAccountsResponse,
  ScanQRCodeResponse,
  SignEthereumMessageResponse,
  SignEthereumTransactionResponse,
  SubmitEthereumTransactionResponse,
  SwitchEthereumChainResponse,
  WatchAssetResponse,
  Web3Response,
} from "../relay/Web3Response";
import { AddressString, HexString } from "../types";

function makeMockReturn<T>(returnValue?: T) {
  return { cancel: () => {}, promise: Promise.resolve(returnValue as T) };
}

export class MockRelayClass extends WalletSDKRelayAbstract {
  constructor() {
    super();
    this.requestEthereumAccounts = this.requestEthereumAccounts.bind(this);
  }

  resetAndReload(): void {}

  requestEthereumAccounts(): CancelablePromise<RequestEthereumAccountsResponse> {
    return makeMockReturn<RequestEthereumAccountsResponse>({
      method: Web3Method.requestEthereumAccounts,
      result: [AddressString(MOCK_ADDERESS)],
    });
  }

  addEthereumChain(): CancelablePromise<AddEthereumChainResponse> {
    return makeMockReturn<AddEthereumChainResponse>();
  }

  watchAsset(): CancelablePromise<WatchAssetResponse> {
    return makeMockReturn<WatchAssetResponse>();
  }

  switchEthereumChain(): CancelablePromise<SwitchEthereumChainResponse> {
    return makeMockReturn<SwitchEthereumChainResponse>();
  }

  signEthereumMessage(): CancelablePromise<SignEthereumMessageResponse> {
    return makeMockReturn<SignEthereumMessageResponse>({
      method: Web3Method.signEthereumMessage,
      result: HexString("0x"),
    });
  }

  ethereumAddressFromSignedMessage(): CancelablePromise<EthereumAddressFromSignedMessageResponse> {
    return makeMockReturn<EthereumAddressFromSignedMessageResponse>({
      method: Web3Method.ethereumAddressFromSignedMessage,
      result: AddressString(MOCK_ADDERESS),
    });
  }

  signEthereumTransaction(): CancelablePromise<SignEthereumTransactionResponse> {
    return makeMockReturn<SignEthereumTransactionResponse>({
      method: Web3Method.signEthereumTransaction,
      result: HexString(MOCK_TX),
    });
  }

  signAndSubmitEthereumTransaction(): CancelablePromise<SubmitEthereumTransactionResponse> {
    return makeMockReturn<SubmitEthereumTransactionResponse>({
      method: Web3Method.submitEthereumTransaction,
      result: HexString(MOCK_TX),
    });
  }

  submitEthereumTransaction(): CancelablePromise<SubmitEthereumTransactionResponse> {
    return makeMockReturn<SubmitEthereumTransactionResponse>({
      method: Web3Method.submitEthereumTransaction,
      result: HexString(MOCK_TX),
    });
  }

  scanQRCode(): CancelablePromise<ScanQRCodeResponse> {
    return makeMockReturn<ScanQRCodeResponse>();
  }

  genericRequest(): CancelablePromise<GenericResponse> {
    return makeMockReturn<GenericResponse>({
      method: Web3Method.generic,
      result: "Success",
    });
  }

  sendRequest<_, U extends Web3Response>(): CancelablePromise<U> {
    return makeMockReturn<U>();
  }

  setAppInfo() {
    return;
  }

  inlineAddEthereumChain() {
    return false;
  }

  setAccountsCallback(): void {
    return;
  }

  setChainCallback(): void {
    return;
  }

  get session() {
    return new Session(new ScopedLocalStorage("session-test"));
  }
}
