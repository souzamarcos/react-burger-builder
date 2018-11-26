import React from 'react'

import classes from './BuildControl.css';

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less}>-1</button>
      <button className={classes.More} onClick={props.added}>+1</button>
    </div>
  )
}

export default BuildControl;
