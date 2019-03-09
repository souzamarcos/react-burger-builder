import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INITIAL_STATE = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };
  
const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};
const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalProce: 4,
        error: false,
        building: false
    });
};
const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true,
    });
};

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);        
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;