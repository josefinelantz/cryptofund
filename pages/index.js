import React from "react";
import factory from "../ethereum/factory";

class CampaignIndex extends React.Component {
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call({ 
			gas: 1500000,
  		gasPrice: "30000000000000"
		})
		return { campaigns: campaigns };
	}
	render() {
		return <div>{this.props.campaigns[0]}</div>
	}
} 
export default CampaignIndex;