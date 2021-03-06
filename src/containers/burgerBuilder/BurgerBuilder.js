import React from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends React.Component {

    state = {
        purchasing: false,
    };

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map((ingredientKey) => {
            return ingredients[ingredientKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    puchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
  
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
        ...this.props.ingredients
        };

        for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;
        
        if(this.props.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        isAuth={this.props.isAuthenticated}
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.puchaseHandler}/>   
                </>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.totalPrice}
                />;
        }
        
        return (
        <>
            <Modal 
            show={this.state.purchasing} 
            modalClosed={this.purchaseCancelHandler}
            >
            {orderSummary}
            </Modal>
            {burger}
        </>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));