import React, { Component } from 'react';
import {Grid, TextField, Button, InputLabel, Select, FormControl} from '@material-ui/core';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task_name: '',
            task_level: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillMount(){
        this.updateItem(this.props.itemSelected)
    }

    componentWillReceiveProps(nextProps){
        this.updateItem(nextProps.itemSelected)
    }

    updateItem(item){
        if(item !== null) {
            this.setState({
                task_id: item._id,
                task_name: item.name,
                task_level: item.level,
            });
        }
    }

    handleChange(event) {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit(event) {
        let item = {
            id: this.state.task_id,
            name: this.state.task_name,
            level: this.state.task_level,
        };
     
        this.props.onClickSubmit(item);
        this.setState({
            task_name: '',
            task_level: 0,
        })
        
        event.preventDefault();
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} sm={6}> 
                            <TextField
                                variant="outlined" 
                                label="name"
                                fullWidth
                                value={this.state.task_name} 
                                onChange={this.handleChange} 
                                name="task_name"
                                type="search"
                            />
                        </Grid>
                        <Grid item xs={3} md={3} sm={3}>
                            {/* <TextField
                                id="date"
                                label="Deadline"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="task_date"
                                value={this.state.task_date}
                                onChange={this.handleChange}
                            /> */}
                            <FormControl>
                            <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                                <Select
                                native
                                value={this.state.task_level}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'task_level',
                                    id: 'age-native-simple',
                                }}
                                >
                                <option value={0}>Small</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} md={3} sm={3}>
                            <Button variant="contained" color="primary" type="submit">Add</Button>
                        </Grid>
                    </Grid>
                </form>
        );
    }
}

export default Add;
