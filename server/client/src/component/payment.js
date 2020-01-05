import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Payment extends Component {
	render() {
		return(
			<StripeCheckout
				name="Emaily"
				description="5$ for 5 credit"
				currency="INR"
				amount={500}
				token={(token) => {
					console.log(token);
					this.props.handleToken(token);
				}}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
			<button className="btn"> Add Credit </button>
			</StripeCheckout>
			)
	}
}

export default connect(null,actions)(Payment);