import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Grid, IconButton, TableCell, TableRow } from '@material-ui/core';


class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
           
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    
    handleEdit(item){
       this.props.onClickEdit(item);
    }

    handleDelete(item){
        this.props.onClickDelete(item);
    }
    
    render() {
        const {item} = this.props;
        const {index} = this.props;
        return (
            <TableRow>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">{this.showElementLevel(item.level)}</TableCell>
                <TableCell align="center">
                    <Grid container>
                        <Grid item xs={6} md={6}><IconButton color="primary"  onClick={()=>this.handleEdit(item)} aria-label="edit" ><EditIcon/></IconButton></Grid>
                        <Grid item xs={6} md={6}><IconButton color="secondary"  onClick={()=>this.handleDelete(item)} aria-label="delete"><DeleteIcon/></IconButton></Grid>
                    </Grid>
                </TableCell>   
            </TableRow>
        );
    }

    showElementLevel(level){
        let elmLevel = <span className="label label-default">Small</span>;
        if(level === 1){
            elmLevel = <span className="label label-info">Medium</span>;
        }else if(level === 2){
            elmLevel = <span className="label label-danger">High</span>;
        }
        return elmLevel;
    }
}

export default Item;
