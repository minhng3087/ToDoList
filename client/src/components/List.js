import React, { Component } from 'react';
import Item from './Item';
import {Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import '../css/table.css'

class List extends Component {
    showIcon(columnToSort) {
        return columnToSort === this.props.columnToSort ? (this.props.sortDirection === "asc" ? (<ArrowDropDownIcon/>) : (<ArrowDropUpIcon/>)) : null
    }

    render() {
        const items   = this.props.items;
        const elmItem = items.map((item, index)=> {
            return (
                <Item 
                    onClickDelete={this.props.onClickDelete} 
                    onClickEdit={this.props.onClickEdit} 
                    key={index} 
                    item={item} 
                    index={index} />
            );
        });

        return (
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell align="center" style={{width: '10%'}}>#</TableCell>
                            <TableCell>
                                <div 
                                    style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }} 
                                    onClick={()=> this.props.handleSort('name')}>
                                    Task
                                    {this.showIcon('name')}
                                </div>
                            </TableCell>
                            <TableCell style={{width: '20%'}}>
                                <div onClick={()=> this.props.handleSort('level')}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                    Level
                                    {this.showIcon('level')}
                                </div>
                            </TableCell>
                            <TableCell style={{width: '12%'}} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {elmItem}
                    </TableBody>
                </Table>
        );
    }
}

export default List;
