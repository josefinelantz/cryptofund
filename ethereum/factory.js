import web3 from "./web3";
import Campaignfactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	Campaignfactory.abi,
	"0x8Df1f1f148fF373C08ba596977088A86AdC578e3"
);

export default instance;
