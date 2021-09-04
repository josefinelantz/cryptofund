import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";

class CampaignShow extends Component { 
	static async getInitialProps(props) {
		const campaign = Campaign(props.query.address);

		const summary = await campaign.methods.getSummary().call({ 
			gas: 1500000,
  		gasPrice: "30000000000000"
		});
		
		return {
			minimumContribution: summary[0],
			balance: summary[1],
			requestCount: summary[2],
			approversCount: summary[3],
			manager: summary[4]
		};
	}

	render() {
		return (
			<Layout>
				<h3>Campaign show</h3>
			</Layout>
		);
	}
}

export default CampaignShow;