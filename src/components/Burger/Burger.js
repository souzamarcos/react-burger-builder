import React from 'react'
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients)
        .map((key) => {
        return [...Array(props.ingredients[key])].map((_,i) => (
            <BurgerIngredient key={key+i} type={key} />
        ));
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Adicione ingredientes ao seu hamburguer!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'} />
                {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div>
    )
}

export default withRouter(Burger);