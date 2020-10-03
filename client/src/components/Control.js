import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import {BrowserRouter as Router, Link} from 'react-router-dom';


class Control extends Component {
  constructor(props) {
    super(props);
    
    this.handleAdd = this.handleAdd.bind(this);
    
  }

  handleAdd() {
    this.props.onClickAdd();
  }
  

  render() {
    let elmBtn = <Link to="/create" style={{ textDecoration: 'none' }}><button onClick={this.handleAdd} type="button" className="btn btn-info btn-block">Add task</button></Link>;
    if (this.props.isShowForm) {
      elmBtn = <Link to="/" style={{ textDecoration: 'none' }}><button onClick={this.props.isShowForm} type="button" className="btn btn-success btn-block">Close Form</button></Link>;  
    }
    return (
      <Router>
        <div className="row">
          <Search />
          <Sort 
            
          />
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            {elmBtn}      
          </div>
        </div>
      </Router>
    );
  }
}

export default Control;
