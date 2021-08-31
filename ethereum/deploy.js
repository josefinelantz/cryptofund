require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const mnemonicPhrase = process.env.MNEMONIC;

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: process.env.RINKEBY_URL,
	pollingInterval: 8000
});


const web3 = new Web3(provider);

const deploy = async() => {
	// Get accounts
	const accounts = await web3.eth.getAccounts().catch((e) => {
		console.error(e.message);
	});
	console.log("Attempting to deploy from account", accounts[0]);

	// Create and deploy contract instance

	const result = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({ 
			data: compiledFactory.evm.bytecode.object 
		})
		.send({ 
			from: accounts[0], 
			gas: "21000000"
		}).catch((e) => {
			console.error(e.message);
		});

		console.log("Contract deployed to", result.options.address);
	}
	deploy();
