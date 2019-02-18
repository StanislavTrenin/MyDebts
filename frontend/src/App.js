import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Debt from './Debt/Debt';
import Debts from './Debts/Debts';
import Lend from './Lend/Lend';
import Borrow from './Borrow/Borrow';

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Route exact path='/' component={Debts}/>
                <Route exact path='/question/:questionId' component={Debt}/>
                <Route exact path='/lend' component={Lend} />
                <Route exact path='/borrow' component={Borrow} />
            </div>
        );
    }
}

export default App;
