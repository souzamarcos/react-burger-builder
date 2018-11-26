import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends React.Component {
  render(){
    let igredient = null;

    switch(this.props.type){
      case 'bread-bottom':
        igredient = (<div className={classes.BreadBottom}></div>);
        break;
      case 'bread-top':
        igredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case 'meat':
        igredient = (<div className={classes.Meat}></div>);
        break;
      case 'cheese':
        igredient = (<div className={classes.Cheese}></div>);
        break;
      case 'bacon':
        igredient = (<div className={classes.Bacon}></div>);
        break;
      case 'salad':
        igredient = (<div className={classes.Bacon}></div>);
        break;
      default:
        igredient = null;
        break;
    }

    return (
      <div>
        
      </div>
    );
  }
}

BurgerIngredient.PropTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;