import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;

        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id} 
                    {...order} 
                />
            ));
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        orders: state.order.orders,
        loading: state.order.loading,
        userId: state.auth.userId
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));