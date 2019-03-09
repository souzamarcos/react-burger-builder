
import React from 'react'

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Price: R$ <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map((item) => 
        <BuildControl 
          key={item.label} 
          label={item.label} 
          type={item.type} 
          added={() => props.ingredientAdded(item.type)} 
          removed={() => props.ingredientRemoved(item.type)}
          disabled={props.disabled[item.type]}
        />
      )}
      <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        { props.isAuth ? 'Order Now' : 'Sign Up'}
      </button>
    </div>
  )
}

export default BuildControls;
