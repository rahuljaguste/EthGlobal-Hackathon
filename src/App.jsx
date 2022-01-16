import { Layout } from "antd";
import "antd/dist/antd.css";
import Text from "antd/lib/typography/Text";
import VendingMachine from "components/hackathon/vendingMachine";
import { useEffect, useState } from "react";
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

  const [isMintVisible, setMintVisible] = useState(false);

  const tokenAddress = "0x3e3ad4A44B76E3A494195553D7e784610e3DAC03";
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
    setMintVisible(true);
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
      <VendingMachine
        getTokensLeft={getTokensLeft}
        handleMint={handleMint}
        isMintVisible={isMintVisible}
        Account={<Account />}
      />
    </div>
  );
};

export default App;
