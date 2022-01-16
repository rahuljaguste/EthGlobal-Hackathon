import "antd/dist/antd.css";
import VendingMachine from "components/hackathon/vendingMachine";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import "./style.css";
import bck from "./assests/bck.png";
import Account from "components/Account/Account";
import contractInfo from "contracts/contractInfo.json";

const App = ({ isServerInfo }) => {
  const {
    chainId,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    logout,
    Moralis,
  } = useMoralis();

  const [isMintVisible, setMintVisible] = useState(false);
  // logout();
  const tokenAddress = "0x68452de333b78ED00E13429a47403090D0bF8D0f";
  const connectorId = window.localStorage.getItem("connectorId");

  const getTokensLeft = async (id) => {
    if (isWeb3Enabled) {
      const token = await Moralis.executeFunction({
        abi: contractInfo.abi,
        contractAddress: tokenAddress,
        functionName: "getTokenLeft",
        params: {
          id: id,
        },
      });

      console.log("tokensLeft", token);
      return token;
    }

    console.log("Web3Error");
  };

  const handleMint = async (id) => {
    await Moralis.executeFunction({
      abi: contractInfo.abi,
      contractAddress: tokenAddress,
      functionName: "mint",
      msgValue: Moralis.Units.ETH("0"),
      params: {
        id: id,
      },
    });
  };

  const getIsOutOfTokens = async () => {
    if (isWeb3Enabled) {
      const isOutOfTokens = await Moralis.executeFunction({
        abi: contractInfo.abi,
        contractAddress: tokenAddress,
        functionName: "isOutOfTokens",
      });

      console.log("isOutOfTokens", isOutOfTokens);
      return isOutOfTokens;
    }
  };

  const getContractData = async () => {
    await enableWeb3({ provider: connectorId });
  };

  useEffect(() => {
    console.log("chainId", chainId);
    if (chainId === "0x13881") {
      if (isWeb3Enabled) {
        getIsOutOfTokens();
        setMintVisible(true);
      }
    } else {
      setMintVisible(false);
    }
  }, [chainId, isWeb3Enabled]);

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      console.log("connected");
      getContractData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div
      style={{
        backgroundImage: `url(${bck})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",

        width: "100vw",
        height: "100vh",
      }}
    >
      <VendingMachine
        getTokensLeft={getTokensLeft}
        handleMint={handleMint}
        isMintVisible={isMintVisible}
        Account={<Account />}
        getIsOutOfTokens={getIsOutOfTokens}
      />
    </div>
  );
};

export default App;
