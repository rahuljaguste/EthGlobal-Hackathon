const { writeFileSync } = require("fs");
const fs = require("fs");

const name = "The PolyVending Machine";

const inDirectory = "ipfs/images";
const outDirectory = "ipfs/json";

const despription =
  "Your one stop vending machine for your favourte brand nfts";
const cid = "QmZ5WMXJka2wG9E2agAf2BjRgYMGc1WyGwmbMuCNpABjrB";

const template = {
  name: "{name}",
  description: "{description}",
  image: "{image}",
  external_url: "{external_url}",
};

async function writeJson(replacer, index) {
  try {
    const paddedIndex = index.toString(16).padStart(64, "0");
    writeFileSync(
      `${outDirectory}/${paddedIndex}.json`,
      JSON.stringify(template, replacer, 2),
      "utf8"
    );
    console.log("Data successfully saved to disk " + index);
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

const files = fs.readdirSync(inDirectory);
// external_url: `https://gateway.pinata.cloud/ipfs/${cid}/${fileName}`,
async function execute() {
  let counter = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < files.length; j++) {
      const fileName = files[j];
      const shortName = files[j].replace(".jpg", "");
      const data = {
        name: `${name} ${shortName} #${i + 1}`,
        description: despription,
        image: `ipfs://${cid}/${fileName}`,
        external_url: `https://d5fguytub7na.usemoralis.com`,
      };
      const replacer = function (key, val) {
        if (typeof val === "string" && val.match(/^{(.+)}$/)) {
          return data[val.replace(/[{|}]/g, "")];
        }
        return val;
      };

      if (fileName !== ".DS_Store") {
        await writeJson(replacer, counter);
        counter++;
      }
    }
  }
  // console.log();
}

execute();
