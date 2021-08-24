const path = require("path");
const solc = require("solc");
const fileSystem = require("fs-extra");

// Get path to build directory
const buildPath = path.resolve(__dirname, "build");

// Delete build folder if exists
fileSystem.removeSync(buildPath);

// Get path to Campaign.sol in contracts folder
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

// Read Campaign.sol from contracts folder
const campaignSource = fileSystem.readFileSync(campaignPath, "utf8");

// Configure settings for compilation
const input = {
  language: "Solidity",
	sources: {
    "Campaign.sol": {
      content: campaignSource
			}
    },
  	settings: { 
      outputSelection: {
        "*": {
          "*": [ "*" ]
        }
      }
    }
	};

	// Compile contracts in Campaign.sol with solidity compiler 
	const output = JSON.parse(solc.compile(JSON.stringify(input)));

	// Write output to build directory
	fileSystem.ensureDirSync(buildPath);

	// fileSystem.outputJsonSync(path.resolve(buildPath, output))

	//console.log(output.contracts)
	for (let contract in output.contracts["Campaign.sol"]) {
		fileSystem.outputJsonSync(path.resolve(buildPath, contract + ".json"), output.contracts["Campaign.sol"][contract]
	);
}
	
	