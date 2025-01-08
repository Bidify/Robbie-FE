import React, { useEffect, useContext, useState } from "react";
import { useWeb3React } from "@web3-react/core";

//STYLESHEET

import "../styles/pages/homepage.scss";

//IMPORTING PATTERNS

import ScreenTemplate from "../patterns/screenTemplate";
import Footer from "../patterns/footer";
import CollectionCard from "../patterns/collectionCard";
import Header from "../patterns/header";
import NoArtifacts from "../patterns/noArtifacts";
import Loader from "../patterns/loader";

//IMPORTING STORE COMPONENTS

import { UserContext } from "../store/contexts";

//IMPORTING UTILITY PACKAGES

import { baseUrl, NetworkId } from "../utils/config";
import axios from "axios";
import { getFetchValues, getDetails } from "../utils/Bidify";

const Collection = () => {
  //INITIALIZING HOOKS

  const { userDispatch } = useContext(UserContext);

  const { active, chainId, account } = useWeb3React();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [chainChanged, setChainChanged] = useState(false);

  const flipRefresh = () => {
    setRefresh(!refresh);
  };
  //HANDLING METHODS
  const getCollection = async () => {
    setLoading(true);
    userDispatch({
      type: "MY_COLLECTIONS",
      payload: { results: undefined },
    });
    let results = [];
    const response = await axios.get(`${baseUrl}/collection`, {
      params: { chainId, owner: account },
    });
    results = response.data;

    if (results.length === 0 && chainId === NetworkId.INK) {
      const newData = await getDetails(chainId, account);
      console.log(newData);
      setNfts([...newData]);

      await handleUpdate(newData);
      setLoading(false);
    } else {
      setNfts(results);
      setLoading(false);
      if (chainId === NetworkId.INK) await updateDatabase(results);
    }
    setChainChanged(false);
  };

  useEffect(() => {
    if (nfts.length === 0 && chainChanged && account != null) {
      console.log("fetch again");
      getCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfts, chainChanged, account]);

  useEffect(() => {
    setNfts([]);
    setChainChanged(true);
    console.log("update ths collection show");
  }, [refresh]);

  const updateDatabase = async (results) => {
    console.log("before updateing", results.length);
    console.log("updating database");
    const newData = await getDetails(chainId, account);
    await axios.put(`${baseUrl}/admincollection`, {
      data: newData,
      chainId,
      owner: account,
    });
    console.log("updated database");
    if (newData.length !== results.length) {
      setNfts([]);
      setChainChanged(true);
    }
  };
  useEffect(() => {
    if (account !== undefined) {
      setNfts([]);
      setChainChanged(true);
    } else {
      console.log("connect wallet to view collections");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  const renderCards = (
    <div className="card_wrapper">
      {nfts?.map((lists, index) => {
        return (
          <CollectionCard
            {...lists}
            getDetails={() => {}}
            getFetchValues={getFetchValues}
            key={index}
            flipRefresh={flipRefresh}
          />
        );
      })}
    </div>
  );

  const renderScreen = (
    <div className="collection_screen">
      <Header
        title="My NFTs"
        description="view and list your NFTs for auction"
      />
      {!active ? (
        <NoArtifacts title="Bidify is not connected to Ethereum." />
      ) : !loading ? (
        nfts?.length > 0 ? (
          <>{renderCards}</>
        ) : (
          <NoArtifacts title="There are currently no compatible NFTs in this wallet" />
        )
      ) : (
        <Loader />
      )}
    </div>
  );
  const handleUpdate = async (update) => {
    if (update.length === 0) return;
    await axios.post(`${baseUrl}/admincollection`, update);
  };

  return (
    <>
      <ScreenTemplate>
        {account === "0x72003c9EB53B7d9CAf538F38f3CaAC75787Ea869" && (
          <button onClick={handleUpdate}>update database</button>
        )}
        {renderScreen}
        <Footer />
      </ScreenTemplate>
    </>
  );
};

export default Collection;
