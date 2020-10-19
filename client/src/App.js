import React, { Component } from 'react';
import Title from './components/Title';
import Search from './components/Search';
import Add from './components/Add';
import List from './components/List';
import {filter, includes, orderBy as funcOrderBy} from 'lodash';
import ItemService from './ItemService';
import { Container, Grid } from '@material-ui/core';

const invertDirection = {
    asc: "desc",
    desc: "asc"
};
class App extends Component {
    state = {
        items       : [],
        strSearch   : '',
        columnToSort    : '',
        sortDirection    : 'desc',
        itemSelected: null,
    

    };
        
    constructor(props) {
        super(props);
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
            itemSelected: null
        });
    }

    handleSearh(value){
        this.setState({
            strSearch: value
        });
    }


    render() {
        let itemsOrigin = (this.state.items !== null) ? [...this.state.items] : [];
        let items       = [];
        let {strSearch, itemSelected, columnToSort, sortDirection}     = this.state;
       
        // Search
        items = filter(itemsOrigin, (item) => {
            return includes(item.name.toLowerCase(), strSearch.toLowerCase());
        });   

        // Sort
        items = funcOrderBy(items, [columnToSort], [sortDirection]);  

        return (
            <Container fixed>
                <Title />
                <Grid container spacing={6} direction="row">
                    <Grid item xs={4} md={4}>
                        <Search 
                            onClickSearch={this.handleSearh}
                        />
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Add 
                            itemSelected={itemSelected}
                            onClickSubmit={this.handleSubmit} 
                        />
                    </Grid>
                </Grid>

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
