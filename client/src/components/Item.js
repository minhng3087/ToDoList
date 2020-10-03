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
                <td className="text-center">{this.props.index + 1}</td>
                <td>{this.props.obj.name}</td>
                <td className="text-center">{this.setElementLevel(this.props.obj.level)}</td>
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
    setElementLevel(level) {
        let elementLevel = <span className="label label-info">Small</span>;
        if (level ===1 ) {
            elementLevel = <span className="label label-info">Medium</span>;
        }else if (level === 2) {
            elementLevel = <span className="label label-danger">High</span>;
        }
        return elementLevel;
    }
}

export default Item;