import web3 from "./web3";
import Campaignfactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	Campaignfactory.abi,
	"0xa94b415CC9708079e2B4C4a5dB9eEa58CecaB0fc"
);

export default instance;
