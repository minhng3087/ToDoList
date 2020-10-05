import React, { Component } from 'react';
import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
import {filter, includes, orderBy as funcOrderBy,} from 'lodash';
import axios from 'axios';

// const uuidv4 = require('uuid/v4');

class App extends Component {
    state = {
        items       : [],
        isShowForm  : false,
        strSearch   : '',
        orderBy     : 'name',
        orderDir    : 'asc',
        itemSelected: null
    };
        
    constructor(props) {
        super(props);

      
        this.closeForm          = this.closeForm.bind(this);
        this.handleSearh        = this.handleSearh.bind(this);
      
        this.handleDelete         = this.handleDelete.bind(this);   
        this.handleSubmit         = this.handleSubmit.bind(this);  
        this.handleEdit         = this.handleEdit.bind(this);  
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

    handleSubmit(item){
        let {items} = this.state;
        

        items.push({

            name    : item.name,
            level   : +item.level
        })

        this.setState({
            items: items,
            isShowForm: false
        });

    }

    handleEdit(item){
        this.setState({
            itemSelected: item,
            isShowForm: true
        });
    }

    handleDelete(id){
        axios.get('http://localhost:4000/items/delete/'+id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
            
            

    
    }

    handleSort = (orderBy, orderDir) => {
        this.setState({
            orderBy: orderBy,
            orderDir: orderDir
        });
    }

    handleToggleForm = () => {
        this.setState({
            isShowForm: !this.state.isShowForm,
            itemSelected: null
        });
    }

    handleSearh(value){
        this.setState({
            strSearch: value
        });
    }

    closeForm(){
        this.setState({
            isShowForm: false
        });
    }

    render() {
        let elmForm     = null;
        let itemsOrigin = (this.state.items !== null) ? [...this.state.items] : [];
        let items       = [];
        let {orderBy, orderDir, isShowForm, strSearch, itemSelected}     = this.state;
       
        // Search
        items = filter(itemsOrigin, (item) => {
            return includes(item.name.toLowerCase(), strSearch.toLowerCase());
        });   

        // Sort
        items = funcOrderBy(items, [orderBy], [orderDir]);  

        if(isShowForm) {
            elmForm = <Form 
                itemSelected={itemSelected} 
                onClickSubmit={this.handleSubmit} 
                onClickCancel={this.closeForm}
            />;
        }

        return (
            <div>
                {/* TITLE : START */}
                <Title />
                {/* TITLE : END */}

                {/* CONTROL (SEARCH + SORT + ADD) : START */}
                <Control 
                    orderBy={orderBy}
                    orderDir={orderDir}
                    onClickSearchGo={this.handleSearh}
                    onClickSort={this.handleSort}
                    onClickAdd={this.handleToggleForm} 
                    isShowForm={isShowForm}
                />
                {/* CONTROL (SEARCH + SORT + ADD) : END */}

                {/* FORM : START */}
                { elmForm }
                {/* FORM : END */}

                {/* LIST : START */}
                <List 
                    onClickEdit={this.handleEdit}
                    onClickDelete={this.handleDelete}
                    items={items} />
                {/* LIST : END */}
            </div>
        );
    }
}

export default App;
