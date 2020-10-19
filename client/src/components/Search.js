import React, { Component } from 'react';
import {TextField, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strSearch: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleSearch = (e) => {
        if (e.key === 'Enter') {
            this.props.onClickSearch(this.state.strSearch);
        }

    }

    handleChange(event){
        this.setState({strSearch: event.target.value});
    }

    render() {
        return (
                <TextField 
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                        ),
                    }}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSearch}
                    id="outlined-search" 
                    fullWidth
                    label="Search task" 
                    type="search" 
                    variant="outlined" 
                />
         
        );
    }
}

export default Search;
