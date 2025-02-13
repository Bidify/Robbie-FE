import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//STYLESHEET

import "../styles/pages/homepage.scss";

//IMPORTING PATTERNS

import { Text } from "../components";

//IMPORTING MEDIA ASSETS

import search from "../assets/icons/search.svg";
import hamburger from "../assets/icons/hamburger.svg";
import outline_close from "../assets/icons/outline_close.svg";

//IMPORTING STORE COMPONENTS

import { UserContext } from "../store/contexts";
import { useWeb3React } from "@web3-react/core";
import { NetworkData, getSymbol } from "../utils/config";

const Header = ({ title, description }) => {
  //INITIALIZING HOOKS
  const { account, chainId } = useWeb3React();
  const { userState, userDispatch } = useContext(UserContext);

  const searchRef = useRef();

  useEffect(() => {
    userDispatch({
      type: "RESET",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HANDLING SEARCH METHOD

  const handleSearch = async (keyword) => {
    userDispatch({
      type: "SEARCH_AUCTIONS",
      payload: { keyword: keyword.current.value },
    });
  };
  const renderScreenHeader = (
    <div
      className={
        userState?.isSidebar ? "screen_header active" : "screen_header"
      }
    >
      <Link to="/" className="logo">
        <img
          src={NetworkData[account ? chainId : 763373].logo}
          alt="logo"
          width={48}
        />
        <Text variant="primary">{getSymbol(chainId)}</Text>
      </Link>
      <div className="content">
        <Text variant="primary">{title}</Text>
        <Text>{description}</Text>
      </div>
      <div className="block_right">
        <div className="search_input">
          <input
            type="text"
            placeholder="Search NFTs"
            ref={searchRef}
            onChange={() => handleSearch(searchRef)}
          />
          <img src={search} alt="search" width={22} />
        </div>
        <img
          className="avatar"
          src={userState?.isSidebar ? outline_close : hamburger}
          alt="avatar"
          width={24}
          onClick={() =>
            userDispatch({
              type: "SIDEBAR",
              payload: { isSidebar: !userState?.isSidebar },
            })
          }
        />
      </div>
    </div>
  );
  return renderScreenHeader;
};

export default Header;
