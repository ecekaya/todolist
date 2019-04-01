import React from "react";
import {Task} from "../models/Task";
import moment from "../../node_modules/moment";
import {TaskService} from "../services/TaskService";
import {Header} from "./Header";
import {Form} from "./Form";
import {List} from "./List";
import "./TaskList";

var tasks = [];
var taskService = new TaskService();

export class TDApp extends React.Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
        this.reset = this.reset.bind(this);
        // this.state = {
        //     tasks: []
        // }
    }

    componentDidMount() {

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

    addTask(newItemValue, endDate, description) {

        debugger;
        var length = this.state.tasks.length;
        var task = new Task();
        var now = moment();

        task.name = newItemValue;
        task.endDate = endDate;
        task.description = description;
        task.status = false;
        task.createDate = now.format("YYYY-MM-DD").toString();


        taskService.postRequest(TaskService.host + TaskService.task + TaskService.create, task).then(response => {
            console.log(response);
            tasks.push({
                index: response.data.id,
                value: newItemValue,
                done: response.data.status,
                i: length,
                createDate: task.createDate,
                endDate: endDate,
                description: description
            });
            this.setState({tasks: tasks});
        });
    }

    deleteTask(itemIndex, i) {

        taskService.deleteRequest(TaskService.host + TaskService.task + TaskService.delete + itemIndex).then(response => {
            console.log(response);
            this.reset();

            this.setState({tasks: tasks});
        });
    }

    reset() {
        tasks = [];

        taskService.getRequest(TaskService.host + TaskService.task + TaskService.findAll).then(response => {
            const u = response.data;

            u.map((item, key) => {
                item.createDate = moment(item.createDate).format("YYYY-MM-DD");
                return tasks.push({
                    index: item.id, value: item.name, done: item.status, i: key,
                    createDate: item.createDate, endDate: item.endDate, description: item.description
                });
            });
            this.setState({tasks: u});
        });
    }

    doneTask(itemIndex, i) {
        var item = tasks[i];
        // tasks.splice(i, 1);
        item.done = !item.done;
        // tasks.done ? tasks.push(item) : tasks.unshift(item);

        taskService.postRequest(TaskService.host + TaskService.task + TaskService.update, {
            id: item.index,
            name: item.value,
            status: item.done,
            createDate: item.createDate,
            endDate: item.endDate,
            description: item.description,
            lastModifiedDate: moment().format("YYYY-MM-DD")
        }).then(response => {
            console.log(response);
        });

        this.setState({tasks: tasks});
    }

    render() {
        return (
            <div className="container" style={{'textAlign': 'left'}}>
                <Header/>
                <Form addTask={this.addTask}/>
                <List items={tasks} deleteTask={this.deleteTask} doneTask={this.doneTask}/>
            </div>
        );
    }
}

// function getAll() {
//     taskService.getRequest(TaskService.host + TaskService.task + TaskService.findAll).then(response => {
//         console.log(response);
//
//
//         if (response.data != null) {
//             const u = response.data;
//
//             u.map((item, key) => {
//                 debugger;
//                 item.createDate = moment(item.createDate).format("YYYY-MM-DD");
//                 return tasks.push({
//                     index: item.id, value: item.name, done: item.status, i: key,
//                     createDate: item.createDate, endDate: item.endDate, description: item.description
//                 });
//             });
//             this.setState({tasks: u});
//         }
//     });
// }