import React from "react";
import {ListItem} from "./ListItem";

export class List extends React.Component {
    render() {
        var tasks = this.props.items.map((item, index) => {
            return (
                <ListItem key={index} item={item} index={item.i} deleteTask={this.props.deleteTask}
                          doneTask={this.props.doneTask}/>
            );
        });
        return (
            <div className="col-md-8" style={{"float": "right"}}>
                <ul className="bg-light list-group">
                    {tasks}
                </ul>
            </div>
        );
    }
}
