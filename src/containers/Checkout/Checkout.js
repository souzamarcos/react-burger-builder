import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contactdata from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler= () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
        <div>
            <CheckoutSummary 
                ingredients={this.props.ingredients}
                onCheckoutCancelled={this.checkoutCancelledHandler}
                onCheckoutContinued={this.checkoutContinuedHandler}
            />
            <Route 
                path={this.props.match.path + '/contact-data'} 
                component={Contactdata} />
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);
