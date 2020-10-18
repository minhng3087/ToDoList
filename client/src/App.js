import React, { Component } from 'react';
import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
import {filter, includes, orderBy as funcOrderBy} from 'lodash';
import ItemService from './ItemService';
import { Container } from '@material-ui/core';

const invertDirection = {
    asc: "desc",
    desc: "asc"
};
class App extends Component {
    state = {
        items       : [],
        isShowForm  : false,
        strSearch   : '',
        columnToSort    : '',
        sortDirection    : 'desc',
        itemSelected: null,
    

    };
        
    constructor(props) {
        super(props);

      
        this.closeForm = this.closeForm.bind(this);
        this.handleSearh = this.handleSearh.bind(this);
      
        this.handleDelete = this.handleDelete.bind(this);   
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.handleEdit = this.handleEdit.bind(this);  
       
    }


    

    componentDidMount() {
        ItemService.getItems()
            .then(response => {
                console.log(response.data);
                this.setState({items: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    handleSubmit(item){
        if (item.id === undefined) { // create
            this.setState({
                id: '',
                name: item.name,
                level: +item.level,
            });
                ItemService.createItem(item).then(res => {
                    let items = this.state.items;
                    items = [item,...items];
                    this.setState({ 
                        items: items,
                        isShowForm: false 
                    });
                })
            .catch(error => console.log(error));
        }
        else { //edit
            ItemService.updateItem(item, item.id)
                .then(res => {
                    let key = item.id;
                    this.setState(
                        prevState => ({
                        items: prevState.items.map(
                            elm => elm._id === key? {
                            ...elm,
                            name: item.name,
                            level: +item.level,
                            }: elm
                        ),
                        isShowForm: false
                    })
                    );
                })
                .catch(error => console.log(error));
        }
      
       };


    handleEdit(item){

        ItemService.getItemById(item._id).then( res => {
            this.setState({
                itemSelected: res.data,
                isShowForm: true
            });
        });
       
        
    }

    handleDelete(item){
        ItemService.deleteItem(item._id)
            .then(res => {
                this.setState(prevState => ({
                    items: prevState.items.filter(el => el._id !== item._id )
                }));
            })
          .catch(error => console.log(error));
    
    }

    handleSort = (columnToSort) => {
        this.setState(state => ({
            columnToSort: columnToSort,
            sortDirection: 
                state.columnToSort === columnToSort
                ? invertDirection[state.sortDirection]: "asc"
        }))
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
        let { isShowForm, strSearch, itemSelected, columnToSort, sortDirection}     = this.state;
       
        // Search
        items = filter(itemsOrigin, (item) => {
            return includes(item.name.toLowerCase(), strSearch.toLowerCase());
        });   

        // Sort
        items = funcOrderBy(items, [columnToSort], [sortDirection]);  

        if(isShowForm) {
            elmForm = <Form 
                itemSelected={itemSelected}
                onClickSubmit={this.handleSubmit} 
                onClickCancel={this.closeForm}
            />;
        }

        return (
            <Container fixed>
                <Title />
                <Control 
                    onClickSearchGo={this.handleSearh}
                    onClickAdd={this.handleToggleForm} 
                    isShowForm={isShowForm}
                />
                    { elmForm }

                    <List 
                    columnToSort={columnToSort}
                    sortDirection={sortDirection}
                    handleSort={this.handleSort}
                    onClickEdit={this.handleEdit}
                    onClickDelete={this.handleDelete}
                    items={items} 
                    />
            </Container>
            

        );
    }
}

export default App;
