import React, {Component} from 'react';
import Item from './Item';

export default class List extends Component {

    tabRow() {
        return this.props.items.map(function (e, i) {
            return <Item obj={e} key={i} index={i} />;
        });
    }

    render() {
        return (
            <div className="panel panel-success">
            <div className="panel-heading">List Task</div>
                <table className="table table-hover ">
                    <thead>
                    <tr>
                        <th style={{width: '10%'}} className="text-center">#</th>
                        <th>Task</th>
                        <th style={{width: '20%'}} className="text-center">Level</th>
                        <th style={{width: '20%'}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
        </div>
        );
    }
}