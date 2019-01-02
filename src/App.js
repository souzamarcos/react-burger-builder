import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';

class App extends Component {
    state ={
        show: true
    };

    componentDidMount(){
        setTimeout(() => {
            this.setState({show: false});
        }, 5000);
    }

    render() {
        return (
            <div>
                <Layout>
                    {this.state.show && <BurgerBuilder />}
                </Layout>
            </div>
        );
    }
}

export default App;
