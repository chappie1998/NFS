/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type {
  Interface,
  FunctionFragment,
  DecodedValue,
  Contract,
  BytesLike,
  BigNumberish,
  InvokeFunction,
  BN,
} from "fuels";

import type { Enum, Option } from "./common";

export type AddressInput = { value: string };

export type AddressOutput = { value: string };

export type ContractIdInput = { value: string };

export type ContractIdOutput = { value: string };

export type IdentityInput = Enum<{
  Address: AddressInput;
  ContractId: ContractIdInput;
}>;

export type IdentityOutput = Enum<{
  Address: AddressOutput;
  ContractId: ContractIdOutput;
}>;

interface NftMarketplaceAbiInterface extends Interface {
  functions: {
    admin: FunctionFragment;
    set_admin: FunctionFragment;
    list_nft: FunctionFragment;
  };

  encodeFunctionData(functionFragment: "admin", values?: undefined): Uint8Array;
  encodeFunctionData(
    functionFragment: "set_admin",
    values: [IdentityInput]
  ): Uint8Array;
  encodeFunctionData(
    functionFragment: "list_nft",
    values: [ContractIdInput, BigNumberish, BigNumberish]
  ): Uint8Array;

  decodeFunctionData(functionFragment: "admin", data: BytesLike): DecodedValue;
  decodeFunctionData(
    functionFragment: "set_admin",
    data: BytesLike
  ): DecodedValue;
  decodeFunctionData(
    functionFragment: "list_nft",
    data: BytesLike
  ): DecodedValue;
}

export class NftMarketplaceAbi extends Contract {
  interface: NftMarketplaceAbiInterface;
  functions: {
    admin: InvokeFunction<[], IdentityOutput>;

    set_admin: InvokeFunction<[admin: IdentityInput], void>;

    list_nft: InvokeFunction<
      [id: ContractIdInput, token_id: BigNumberish, price: BigNumberish],
      void
    >;
  };
}
