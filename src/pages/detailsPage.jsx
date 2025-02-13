import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useContext,
} from "react";
import { useParams } from "react-router-dom";
import {
  getListing,
  isValidUrl,
  getBalance,
  getFetchValues,
  handleIpfsImageUrl,
  getNFTAsset,
  isCID,
} from "../utils/Bidify";
import Web3 from "web3";
import Countdown from "react-countdown";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//STYLESHEET

import "../styles/pages/detailspage.scss";

//IMPORTING PATTERNS

import Footer from "../patterns/footer";
import ScreenTemplate from "../patterns/screenTemplate";
import { Button, Text } from "../components";
import Prompt from "../patterns/prompt";

//IMPORTING MEDIA ASSETS

import lock from "../assets/icons/lock.svg";
import NFTPortImage from "../assets/placeholders/nftport.gif";
import FleekImage from "../assets/placeholders/fleek.gif";
import IpfsImage from "../assets/placeholders/ipfs.gif";
import NoImage from "../assets/placeholders/nft-placeholder.svg";

//IMPORTING UTILITY PACKGAES

import { signBid, bid } from "../utils/Bidify";

//IMPORTING MEDIA ASSETS

import loader from "../assets/icons/loader.svg";
import playImg from "../assets/icons/play-circle.svg";
import pauseImg from "../assets/icons/pause-circle.svg";

//IMPORTING UTILITY PACKAGES

import {
  baseUrl,
  BIDIFY,
  BIT,
  EXPLORER,
  getLogUrl,
  getSymbol,
  NetworkId,
  snowApi,
  URLS,
} from "../utils/config";
import axios from "axios";
import PromptFinish from "../patterns/promptFinish";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CollectionModal } from "../patterns/modal";
import { UserContext } from "../store/contexts";
import { list, signList, getDetailFromId } from "../utils/Bidify";

