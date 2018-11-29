import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div 
        className={classes.Modal}
        style={{ transform: props.show ? 'translateY(0)': 'translateY(-100vh)'}}>
        {props.children}
      </div>
    </>
  )
}

Modal.propTypes = {

}

export default Modal;
