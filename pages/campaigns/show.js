import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Card } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

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

	renderCards() {
		const {
			balance, 
			manager,
			minimumContribution, 
			requestCount, 
			approversCount
		} = this.props; 

		const items = [
			{
				header: manager,
				meta: "Address of Manager",
				description: "The manager created this campaign.",
				style: { overflowWrap: "break-word"}
			},
			{
				header: minimumContribution,
				meta: "Minimum Contribution (wei)",
				description: "You must contribute at least this much wei to be an approver"
			},
			{
				header: approversCount,
				meta: "Number of Approvers",
				description: "Number of people who have already donated to this campaign."
			},
			{
				header: web3.utils.fromWei(balance, "ether"),
				meta: "Campaign Balance (ether)", 
				description: "The balance is how much money this campaign has left to spend."
			}
		];

		return <Card.Group items={items} />
	}

	render() {
		return (
			<Layout>
				<h3>Campaign show</h3>
				{this.renderCards()}
				<ContributeForm />
			</Layout>
		);
	}
}

export default CampaignShow;