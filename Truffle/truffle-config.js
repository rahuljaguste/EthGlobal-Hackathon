const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const dotenv = require("dotenv");
dotenv.config();

// console.log(process.env);

module.exports = {
  contracts_build_directory: "../src/contracts",
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    polygonscan: process.env.POLYGONSCAN_API_KEY,
    bscscan: process.env.BSCSCAN_API_KEY,
    ftmscan: process.env.FTMSCAN_API_KEY,
    snowtrace: process.env.SNOWTRACE_API_KEY,
  },
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      chainId: 1337,
      network_id: 5777,
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/eth/ropsten${process.env.ARCHIVE === true ? "/archive" : ""}`
        ),
      network_id: 3,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/eth/kovan${process.env.ARCHIVE === true ? "/archive" : ""}`
        ),
      network_id: 42,
      gas: 3716887,
      skipDryRun: true,
      networkCheckTimeout: 100000,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/eth/rinkeby${process.env.ARCHIVE === true ? "/archive" : ""}`
        ),
      network_id: 4,
      skipDryRun: true,
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/goerli${process.env.ARCHIVE === true ? "/archive" : ""}`
        );
      },
      network_id: 5,
      gas: 4465030,
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    mainnet: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/eth/mainnet${process.env.ARCHIVE === true ? "/archive" : ""}`
        );
      },
      gas: 5000000,
      gasPrice: 5e9,
      network_id: 1,
    },
    binance_testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/bsc/testnet${process.env.ARCHIVE === true ? "/archive" : ""}`
        ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    binance_mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/bsc/mainnet${process.env.ARCHIVE === true ? "/archive" : ""}`
        ),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    polygon_mumbai: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/polygon/mumbai${process.env.ARCHIVE === true ? "/archive" : ""}`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    polygon_mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${
            process.env.MORALIS_SPEEDY_NODES_KEY
          }/polygon/mainnet${process.env.ARCHIVE === true ? "/archive" : ""}`
        ),
      network_id: 137,
      confirmations: 3,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    arbitrum_rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/arbitrum/testnet`
        ),
      network_id: 421611,
      skipDryRun: true,
    },
    arbitrum_mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/arbitrum/mainnet`
        ),
      network_id: 42161,
      skipDryRun: true,
    },
    avalanche_fuji: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/avalanche/testnet`
        ),
      network_id: 1,
      skipDryRun: true,
    },
    avalanche_mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/avalanche/mainnet`
        ),
      network_id: 1,
      skipDryRun: true,
    },
    fantom_mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/fantom/mainnet`
        ),
      network_id: 250,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.9",
      settings: {
        // optimizer: {
        //   enabled: true,
        //   runs: 200,
        // },
      },
    },
  },
};
