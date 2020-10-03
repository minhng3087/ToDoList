import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Item extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/persons/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <tr>
                <td className="text-center">{this.props.obj.name}</td>
                <td>{this.props.obj.company}</td>
                <td className="text-center">{this.props.obj.age}</td>
                <td>
                <button 
                    type="button" 
                    className="btn btn-warning">
                    Edit
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger">
                    Delete
                </button>
                </td>
            </tr>
        );
    }
}

export default Item;