import React from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends React.Component {
	/**
	 * Next executes getInitialProps which 
	 * returns initial data. The initial data * is provided to the CampaignIndex 
	 * component as props.  
	 * rendering the component
	 */
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();
		return { campaigns };
	}

	renderCampaigns() {
		const items = this.props.campaigns.map(address => {
			return {
				header: address.toLowerCase(),
				description: (
				<Link route={`/campaigns/${address.toLowerCase()}`}>
					<a>View Campaign</a>
				</Link>
				),
				fluid: true
			};
		});
		return <Card.Group items={items} /> 
	}
	render() {
		return (
			<Layout>
				<div>
				
					<h3>Open Campaigns</h3>
					<Link route="/campaigns/new">
						<a>
							<Button 
								loated="right"
								content="Create Campaign"
								icon="add circle"
								primary
							/>
						</a>
					</Link>
					{this.renderCampaigns()}
					
				</div>
			</Layout>
		);
	} 
}
export default CampaignIndex;