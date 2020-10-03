import React, { Component } from 'react';

class Sort extends Component {
    constructor(props) {
        super(props);
        

        
    }

   
    render() {
        
        return (
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sort by <span className="caret" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><a href="!#" >Name ASC</a></li>
                    <li><a href="!#" >Name DESC</a></li>
                    <li role="separator" className="divider" />
                    <li><a href="!#" >Level ASC</a></li>
                    <li><a href="!#" >Level DESC</a></li>
                </ul>
                <span className="label label-success label-medium"></span>
                </div>
            </div>
        );
    }
}

export default Sort;