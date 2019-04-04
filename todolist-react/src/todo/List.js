import React from "react";
import {ListItem} from "./ListItem";
import {ACCESS_TOKEN} from "../constants";

export class List extends React.Component {
    render() {
        var tasks = this.props.items.map((item, index) => {
            return (
                <ListItem key={index} item={item} index={item.i} deleteTask={this.props.deleteTask}
                          doneTask={this.props.doneTask}/>
            );
        });
        return (
            <div className="col-md-8">
                <ul className="bg-light list-group">
                    {tasks}
                </ul>
            </div>
        );
    }
}
