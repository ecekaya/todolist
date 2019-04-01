import React from "react";
import {TaskService} from "../services/TaskService";
import moment from "../../node_modules/moment";
import {TDApp} from "./TDApp";
// import {findAll} from "./TDApp";

var tasks = [];
var taskService = new TaskService();

export class TaskList extends React.Component {

    componentDidMount() {
        // getAll();
        taskService.getRequest(TaskService.host + TaskService.task + TaskService.findAll).then(response => {
            console.log(response);


            if (response.data != null) {
                const u = response.data;

                u.map((item, key) => {
                    debugger;
                    item.createDate = moment(item.createDate).format("YYYY-MM-DD");
                    return tasks.push({
                        index: item.id, value: item.name, done: item.status, i: key,
                        createDate: item.createDate, endDate: item.endDate, description: item.description
                    });
                });
                this.setState({tasks: u});
            }
        });
    }

    render() {
        debugger;
        return (<TDApp initItems={tasks}/>);
    }

}

