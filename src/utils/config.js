import logo_avax from "../assets/logo/bidifylogo_avax.png";
import logo_matic from "../assets/logo/bidifylogo_matic.png";
import logo_bnb from "../assets/logo/bidifylogo_bsc.png";
import logo_optimism from "../assets/logo/bidifylogo_op.png";
import logo_arbitrum from "../assets/logo/bidifylogo_arbitrum.png";
import logo_ink from "../assets/logo/bidifylogo_ink.png";
import logo_blast from "../assets/logo/bidifylogo_blast.png";
import logo_linea from "../assets/logo/bidifylogo_linea.png";
import logo_base from "../assets/logo/bidifylogo_base.png";
import logo_scroll from "../assets/logo/bidifylogo_scroll.png";
import logo_mantle from "../assets/logo/bidifylogo_mantle.png";

import avaxLoader from "../assets/icons/loader_avax.gif";
import maticLoader from "../assets/icons/loader_polygon.gif";
import bnbLoader from "../assets/icons/loader_bsc.gif";
import arbitrumLoader from "../assets/icons/loader_arbitrum.gif";
import optimismLoader from "../assets/icons/loader_op.gif";
import inkLoader from "../assets/icons/loader_ink.gif";
import blastLoader from "../assets/icons/loader_blast.gif";
import lineaLoader from "../assets/icons/loader_linea.gif";
import baseLoader from "../assets/icons/loader_base.gif";
import scrollLoader from "../assets/icons/loader_scroll.gif";
import mantleLoader from "../assets/icons/loader_mantle.gif";

