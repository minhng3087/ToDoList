import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
class Form extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <Router>
                <div className="row">
                    <div className="col-md-offset-7 col-md-5">
                        <form className="form-inline">
                        <div className="form-group">
                            <label className="sr-only">label</label>
                            <input name="task_name" type="text" className="form-control" placeholder="Task Name"  />
                        </div>
                        <div className="form-group">
                            <label className="sr-only">label</label>
                            <select name="task_level"  className="form-control" required="required" >
                            <option value={0}>Small</option>
                            <option value={1}>Medium</option>
                            <option value={2}>High</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/" replace><button onClick={this.props.closeForm} type="button" className="btn btn-default">Cancel</button></Link>
                        </form>
                    </div>
                </div>
            </Router>
            
        );
    }
}

export default Form;