import { Layout } from "antd";
import "antd/dist/antd.css";
import Text from "antd/lib/typography/Text";
import VendingMachine from "components/hackathon/vendingMachine";
import { useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import "./style.css";
import bck from "./assests/bck.png";
import Account from "components/Account/Account";
import contractInfo from "contracts/contractInfo.json";
const { Header, Footer } = Layout;

const App = ({ isServerInfo }) => {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    Moralis,
  } = useMoralis();

  const tokenAddress = "0xA1074ff4FC1020DDAbBd7980F928d9EF2A6f9EF4";
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
  };

  const handleMint = async (id) => {
    const token = await Moralis.executeFunction({
      abi: contractInfo.abi,
      contractAddress: tokenAddress,
      functionName: "mint",
      msgValue: Moralis.Units.ETH("0"),
      params: {
        id: id,
      },
    });
  };

  const getContractData = async () => {
    await enableWeb3({ provider: connectorId });
  };

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
      <VendingMachine getTokensLeft={getTokensLeft} handleMint={handleMint} />
      <Account />
    </div>
  );
};

export default App;