export const baseUrl = process.env.REACT_APP_API_URI;
// export const baseUrl = "http://localhost:5000/api";
export const NetworkId = {
  MATIC: 137,
  AVAX: 43114,
  BNB: 56,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  BASE: 8453,
  LINEA: 59144,
  BLAST: 81457,
  SCROLL: 534352,
  MANTLE: 5000,
  INK: 763373,
};
export const NeworkOrder = [
  NetworkId.MATIC,
  NetworkId.BNB,
  NetworkId.AVAX,
  NetworkId.ARBITRUM,
  NetworkId.OPTIMISM,
  NetworkId.BASE,
  NetworkId.LINEA,
  NetworkId.SCROLL,
  NetworkId.BLAST,
  NetworkId.MANTLE,
  NetworkId.INK,
];
export const NetworkData = {
  [NetworkId.MATIC]: {
    symbol: "MATIC",
    id: "137",
    name: "POLYGON",
    color: "#8247e5",
    logo: logo_matic,
    loader: maticLoader,
    nftscan: "https://polygonapi.nftscan.com/api/v2",
  },
  [NetworkId.BNB]: {
    symbol: "BNB",
    id: "56",
    name: "BINANCE SMART CHAIN",
    color: "#FCD535",
    logo: logo_bnb,
    loader: bnbLoader,
    nftscan: "https://bnbapi.nftscan.com/api/v2",
  },
  [NetworkId.AVAX]: {
    symbol: "AVAX",
    id: "43114",
    name: "AVALANCHE",
    color: "#de4437",
    logo: logo_avax,
    loader: avaxLoader,
    nftscan: "https://avaxapi.nftscan.com/api/v2",
  },
  [NetworkId.ARBITRUM]: {
    symbol: "ETH",
    id: "42161",
    name: "ARBITRUM",
    color: "#34d399",
    logo: logo_arbitrum,
    loader: arbitrumLoader,
    nftscan: "https://arbitrumapi.nftscan.com/api/v2",
  },
  [NetworkId.OPTIMISM]: {
    symbol: "ETH",
    id: "10",
    name: "OPTIMISM",
    color: "#34d399",
    logo: logo_optimism,
    loader: optimismLoader,
    nftscan: "https://optimismapi.nftscan.com/api/v2",
  },
  [NetworkId.INK]: {
    symbol: "ETH",
    id: "763373",
    name: "INKSEPOLIA",
    color: "#6c54bc",
    logo: logo_ink,
    loader: inkLoader,
  },
  [NetworkId.BASE]: {
    symbol: "ETH",
    id: "8453",
    name: "BASE",
    color: "#6c54bc",
    logo: logo_base,
    loader: baseLoader,
    nftscan: "https://baseapi.nftscan.com/api/v2",
  },
  [NetworkId.LINEA]: {
    symbol: "ETH",
    id: "59144",
    name: "LINEA",
    color: "#6c54bc",
    logo: logo_linea,
    loader: lineaLoader,
    nftscan: "https://lineaapi.nftscan.com/api/v2",
  },
  [NetworkId.SCROLL]: {
    symbol: "ETH",
    id: "534352",
    name: "SCROLL",
    color: "#6c54bc",
    logo: logo_scroll,
    loader: scrollLoader,
    nftscan: "https://scrollapi.nftscan.com/api/v2",
  },
  [NetworkId.MANTLE]: {
    symbol: "MNT",
    id: "5000",
    name: "MANTLE",
    color: "#6c54bc",
    logo: logo_mantle,
    loader: mantleLoader,
    nftscan: "https://mantleapi.nftscan.com/api/v2",
  },
  [NetworkId.BLAST]: {
    symbol: "ETH",
    id: "81457",
    name: "BLAST",
    color: "#6c54bc",
    logo: logo_blast,
    loader: blastLoader,
    nftscan: "https://blastapi.nftscan.com/api/v2",
  },
};
export const getSymbol = (chainId) => {
  if (chainId) return NetworkData[chainId].symbol;
  else return "N/A";
};
export const supportedChainIds = [
  NetworkId.MATIC,
  NetworkId.BNB,
  NetworkId.AVAX,
  NetworkId.ARBITRUM,
  NetworkId.OPTIMISM,
  NetworkId.BASE,
  NetworkId.LINEA,
  NetworkId.SCROLL,
  NetworkId.MANTLE,
  NetworkId.BLAST,
  NetworkId.INK,
];
export const getLogUrl = {
  [NetworkId.MATIC]:
    "https://api.polygonscan.com/api?module=logs&action=getLogs",
  [NetworkId.AVAX]: "https://api.snowtrace.io/api?module=logs&action=getLogs",
  [NetworkId.BNB]: "https://api.bscscan.com/api?module=logs&action=getLogs",
  [NetworkId.ARBITRUM]:
    "https://api.arbiscan.io/api?module=logs&action=getLogs",
  [NetworkId.OPTIMISM]:
    "https://api-optimistic.etherscan.io/api?module=logs&action=getLogs",
  [NetworkId.BASE]: "https://api.basescan.org/api?module=logs&action=getLogs",
  [NetworkId.LINEA]:
    "https://api.lineascan.build/api?module=logs&action=getLogs",
  [NetworkId.SCROLL]:
    "https://api.scrollscan.com/api?module=logs&action=getLogs",
  [NetworkId.MANTLE]:
    "https://api.mantlescan.xyz/api?module=logs&action=getLogs",
  [NetworkId.BLAST]: "https://api.blastscan.io/api?module=logs&action=getLogs",
  [NetworkId.INK]:
    "https://explorer-sepolia.inkonchain.com/api?module=logs&action=getLogs",
};
export const snowApi = {
  [NetworkId.MATIC]: "FSBGFUSYSAIF8XQKES9Z716K9MQUPCJSCP",
  [NetworkId.BNB]: "3IPW76GB2KV6A2EIJS5PR8KJTYJUGPKDBU",
  [NetworkId.ARBITRUM]: "9G9UAENP3D2P4Z4FBI9ZS9JRDFBUT5AIR6",
  [NetworkId.OPTIMISM]: "5WM5GFAA3AX7WHUK2ZGEYN4GAVN5873JDX",
  [NetworkId.BASE]: "51GJ9QY6S2UUXUDC7N5RNZC49I8MAQDPWP",
  [NetworkId.LINEA]: "N9CX2JVRZ6UF9HHSW85AXZQ7PVF5XSJNYF",
  [NetworkId.SCROLL]: "BJQC74FDJNDV5XG6K7XCZNB77G3Y3ZR6Y4",
  [NetworkId.MANTLE]: "N4DKJBRKKKPGJA2FTPG8QD4XPXNP8PW898",
  [NetworkId.BLAST]: "A1XJS3MFZX64DIFE98BHUDU1CDT4W8AUSW",
  [NetworkId.AVAX]: "N9CX2JVRZ6UF9HHSW85AXZQ7PVF5XSJNYF",
  [NetworkId.INK]: "3IPW76GB2KV6A2EIJS5PR8KJTYJUGPKDBU",
};
export const EXPLORER = {
  [NetworkId.MATIC]: "https://polygonscan.com",
  [NetworkId.BNB]: "https://bscscan.com",
  [NetworkId.AVAX]: "https://snowtrace.io",
  [NetworkId.ARBITRUM]: "https://arbiscan.io",
  [NetworkId.OPTIMISM]: "https://optimistic.etherscan.io",
  [NetworkId.BASE]: "https://basescan.org",
  [NetworkId.LINEA]: "https://lineascan.build",
  [NetworkId.SCROLL]: "https://scrollscan.com",
  [NetworkId.MANTLE]: "https://mantlescan.xyz",
  [NetworkId.BLAST]: "https://blastscan.io",
  [NetworkId.INK]: "https://explorer-sepolia.inkonchain.com",
};

