import React, {Component} from 'react';

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentWillUpdate(){
        console.log('OrderSummary - componentWillUpdate');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((ingredientKey) => {
        return (
            <li key={ingredientKey}>
            <span style={{ textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
            </li>
        );
        });
        return (
            <>
            <h3>Yor order</h3>
            <p>A burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={this.props.purchaseCancelled} btnType="Danger">Cancel</Button>
            <Button clicked={this.props.purchaseContinue} btnType="Success">Continue</Button>
            </>
        )
    }
}

export default OrderSummary
