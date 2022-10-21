/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider, Wallet, AbstractAddress } from "fuels";
import { Interface, Contract } from "fuels";
import type {
  NftMarketplaceAbi,
  NftMarketplaceAbiInterface,
} from "../NftMarketplaceAbi";
const _abi = [
  {
    type: "function",
    name: "admin",
    inputs: [],
    outputs: [
      {
        type: "enum Identity",
        name: "",
        components: [
          {
            type: "struct Address",
            name: "Address",
            components: [
              {
                type: "b256",
                name: "value",
              },
            ],
          },
          {
            type: "struct ContractId",
            name: "ContractId",
            components: [
              {
                type: "b256",
                name: "value",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "set_admin",
    inputs: [
      {
        type: "enum Identity",
        name: "admin",
        components: [
          {
            type: "struct Address",
            name: "Address",
            components: [
              {
                type: "b256",
                name: "value",
              },
            ],
          },
          {
            type: "struct ContractId",
            name: "ContractId",
            components: [
              {
                type: "b256",
                name: "value",
              },
            ],
          },
        ],
      },
    ],
    outputs: [
      {
        type: "()",
        name: "",
        components: [],
      },
    ],
  },
  {
    type: "function",
    name: "list_nft",
    inputs: [
      {
        type: "struct ContractId",
        name: "id",
        components: [
          {
            type: "b256",
            name: "value",
          },
        ],
      },
      {
        type: "u64",
        name: "token_id",
      },
      {
        type: "u64",
        name: "price",
      },
    ],
    outputs: [
      {
        type: "()",
        name: "",
        components: [],
      },
    ],
  },
];

export class NftMarketplaceAbi__factory {
  static readonly abi = _abi;
  static createInterface(): NftMarketplaceAbiInterface {
    return new Interface(_abi) as unknown as NftMarketplaceAbiInterface;
  }
  static connect(
    id: string | AbstractAddress,
    walletOrProvider: Wallet | Provider
  ): NftMarketplaceAbi {
    return new Contract(
      id,
      _abi,
      walletOrProvider
    ) as unknown as NftMarketplaceAbi;
  }
}