export const URLS = {
  [NetworkId.AVAX]: "https://api.avax.network/ext/bc/C/rpc",
  [NetworkId.MATIC]: "https://polygon-rpc.com",
  [NetworkId.BNB]: "https://bsc-dataseed.binance.org",
  [NetworkId.OPTIMISM]: "https://mainnet.optimism.io",
  [NetworkId.ARBITRUM]: "https://arb1.arbitrum.io/rpc",
  [NetworkId.BASE]: "https://mainnet.base.org",
  [NetworkId.SCROLL]:
    "https://scroll-mainnet.infura.io/v3/208cb2f7413042f389a884515ae9e69d",
  [NetworkId.MANTLE]: "https://rpc.mantle.xyz",
  [NetworkId.LINEA]:
    "https://linea-mainnet.infura.io/v3/208cb2f7413042f389a884515ae9e69d",
  [NetworkId.BLAST]: "https://rpc.blast.io",

  [NetworkId.INK]: "https://rpc-qnd-sepolia.inkonchain.com",
};

export const BIDIFY = {
  address: {
    [NetworkId.AVAX]: "0x6Caf1f39426a94fbc62A166B4b5ed18b4A189629",
    [NetworkId.MATIC]: "0x3aF036B46c2262D4fCdfBd12c7163584C213fa05",
    [NetworkId.BNB]: "0x3aF036B46c2262D4fCdfBd12c7163584C213fa05",
    [NetworkId.OPTIMISM]: "0x6Caf1f39426a94fbc62A166B4b5ed18b4A189629",
    [NetworkId.ARBITRUM]: "0x6Caf1f39426a94fbc62A166B4b5ed18b4A189629",
    [NetworkId.BASE]: "0x6Caf1f39426a94fbc62A166B4b5ed18b4A189629",
    [NetworkId.LINEA]: "0x6Caf1f39426a94fbc62A166B4b5ed18b4A189629",
    [NetworkId.SCROLL]: "0x3aF036B46c2262D4fCdfBd12c7163584C213fa05",
    [NetworkId.MANTLE]: "0x6Caf1f39426a94fbc62A166B4b5ed18b4A189629",
    [NetworkId.BLAST]: "0x6Caf1f39426a94fbc62A166B4b5ed18b4A189629",

    [NetworkId.INK]: "0x0288EE0a9F900B6E0cd5522907548f3DA0cdace9",
  },
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "id",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "AuctionExtended",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "id",
          type: "uint64",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nftRecipient",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "AuctionFinished",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "id",
          type: "uint64",
        },
        {
          indexed: true,
          internalType: "address",
          name: "bidder",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "referrer",
          type: "address",
        },
      ],
      name: "Bid",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint64",
          name: "id",
          type: "uint64",
        },
        {
          indexed: true,
          internalType: "address",
          name: "creator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "currency",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "platform",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "token",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "endingPrice",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "timeInDays",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "address",
          name: "lister",
          type: "address",
        },
      ],
      name: "ListingCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "id",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "referrer",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "bid",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "id",
          type: "uint64",
        },
      ],
      name: "finish",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "getListing",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              internalType: "address",
              name: "currency",
              type: "address",
            },
            {
              internalType: "address",
              name: "platform",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "token",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "endingPrice",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "referrer",
              type: "address",
            },
            {
              internalType: "address",
              name: "lister",
              type: "address",
            },
            {
              internalType: "address",
              name: "highBidder",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "endTime",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "paidOut",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "isERC721",
              type: "bool",
            },
          ],
          internalType: "struct Bidify.Listing",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "id",
          type: "uint64",
        },
      ],
      name: "getNextBid",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "currency",
          type: "address",
        },
      ],
      name: "getPriceUnit",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "currency",
          type: "address",
        },
        {
          internalType: "address",
          name: "platform",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "token",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "endingPrice",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "timeInDays",
          type: "uint8",
        },
        {
          internalType: "bool",
          name: "isERC721",
          type: "bool",
        },
        {
          internalType: "address",
          name: "lister",
          type: "address",
        },
      ],
      name: "list",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155BatchReceived",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC1155Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC721Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
};
export const ERC1155 = {
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "uri_",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
      ],
      name: "TransferBatch",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "TransferSingle",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "value",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "URI",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "accounts",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
      ],
      name: "balanceOfBatch",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeBatchTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "uri",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
export const ERC721 = {
  address: "0xA6642FaAEaB5142CBB3636BA00319Bc46306eb3E",
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "baseURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "counterfeit",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "string",
          name: "_file",
          type: "string",
        },
        {
          internalType: "string",
          name: "_metadata",
          type: "string",
        },
      ],
      name: "createNFT",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export const BIT = {
  //WETH
  address: {
    [NetworkId.EGEM]: "0xE5fca20e55811D461800A853f444FBC6f5B72BEa",
  },
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "_mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "decimals_",
          type: "uint8",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
