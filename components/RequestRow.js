import React from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends React.Component {
	onApprove = async () => {
		const campaign = Campaign(this.props.address);

		const accounts = await web3.eth.getAccounts();
		await campaign.methods.approveRequest(this.props.id).send({
			from: accounts[0],
			gas: "21000000" 
		});
	};

	render() {
		const { Row, Cell } = Table;
		const { id, request, approversCount } = this.props;
		return (
			<Row>
				<Cell>{id}</Cell>
				<Cell>{request.description}</Cell>
				<Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
				<Cell>{request.recipient}</Cell>
				<Cell>{request.approvalCount}/{approversCount}</Cell>
				<Cell>
					<Button 
						onClick={this.onApprove}
						color="green" 
						basic>Approve
					</Button>
				</Cell>
			</Row>
		);
	}
}

export default RequestRow;