const DetailsPage = () => {
  //INITIALIZING HOOKS

  const { id, platform } = useParams();
  const videoRef = useRef(null);

  const [isVideo, setIsVideo] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { chainId, account, library } = useWeb3React();
  const [isPlay, setIsPlay] = useState(false);
  const [yourBid, setYourBid] = useState(0);
  const [loadingImage, setLoadingImage] = useState(true);
  const [placeholder, setPlaceholder] = useState("");
  const [transfers, setTransfers] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [processContent, setProcessContent] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [latestDetail, setLatestDetail] = useState();
  const [transaction, setTransaction] = useState();
  const { userDispatch } = useContext(UserContext);
  const [imageUrl, SetImageUrl] = useState("");

  useEffect(() => {
    if (data?.length === 0) return;
    setLatestDetail(data[0]);
    getTransferHistory();
    const setImage = async () => {
      const image = data[0].image;
      if (image) {
        const arr = image.split("url=");
        let displayImg = "";
        if (arr.length > 1) {
          displayImg = decodeURIComponent(arr[1]);
        } else {
          displayImg = image;
        }
        if (isCID(displayImg))
          displayImg = `https://ipfs.io/ipfs/${displayImg}`;
        SetImageUrl(handleIpfsImageUrl(displayImg));
        try {
          const response = await fetch(`${displayImg}`).catch(console.error);
          const contentType = response.headers.get("content-type");
          if (contentType.includes("video")) {
            setIsVideo(true);
          }
        } catch (e) {
          setIsVideo(false);
        }
        if (image.includes("storage.googleapis.com"))
          return setPlaceholder(NFTPortImage);
        if (image.includes("fleek.co")) return setPlaceholder(FleekImage);
        return setPlaceholder(IpfsImage);
      }
    };
    setImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setPlaceholder]);
  //HANDLING METHODS
  const handleAbort = () => {
    setIsSuccess(false);
    setIsFinished(false);
    getLists();
  };
  useEffect(() => {
    if (chainId) getData();
    if (account) {
      setSymbol(getSymbol(chainId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account]);

  const getData = async () => {
    if (platform === "auction") {
      const response = await axios.get(
        `${baseUrl}/auctions/${id}?network=${chainId}`
      );
      setData(response.data ? [response.data] : []);
    } else {
      let asset = null;
      if (chainId !== NetworkId.INK) {
        const response = await axios.get(
          `${baseUrl}/collection/${platform}/${id}`,
          { params: { chainId, owner: account } }
        );
        asset = response.data;
      } else asset = await getNFTAsset(platform, id, chainId);
      console.log(asset);
      setData(asset ? [asset] : []);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const getLists = async (id) => {
    const totalAuction = await getLogs();
    let Lists = [];
    for (let i = 0; i < totalAuction; i++) {
      const result = await getListing(i.toString());
      Lists[i] = result;
    }
    getDetails(Lists, id);
  };

  const getLogs = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(URLS[chainId]));
    const topic0 =
      "0x5424fbee1c8f403254bd729bf71af07aa944120992dfa4f67cd0e7846ef7b8de";
    let logs = [];
    try {
      if (
        chainId === NetworkId.AVAX ||
        chainId === NetworkId.MATIC ||
        chainId === NetworkId.BNB ||
        chainId === 9001 ||
        chainId === 1285 ||
        chainId === 100 ||
        chainId === NetworkId.INK
      ) {
        const ret = await axios.get(
          `${getLogUrl[chainId]}&fromBlock=0&${
            chainId === 9001 ||
            chainId === 100 ||
            chainId === 61 ||
            chainId === NetworkId.INK
              ? "toBlock=latest&"
              : ""
          }address=${BIDIFY.address[chainId]}&topic0=${topic0}&apikey=${
            snowApi[chainId]
          }`
        );
        logs = ret.data.result;
      } else
        logs = await web3.eth.getPastLogs({
          fromBlock: "earliest",
          toBlock: "latest",
          address: BIDIFY.address[chainId],
          topics: [topic0],
        });
    } catch (e) {
      console.log(e.message);
    }

    return logs.length;
  };

  const getDetails = async (lists, id) => {
    const unsolvedPromises = lists.map((val) =>
      getFetchValues(val, chainId, account)
    );
    const results = await Promise.all(unsolvedPromises);
    const filteredData = results.filter((val) => val.id === String(id));
    setData(filteredData);
  };

  const handleFinishAuction = async () => {
    setIsLoading(true);

    try {
      const gasLimit = 1000000;
      const Bidify = new ethers.Contract(
        BIDIFY.address[chainId],
        BIDIFY.abi,
        library.getSigner()
      );
      const tx =
        chainId === NetworkId.MATIC
          ? await Bidify.finish(id.toString(), { gasLimit })
          : await Bidify.finish(id.toString());
      const ret = await tx.wait();
      setTransaction(ret);
      let updateData = await getDetailFromId(
        id,
        chainId,
        account,
        imageUrl,
        latestDetail.token_uri,
        latestDetail.name,
        latestDetail.token,
        platform,
        latestDetail.isERC721,
        library
      );
      while (!updateData.paidOut) {
        updateData = await getDetailFromId(
          id,
          chainId,
          account,
          imageUrl,
          latestDetail.token_uri,
          latestDetail.name,
          latestDetail.token,
          platform,
          latestDetail.isERC721,
          library
        );
      }
      await axios.put(`${baseUrl}/auctions/${id}`, updateData);
      setIsLoading(false);
      setIsFinished(true);
      await getData();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } finally {
      const balance = await getBalance(account, chainId);
      userDispatch({
        type: "SET_BALANCE",
        payload: { balance },
      });
    }
  };

  const handleBidMethod = async (id, amount) => {
    setIsLoading(true);
    setProcessContent(
      "Please allow https://Bidify.org permission within your wallet when prompted there will be a small fee for this"
    );
    try {
      await signBid(id, amount, chainId, account, library);
      setProcessContent(
        "Confirm the second transaction of your bid amount, there will be a small network fee for this."
      );
      await bid(id, amount, chainId, account, library, setTransaction);
      while (
        account !==
        (
          await getDetailFromId(
            id,
            chainId,
            account,
            imageUrl,
            latestDetail.token_uri,
            latestDetail.name,
            latestDetail.token,
            platform,
            latestDetail.isERC721,
            library
          )
        ).highBidder
      ) {
        console.log("in while loop");
      }
      const updateData = await getDetailFromId(
        id,
        chainId,
        account,
        imageUrl,
        latestDetail.token_uri,
        latestDetail.name,
        latestDetail.token,
        platform,
        latestDetail.isERC721,
        library
      );
      setLatestDetail(updateData);
      await axios.put(`${baseUrl}/auctions/${id}`, updateData);
      await getData();
      setIsLoading(false);

      if (amount >= data[0].endingPrice && Number(data[0].endingPrice) !== 0)
        setIsFinished(true);
      else setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } finally {
      const balance = await getBalance(account, chainId);
      userDispatch({
        type: "SET_BALANCE",
        payload: { balance },
      });
    }
  };
  const getTransferHistory = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(URLS[chainId]));
    const topic = "0x" + parseInt(data[0].token).toString(16).padStart(64, "0");
    let logs = [];
    const ret = await axios
      .get(
        `${getLogUrl[chainId]}&fromBlock=0&${
          chainId === 9001 ||
          chainId === 100 ||
          chainId === 61 ||
          chainId === NetworkId.INK
            ? "toBlock=latest&"
            : ""
        }address=${
          data[0].platform
        }&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&topic0_3_opr=and&topic3=${
          chainId === 9001 || chainId === 100 ? topic.toLowerCase() : topic
        }&apikey=${snowApi[chainId]}`
      )
      .catch((e) => console.log("getNft error"));
    logs = ret.data.result;

    const pTransferList = logs.map(async (log) => {
      let currency = null;
      let value = null;
      const to = getAddress(log.topics[2]);
      const to_64bit = "0x" + to.split("0x")[1].padStart(64, "0");
      const tHash = log.transactionHash;
      const tx_receipt = await web3.eth.getTransactionReceipt(tHash);
      const block = await web3.eth.getBlock(tx_receipt.blockNumber);
      const tx_logs = tx_receipt.logs.filter(
        (item) =>
          item.topics[0] ===
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" &&
          item.topics.length === 3 &&
          item.topics[1].toLowerCase() === to_64bit.toLowerCase()
      );
      if (tx_logs.length === 0) {
        const tx = await web3.eth.getTransaction(tHash);
        value = ethers.utils.formatEther(tx.value);
      } else {
        const contract_address = tx_logs[0].address;
        currency = await new ethers.Contract(
          contract_address,
          BIT.abi,
          library.getSigner()
        ).symbol();
        value = ethers.utils.formatEther(tx_logs[0].data);
      }
      return {
        ...log,
        currency,
        value,
        created: block.timestamp,
      };
    });
    const transferList = await Promise.all(pTransferList).catch((e) =>
      console.log(e)
    );
    setTransfers(transferList);
  };
  const getAddress = (str) => {
    return "0x" + str.substr(str.length - 40, 40);
  };
  const shortAddress = (address) => {
    return address.substr(0, 4) + "..." + address.substr(address.length - 4, 4);
  };
  const getDateTimeString = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toDateString();
  };
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <>
          {data?.map((val, index) => {
            return (
              <Fragment key={index}>
                <div className="bid_details">
                  <div>
                    <Text
                      variant="primary"
                      style={{ color: "#F79420", fontWeight: 500 }}
                    >
                      {val.currentBid ? val.currentBid : 0} {symbol}
                    </Text>
                    <Text style={{ fontSize: 12 }}>Reserved price</Text>
                  </div>
                </div>
                <div className="content_footer">
                  <Button
                    variant="primary"
                    onClick={() => handleFinishAuction(val.id)}
                    disabled={val.paidOut}
                  >
                    {val.paidOut ? "Already Finished" : "Finish Auction"}
                  </Button>

                  {/* <Button variant="secondary">Pay gas fees</Button> */}
                  <Text style={{ fontSize: 12 }}>
                    1% seller fee to be added
                  </Text>
                </div>
              </Fragment>
            );
          })}
        </>
      );
    } else {
      // Render a countdown
      return (
        <>
          {data?.map((val, index) => {
            return (
              <Fragment key={index}>
                <div className="bid_details">
                  <div>
                    <Text
                      variant="primary"
                      style={{ color: "#F79420", fontWeight: 500 }}
                    >
                      {val.currentBid ? val.currentBid : 0} {symbol}
                    </Text>
                    <Text style={{ fontSize: 12 }}>Current bid</Text>
                  </div>
                  <div>
                    <Text
                      variant="primary"
                      style={{ color: "#FB5050", fontWeight: 500 }}
                    >
                      {days} : {hours} : {minutes} : {seconds}
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      Bidding Ends On{" "}
                      {new Date(val.endTime * 1000).toLocaleString()}
                    </Text>
                  </div>
                </div>
                <div className="content_footer">
                  {account.toLocaleLowerCase() !==
                    val.creator.toLocaleLowerCase() && (
                    <>
                      <Text
                        variant="primary"
                        style={{
                          fontSize: 14,
                          marginBottom: 10,
                          textAlign: "start",
                        }}
                      >
                        Bid amount
                      </Text>
                      <div className="form_input">
                        {/* <Text variant="primary">{val.nextBid}</Text> */}
                        <input
                          className="bid-input"
                          type="number"
                          defaultValue={val.nextBid}
                          onChange={(e) => {
                            setYourBid(e.target.value);
                          }}
                        />
                        <Text style={{ color: "#F79420" }}>{val.symbol}</Text>
                      </div>
                    </>
                  )}
                  {account.toLocaleLowerCase() ===
                  val.creator.toLocaleLowerCase() ? (
                    <Button
                      variant="secondary"
                      style={{ pointerEvents: "none" }}
                    >
                      <img src={lock} alt="lock" width={14} />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      style={{
                        pointerEvents:
                          account?.toLocaleLowerCase() ===
                            val.highBidder?.toLocaleLowerCase() && "none",
                      }}
                      onClick={() =>
                        handleBidMethod(val.id, yourBid ? yourBid : val.nextBid)
                      }
                    >
                      {account?.toLocaleLowerCase() !==
                      val.highBidder?.toLocaleLowerCase()
                        ? "Place Your Bid"
                        : "You are the highest bidder"}
                    </Button>
                  )}

                  {/* <Button variant="secondary">Pay gas fees</Button> */}
                  <Text style={{ fontSize: 12 }}>
                    1% seller fee to be added
                  </Text>
                </div>
              </Fragment>
            );
          })}
        </>
      );
    }
  };

  const handlePlay = () => {
    if (videoRef) videoRef.current.play();
    setIsPlay(true);
  };

  const handlePause = () => {
    if (videoRef) videoRef.current.pause();
    setIsPlay(false);
  };
  const renderImage = (
    <>
      {data?.map(({ image }, index) => {
        const imageToDisplay = image;
        return (
          <div className="image" key={index}>
            {isVideo ? (
              <>
                <video controls loop>
                  <source src={imageToDisplay} type="video/mp4" />
                  <source src={imageToDisplay} type="video/ogg" />
                  <source src={imageToDisplay} type="video/mov" />
                  <source src={imageToDisplay} type="video/avi" />
                  <source src={imageToDisplay} type="video/wmv" />
                  <source src={imageToDisplay} type="video/flv" />
                  <source src={imageToDisplay} type="video/webm" />
                  <source src={imageToDisplay} type="video/mkv" />
                  <source src={imageToDisplay} type="video/avchd" />
                </video>
                {
                  <img
                    src={isPlay ? pauseImg : playImg}
                    alt="button"
                    className="video_nav_btn"
                    onClick={!isPlay ? () => handlePlay() : () => handlePause()}
                  />
                }
              </>
            ) : (
              <>
                {loadingImage && <img src={placeholder} alt="" />}
                <LazyLoadImage
                  effect="blur"
                  src={
                    isValidUrl(imageUrl)
                      ? `https://img-cdn.magiceden.dev/rs:fill:500:0:0:0/plain/${imageUrl}`
                      : imageUrl
                  }
                  alt="art"
                  placeholder={<div></div>}
                  onError={() => setPlaceholder(NoImage)}
                  afterLoad={() => setLoadingImage(false)}
                />
              </>
            )}
          </div>
        );
      })}
    </>
  );

  const renderNFTDetails = (
    <>
      {data?.map((val, index) => {
        return (
          <div className="nft_details" key={index}>
            <div className="content">
              <Text className="title" variant="primary">
                {val.name}
              </Text>
              <Text
                className="description"
                style={{ fontSize: 12, marginTop: 10 }}
              >
                {val.description}
              </Text>
            </div>

            {platform === "auction" ? (
              <Countdown
                date={new Date(val.endTime * 1000)}
                renderer={renderer}
              />
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsModal(true)}
                disabled={val.paidOut}
              >
                Create Auction
              </Button>
            )}
          </div>
        );
      })}
    </>
  );
  const renderScreen = (
    <div className="details_page">
      <div className="block">
        {renderImage}
        {renderNFTDetails}
      </div>
      <div className="nft_activity">
        <Text variant="primary" style={{ marginBottom: 5 }}>
          Ownership activity
        </Text>
        <Text>Know the history of this rare NFT artifact</Text>
        {data?.map((val, index) => {
          return (
            <div className="history_details" key={index}>
              {transfers && transfers.length > 0 ? (
                transfers.map((detail, index) => {
                  return (
                    <div className="flex_gap" key={index}>
                      <Text variant="primary" style={{ fontSize: 14 }}>
                        From:&nbsp;
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`${EXPLORER[chainId]}/address/${getAddress(
                            detail.topics[1]
                          )}`}
                          style={{ color: "#F79420", minWidth: 100 }}
                        >
                          {detail.topics[1] ===
                          "0x0000000000000000000000000000000000000000000000000000000000000000"
                            ? "NullAddress"
                            : getAddress(detail.topics[1]).toLowerCase() ===
                              BIDIFY.address[chainId].toLowerCase()
                            ? "Bidify"
                            : shortAddress(getAddress(detail.topics[1]))}
                        </a>
                      </Text>
                      <Text variant="primary" style={{ fontSize: 14 }}>
                        To:&nbsp;
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`${EXPLORER[chainId]}/address/${getAddress(
                            detail.topics[2]
                          )}`}
                          style={{ color: "#F79420", minWidth: 100 }}
                        >
                          {detail.topics[2] ===
                          "0x0000000000000000000000000000000000000000000000000000000000000000"
                            ? "NullAddress"
                            : getAddress(detail.topics[2]).toLowerCase() ===
                              BIDIFY.address[chainId].toLowerCase()
                            ? "Bidify"
                            : shortAddress(getAddress(detail.topics[2]))}
                        </a>
                      </Text>
                      <Text
                        variant="primary"
                        style={{ fontSize: 14, flexGrow: 1 }}
                      >
                        {Number(detail.value) > 0 ? "Price:" : ""}&nbsp;
                        <span style={{ color: "#F79420", minWidth: 100 }}>
                          {Number(detail.value)
                            ? `${detail.value} ${
                                detail.currency
                                  ? detail.currency
                                  : getSymbol(chainId)
                              }`
                            : ""}
                        </span>
                      </Text>
                      <Text variant="primary">
                        {getDateTimeString(detail.created)}
                      </Text>
                      <a
                        href={`${EXPLORER[chainId]}/tx/${detail.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 172 172"
                        >
                          <g
                            fill="none"
                            fillRule="nonzero"
                            stroke="none"
                            strokeWidth="1"
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit="10"
                            strokeDasharray=""
                            strokeDashoffset="0"
                            fontFamily="none"
                            fontWeight="none"
                            fontSize="none"
                            textAnchor="none"
                          >
                            <path d="M0,172v-172h172v172z" fill="none"></path>
                            <g fill="#f79420">
                              <path d="M148.95469,17.14401c-0.21364,0.00675 -0.42673,0.02544 -0.63828,0.05599h-33.64974c-2.06765,-0.02924 -3.99087,1.05709 -5.03322,2.843c-1.04236,1.78592 -1.04236,3.99474 0,5.78066c1.04236,1.78592 2.96558,2.87225 5.03322,2.843h20.55938l-59.01302,59.01302c-1.49778,1.43802 -2.10113,3.5734 -1.57735,5.5826c0.52378,2.0092 2.09284,3.57826 4.10204,4.10204c2.0092,0.52378 4.14458,-0.07957 5.5826,-1.57735l59.01302,-59.01302v20.55938c-0.02924,2.06765 1.05709,3.99087 2.843,5.03322c1.78592,1.04236 3.99474,1.04236 5.78066,0c1.78592,-1.04236 2.87225,-2.96558 2.843,-5.03322v-33.67214c0.23111,-1.67076 -0.28511,-3.35853 -1.41129,-4.61415c-1.12617,-1.25562 -2.74806,-1.95172 -4.43402,-1.90304zM34.4,40.13333c-6.26689,0 -11.46667,5.19977 -11.46667,11.46667v86c0,6.26689 5.19977,11.46667 11.46667,11.46667h86c6.26689,0 11.46667,-5.19977 11.46667,-11.46667v-57.33333v-14.78125l-11.46667,11.46667v14.78125v45.86667h-86v-86h45.86667h11.46667h3.31458l11.46667,-11.46667h-14.78125h-11.46667z"></path>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  );
                })
              ) : (
                <div className="flex">
                  <Text style={{ fontWeight: 500 }}>
                    No recent activity here
                  </Text>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
  const initialValues = {
    price: "0",
    endingPrice: "0",
    days: "",
    platform,
    token: id,
    // currency: "0xc778417E063141139Fce010982780140Aa0cD5Ab"
    currency: null,
  };
  const validationSchema = Yup.object({
    price: Yup.number()
      .typeError("price must be a number")
      .min(0.0001, "price must be greater than 0.0001")
      .required("This field is required"),
    endingPrice: Yup.number()
      .typeError("price must be a number")
      .required("This field is required"),
    days: Yup.number()
      .typeError("days must be a number")
      .min(1, "days must be greater than one day")
      .max(30, "days should be less than 30 days")
      .required("This field is required"),
  });
  const onSubmit = async (values, onSubmitProps) => {
    setIsModal(false);
    setIsLoading(true);
    const { currency, platform, token, price, endingPrice, days } = values;
    setProcessContent(
      "Please allow https://bidify.org permission within your wallet when prompted, there will be a small fee for this…"
    );
    try {
      await signList({
        platform,
        token,
        isERC721: data[0].isERC721,
        chainId,
        account,
        library,
      });
      setProcessContent(
        "Confirm the second transaction to allow your NFT to be listed, there will be another small network fee."
      );
      await list({
        currency,
        platform,
        token,
        price,
        endingPrice,
        days,
        image: imageUrl,
        name: latestDetail.name,
        description: latestDetail.description,
        metadataUrl: latestDetail.token_uri,
        chainId,
        account,
        library,
        isERC721: data[0].isERC721,
        setTransaction,
      });
      setIsLoading(false);
      setIsSuccess(true);
      await getData();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } finally {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
      updateBalance();
    }
  };

  const updateBalance = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(URLS[chainId]));
    let _balance = await web3.eth.getBalance(account); //Will give value in.
    _balance = web3.utils.fromWei(_balance);
    userDispatch({
      type: "SET_BALANCE",
      payload: { balance: _balance },
    });
  };

  const renderCreateForm = (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="create_form">
          <Text>Initial Bid Amount</Text>
          <div className="form_input">
            <Field type="number" name="price" id="price" />
            <Text style={{ color: "#F79420" }}>{symbol}</Text>
          </div>
          <ErrorMessage
            name="price"
            component="p"
            className="error_input_msg"
          />
          <Text>Buy It Now Price</Text>
          <div className="form_input">
            <Field type="number" name="endingPrice" id="endingPrice" />
            <Text style={{ color: "#F79420" }}>{symbol}</Text>
          </div>
          <ErrorMessage
            name="endingPrice"
            component="p"
            className="error_input_msg"
          />
          <Text>Bidding Days</Text>
          <div className="form_input">
            <Field type="number" name="days" id="days" />
          </div>
          <ErrorMessage
            name="days"
            component="div"
            className="error_input_msg"
          />
          <Button variant="primary" type="submit">
            Create Auction
          </Button>
        </div>
      </Form>
    </Formik>
  );
  return (
    <>
      <ScreenTemplate>
        {data === undefined ? (
          <div className="grid_center">
            <img src={loader} alt="loader" width={24} />
          </div>
        ) : data?.length === 0 ? (
          <div className="grid_center">
            <Text>
              There is no NFT with token id{" "}
              <b style={{ fontWeight: 600, color: "#343434" }}>{id}</b>
            </Text>
          </div>
        ) : (
          renderScreen
        )}
        <Footer />
      </ScreenTemplate>
      <CollectionModal
        image={data.length > 0 ? data[0].image : ""}
        name={data.length > 0 ? data[0].name : ""}
        owner={data.length > 0 ? data[0].owner : ""}
        renderCreateForm={renderCreateForm}
        isModal={isModal}
        setIsModal={setIsModal}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
      />
      <Prompt isModal={isLoading} processContent={processContent} />
      <Prompt
        variant="success"
        isModal={isSuccess}
        handleAbort={handleAbort}
        successContent="Congratulations, you have successfully bid on this NFT, you are the current highest bidder…. Good luck"
      />
      <PromptFinish
        variant="success"
        isModal={isFinished}
        handleAbort={handleAbort}
        highBidder={latestDetail?.highBidder}
        seller={latestDetail?.creator}
        chainId={chainId}
        name={latestDetail?.name}
        transaction={transaction}
      />
      <Prompt variant="error" isModal={isError} />
    </>
  );
};

export default DetailsPage;
