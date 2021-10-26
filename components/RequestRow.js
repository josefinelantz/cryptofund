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

	onFinalize = async () => {
		const campaign = Campaign(this.props.address);

		const accounts = await web3.eth.getAccounts();
		await campaign.methods.finalizeRequest(this.props.id).send({
			from: accounts[0],
			gas: "21000000"
		});
	};

	/**
	 * 
	 * Metamask simulates running a function ahead and warns us if there's a chance that the transaction is going to fail. The error message saids it is gas related, but the message is actually tied to the contract logic. 
	 */

	render() {
		const { Row, Cell } = Table;
		const { id, request, approversCount } = this.props;
		const readyToFinalize = request.approvalCount > approversCount / 2;
		return (
			<Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
				<Cell>{id}</Cell>
				<Cell>{request.description}</Cell>
				<Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
				<Cell>{request.recipient}</Cell>
				<Cell>{request.approvalCount}/{approversCount}</Cell>
				<Cell>
					{request.complete ? null : (
						<Button 
							onClick={this.onApprove}
							color="green" 
							basic>Approve
						</Button>
					)}
				</Cell>
				<Cell>
					<Button
					 onClick={this.onFinalize}
					 color="teal"
					 basic
					>
						Finalize
					</Button>
				</Cell>
			</Row>
		);
	}
}

export default RequestRow;