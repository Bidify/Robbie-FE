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

import { baseUrl } from "../utils/config";
import axios from "axios";
import { getNftsByMoralis } from "../utils/NFTFetcher";
import { getFetchValues, getDetails } from "../utils/Bidify";

const Collection = () => {
  //INITIALIZING HOOKS

  const { userDispatch } = useContext(UserContext);

  const { active, chainId, account } = useWeb3React();

  // const [update, setUpdate] = useState([])

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [cursor, setCursor] = useState(null);
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
    const response = await axios.get(`${baseUrl}/collection`, {
      params: { chainId, owner: account },
    });
    const results = response.data;
    if (results.length === 0) {
      const newData = await getDetails(chainId, account);
      console.log(newData);
      setNfts([...newData]);

      await handleUpdate(newData);
      setLoading(false);
    } else {
      setNfts([...results]);
      setLoading(false);
      // setTimeout(async() => {
      await updateDatabase(results);
      // }, 3000)
    }
    // }
    setChainChanged(false);
  };

  const loadNftsFromMoralis = async () => {
    const resp = await getNftsByMoralis(account, cursor, chainId);
    setCursor(resp.cursor);
    let tmpNfts = [...nfts];

    for (let i = 0; i < resp.nfts.length; i++) {
      const retdata = resp.nfts[i];
      tmpNfts.push(retdata);
    }
    setNfts([...tmpNfts]);
  };

  useEffect(() => {
    if (nfts.length === 0 && chainChanged && account != null) {
      getCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfts]);

  useEffect(() => {
    setNfts([]);
    setChainChanged(true);
  }, [refresh]);

  const updateDatabase = async (results) => {
    console.log("before updateing", results.length);
    console.log("updating database");
    const newData = await getDetails(chainId, account);
    // console.log("comparing", newData, newData.length)
    // if(newData.length === )
    // const dataToAdd = newData.filter(nft => results.includes(nft))
    // const dataToRemove = results.filter(nft => newData.includes(nft))
    // console.log(dataToAdd, dataToRemove)
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
    // if(dataToAdd.length) await axios.post(`${baseUrl}/admincollection`, dataToAdd)
    // if(dataToRemove.length) await axios.delete(`${baseUrl}/admincollection`, dataToRemove)
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

  // const account = "0x0B172a4E265AcF4c2E0aB238F63A44bf29bBd158";

  const renderCards = (
    <div className="card_wrapper">
      {nfts?.map((lists, index) => {
        return (
          <CollectionCard
            {...lists}
            getDetails={() => {}}
            getFetchValues={getFetchValues}
            key={index.toString()}
            flipRefresh={flipRefresh}
          />
        );
      })}

      {cursor && (
        <>
          <button onClick={loadNftsFromMoralis}>show more</button>
        </>
      )}
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
    // console.log("updating", update)
    if (update.length === 0) return;
    await axios.post(`${baseUrl}/admincollection`, update);
    // console.log('update result', res)
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
