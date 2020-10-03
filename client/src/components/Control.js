import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import Add from './Add';
// import Form from './Form';


class Control extends Component {

  render() {
   
    return (
    
      <div className="row">
        <Search />
        <Sort 
          
        />
        <Add 
         
        />
        
      </div>
    );
  }
}

export default Control;
