import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import Title from './components/Title';
import Control from './components/Control';
import List from './components/List';
import Form from './components/Form';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [], 
            isShowForm: false,
        };

        this.handleToggleForm = this.handleToggleForm.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/items')
            .then(response => {
                console.log(response.data);
                this.setState({items: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleToggleForm() {
        this.setState({
            isShowForm: true,
        });
    }


    render() {
        let {items, isShowForm} = this.state;
        let elmForm = null;
        
        if (isShowForm) {
            elmForm = <Form closeForm={isShowForm}/>
        }
        return (
            <Router>
                <div className="container">
                    <Title />
                    <Control 
                        onClickAdd={this.handleToggleForm}
                        isShowForm={isShowForm}
                    />
                    {elmForm}
                    <List 
                        items={items}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
