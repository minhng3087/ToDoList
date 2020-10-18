import React, { Component } from 'react';
import Search from './Search';
import { Grid } from '@material-ui/core';

class Control extends Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
    }


    handleAdd(){
        this.props.onClickAdd();
    }

    render() {

        let elmButton = <button onClick={this.handleAdd} type="button" className="btn btn-info btn-block">Add Task</button>;
        if(this.props.isShowForm === true) {
            elmButton = <button onClick={this.handleAdd} type="button" className="btn btn-success btn-block">Close Form</button>
        }

        return (
            <Grid container direction="row">
                <Search onClickGo={this.props.onClickSearchGo}/>
                <Grid item xs={5} sm={5} md={5}>
                    { elmButton }
                </Grid>
            </Grid>
        );
    }
}

export default Control;
