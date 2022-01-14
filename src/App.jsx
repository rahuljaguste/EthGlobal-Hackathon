import { Layout } from "antd";
import "antd/dist/antd.css";
import Text from "antd/lib/typography/Text";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import "./style.css";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div style={styles.content}>
      <Text style={{ fontSize: "30px", fontWeight: "600" }}>
        Vending Machine page
      </Text>
    </div>
  );
};

export default App;
