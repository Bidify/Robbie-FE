import React, { useEffect, useContext } from "react";
import { useWeb3React } from "@web3-react/core";

//IMPORTING STYLESHEET

import "../styles/patterns/liveauction.scss";

//IMPORTING PATTERNS

import Card from "../patterns/card";
import ScreenTemplate from "../patterns/screenTemplate";
import NoArtifacts from "../patterns/noArtifacts";

//IMPORTING STORE COMPONENTS

import { UserContext } from "../store/contexts";

//IMPORTING UTILITY PACKAGES

import { baseUrl } from "../utils/config";

import axios from "axios";

const MyBiddings = () => {
  //INITIALIZING HOOKS

  const { userState, userDispatch } = useContext(UserContext);
  const { active, account, chainId } = useWeb3React();

  //HANDLING METHODS

  useEffect(() => {
    if (account && chainId) getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  const getDetails = async () => {
    userDispatch({
      type: "LIVE_AUCTION_NFT",
      payload: { results: undefined },
    });
    axios
      .get(`${baseUrl}/auctions`, { params: { chainId: chainId } })
      .then(async (response) => {
        const results = response.data;
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const renderCards = (
    <>
      {!active ? (
        <NoArtifacts title="Bidify is not connected to Ethereum." />
      ) : userState?.userBiddings?.length > 0 ? (
        <div className="live_auction_card_wrapper">
          {userState?.userBiddings?.map((lists, index) => {
            return <Card {...lists} key={index} />;
          })}
        </div>
      ) : (
        <NoArtifacts
          title="This wallet has not bid on any NFTs using Bidify yet"
          variant="mybiddings"
        />
      )}
    </>
  );

  return <ScreenTemplate>{renderCards}</ScreenTemplate>;
};

export default MyBiddings;
