import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Title from './components/Title';
import Control from './components/Control';
import List from './components/List';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/persons')
            .then(response => {
                console.log(response.data);
                this.setState({items: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        let {items} = this.state;
        return (
            <Router>
                <div className="container">
                    <Title />
                    <Control />
                    <List 
                        items={items}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
