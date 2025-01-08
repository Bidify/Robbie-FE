import React, { useEffect, useContext, useState } from "react";
import { FetchWrapper } from "use-nft";
import { ethers, Contract } from "ethers";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

//IMPORTING STYLESHEET

import "../styles/patterns/liveauction.scss";

//IMPORTING COMPONENTS

import Card from "./card";
import { Text } from "../components";
import NoArtifacts from "./noArtifacts";
import Loader from "./loader";

//IMPORTING STORE COMPONENTS

import { UserContext } from "../store/contexts";

//IMPORTING UTILITY PACKAGES

import { BIDIFY, URLS, baseUrl, snowApi, getLogUrl } from "../utils/config";
import { getDecimals, unatomic } from "../utils/Bidify";

import axios from "axios";

const LiveAuction = () => {
  //INITIALIZING HOOKS
  const { userState, userDispatch } = useContext(UserContext);
  const { active, account, chainId, library } = useWeb3React();

  const [update, setUpdate] = useState([]);
  //HANDLING METHODS
  const getAuctions = () => {
    userDispatch({
      type: "LIVE_AUCTION_NFT",
      payload: { results: undefined },
    });
    axios
      .get(`${baseUrl}/auctions`, { params: { chainId: chainId } })
      .then(async (response) => {
        const results = response.data;
        userDispatch({
          type: "LIVE_AUCTION_NFT",
          payload: { results: results, userBiddings: null, isFetched: true },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    if (!active) return;
    // getLists(); // get data from on-chain
    getAuctions(); //get data from database
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, chainId]);

  // eslint-disable-next-line no-unused-vars
  const getLists = async () => {
    console.log("fetch data from on-chain");
    userDispatch({
      type: "LIVE_AUCTION_NFT",
      payload: { results: undefined },
    });
    const totalAuction = await getLogs();
    console.log("total auction", totalAuction);
    let Lists = [];
    for (let i = 0; i < totalAuction; i++) {
      let result;
      result = await getListingDetail(i);
      Lists[i] = result;
    }
    getDetails(Lists);
    console.log("fetched data from on-chain");
  };

  const getListingDetail = async (id) => {
    const bidify = new ethers.Contract(
      BIDIFY.address[chainId],
      BIDIFY.abi,
      library.getSigner()
    );
    const raw = await bidify.getListing(id.toString());
    const nullIfZeroAddress = (value) => {
      if (value === "0x0000000000000000000000000000000000000000") {
        return null;
      }
      return value;
    };

    let currency = nullIfZeroAddress(raw.currency);

    let highBidder = nullIfZeroAddress(raw.highBidder);
    let currentBid = raw.price;
    let nextBid = await bidify.getNextBid(id.toString());
    let endingPrice = raw.endingPrice;
    let decimals = await getDecimals(currency);
    if (currentBid.toString() === nextBid.toString()) {
      currentBid = null;
    } else {
      currentBid = unatomic(currentBid.toString(), decimals);
    }

    let referrer = nullIfZeroAddress(raw.referrer);
    let marketplace = nullIfZeroAddress(raw.marketplace);

    let bids = [];
    const web3 = new Web3(window.ethereum);
    const topic1 =
      "0x" + new web3.utils.BN(id).toString("hex").padStart(64, "0");
    const ret = await axios.get(
      `${
        getLogUrl[chainId]
      }&fromBlock=0&toBlock=latest&topic0=0x4c3c1c767fe4a41c6b19602745478b39af5f2a01becc2a37fb82291014d72770&topic0_1_opr=and&topic1=${
        chainId === 9001 ? topic1.toLowerCase() : topic1
      }&apikey=${snowApi[chainId]}`
    );
    const logs = ret.data.result;
    for (let bid of logs) {
      bids.push({
        bidder: "0x" + bid.topics[2].substr(-40),
        price: unatomic(
          parseInt(bid.data.substr(2, 64), 16).toString(),
          decimals
        ),
      });
    }
    return {
      id,
      creator: raw.creator,
      currency,
      platform: raw.platform,
      token: raw.token.toString(),

      highBidder,
      currentBid,
      nextBid: unatomic(nextBid.toString(), decimals),
      endingPrice: unatomic(endingPrice.toString(), decimals),

      referrer,
      allowMarketplace: raw.allowMarketplace,
      marketplace,

      endTime: raw.endTime.toString(),
      paidOut: raw.paidOut,
      isERC721: raw.isERC721,

      bids,
    };
  };

  const getLogs = async () => {
    const topic0 =
      "0x5424fbee1c8f403254bd729bf71af07aa944120992dfa4f67cd0e7846ef7b8de";
    let logs = [];
    try {
      const ret = await axios.get(
        `${getLogUrl[chainId]}&fromBlock=0&toBlock=latest&address=${BIDIFY.address[chainId]}&topic0=${topic0}&apikey=${snowApi[chainId]}`
      );
      logs = ret.data.result;
    } catch (e) {
      console.log(e.message);
    }
    return logs.length;
  };

  const getFetchValues = async (val) => {
    let provider;
    if (URLS[chainId])
      provider = new ethers.providers.JsonRpcProvider(URLS[chainId]);
    else console.log("select valid chain");

    const ethersConfig = {
      ethers: { Contract },
      provider: provider,
    };

    const fetcher = ["ethers", ethersConfig];

    function ipfsUrl(cid, path = "") {
      return `https://dweb.link/ipfs/${cid}${path}`;
    }

    function imageurl(url) {
      const check = url.substr(16, 4);
      console.log("imageurl ====== ", url);
      if (url.includes("ipfs://"))
        return url.replace("ipfs://", "https://ipfs.io/ipfs/");
      if (url.includes("https://ipfs.io/ipfs/"))
        return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

      if (url.includes("https://arweave.net")) return url;
      if (check === "ipfs") {
        const manipulated = url.substr(16, 16 + 45);
        return "https://dweb.link/" + manipulated;
      } else {
        return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      }
    }
    const fetchWrapper = new FetchWrapper(fetcher, {
      jsonProxy: (url) => {
        return url;
      },
      imageProxy: (url) => {
        return imageurl(url);
      },
      ipfsUrl: (cid, path) => {
        return ipfsUrl(cid, path);
      },
    });

    const result = await fetchWrapper
      .fetchNft(val?.platform, val?.token)
      .catch((err) => {
        console.log("fetchWrapper error", err.message);
      });
    const finalResult = {
      ...result,
      platform: val?.platform,
      token: val?.token,
      ...val,
    };
    return finalResult;
  };

  const getDetails = async (_lists) => {
    const lists = _lists.filter((item) => item.paidOut === false);
    const unsolvedPromises = lists.map((val) => getFetchValues(val));
    const results = await Promise.all(unsolvedPromises);
    setUpdate(
      results.map((item) => {
        return { ...item, network: chainId };
      })
    );
    const filteredData = results.filter((val) => val.paidOut !== true);
    const userBiddings = results.filter((value) =>
      value.bids.some(
        (val) =>
          val.bidder?.toLocaleLowerCase() === account?.toLocaleLowerCase()
      )
    );
    userDispatch({
      type: "LIVE_AUCTION_NFT",
      payload: { results: filteredData, userBiddings, isFetched: true },
    });
  };

  const handleUpdate = async () => {
    console.log(update);
    if (update.length === 0) return;
    const res = await axios.post(`${baseUrl}/admin`, update);
    console.log("updated database");
    return res;
  };
  const renderCards = (
    <>
      {account === "0xc4c9Cc5F90460f72ceeD6E884FC372c8a68fd4Fe" && (
        <button onClick={handleUpdate}>update database</button>
      )}
      {userState?.searchResults?.length === undefined ? (
        <div className="live_auction_card_wrapper">
          {userState?.liveAuctions?.map((lists, index) => {
            return (
              <Card
                {...lists}
                getLists={getAuctions}
                key={index}
                getFetchValues={getFetchValues}
              />
            );
          })}
        </div>
      ) : userState?.searchResults?.length === 0 ? (
        <div className="center">
          <Text>No matches found</Text>
        </div>
      ) : (
        <div className="live_auction_card_wrapper">
          {userState?.searchResults?.map((lists, index) => {
            return (
              <Card
                {...lists}
                getLists={getAuctions}
                key={index}
                getFetchValues={getFetchValues}
              />
            );
          })}
        </div>
      )}
    </>
  );

  return (
    <>
      {!active ? (
        <NoArtifacts title="Bidify is not connected to Ethereum." />
      ) : userState?.liveAuctions ? (
        userState?.liveAuctions?.length > 0 ? (
          <div className="live_auctions">{renderCards}</div>
        ) : (
          <NoArtifacts />
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default LiveAuction;
