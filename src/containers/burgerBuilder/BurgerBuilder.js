import React from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/types';

class BurgerBuilder extends React.Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        //   axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
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
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
  
    purchaseContinueHandler = () => {
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
        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;
        
        if(this.props.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
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

        if(this.state.loading){
            orderSummary = <Spinner />;
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));