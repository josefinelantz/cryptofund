import React from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import "semantic-ui-css/semantic.min.css";


class CampaignIndex extends React.Component {
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call({ 
			gas: 1500000,
  		gasPrice: "30000000000000"
		})
		return { campaigns };
	}

	renderCampaigns() {
		const items = this.props.campaigns.map(address => {
			return {
				header: address,
				description: <a>View Campaign</a>,
				fluid: true
			};
		});
		return <Card.Group items={items} /> 
	}
	render() {
		return <div>
				<link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@${props.versions.sui}/dist/semantic.min.css"/>
		
			{this.renderCampaigns()}
			<Button 
				content="Create Campaign"
				icon="add circle"
				primary
			/>
		</div>
	}
} 
export default CampaignIndex;