const { spawn } = require("child_process");

const run = async () => {
  const args = process.argv.slice(2);
  console.log(args);
  console.log("📄 Deploying and updating contracts...");
  try {
    spawn(
      `cd Truffle && truffle migrate --reset --compile-all --network ${args[1]} && node scripts/contractInfo.js`,
      {
        shell: true,
        stdio: "inherit",
      }
    );
  } catch (e) {
    console.log(e);
  }
};
run();
