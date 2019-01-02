import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
 
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return (
            <>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div 
                className={classes.Modal}
                style={{ top: this.props.show ? 'auto': '-100%'}}>
                {this.props.children}
            </div>
            </>
        );
    }
}

export default Modal;
