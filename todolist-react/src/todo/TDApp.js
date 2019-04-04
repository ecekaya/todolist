import React from "react";
import {Task} from "../models/Task";
import moment from "../../node_modules/moment";
import {TaskService} from "../services/TaskService";
import {Form} from "./Form";
import {List} from "./List";
import {TopBar} from "./TopBar";
import {Header} from "./Header";
import {ACCESS_TOKEN, USER_ID} from "../constants";

var tasks = [];
var taskService = new TaskService();

export class TDApp extends React.Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        var token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            this.reset();
        } else {
            this.props.history.push("/signup");
        }
    }


    addTask(newItemValue, endDate, description) {

        var length = this.state.tasks.length;
        var task = new Task();
        var now = moment();

        task.name = newItemValue;
        task.endDate = endDate;
        task.description = description;
        task.status = false;
        task.createDate = now.format("YYYY-MM-DD").toString();
        task.userId=localStorage.getItem(USER_ID);

        taskService.postRequest(TaskService.host + TaskService.task + TaskService.create, task).then(response => {
            console.log(response);
            tasks.push({
                index: response.data.id,
                value: newItemValue,
                done: response.data.status,
                i: length,
                createDate: task.createDate,
                endDate: endDate,
                description: description,
                userId: response.data.userId
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

        taskService.getRequest(TaskService.host + TaskService.task + TaskService.findUserTasks + localStorage.getItem(USER_ID)).then(response => {
            console.log(response);
            const u = response.data;

            if(u !== null && u !== "")
            {
                u.map((item, key) => {
                    item.createDate = moment(item.createDate).format("YYYY-MM-DD");
                    return tasks.push({
                        index: item.id,
                        value: item.name,
                        done: item.status,
                        i: key,
                        createDate: item.createDate,
                        endDate: item.endDate,
                        description: item.description,
                        userId: item.userId
                    });
                });
            }

            this.setState({tasks: u});
        });
    }

    doneTask(itemIndex, i) {
        var item = tasks[i];
        item.done = !item.done;

        taskService.postRequest(TaskService.host + TaskService.task + TaskService.update, {
            id: item.index,
            name: item.value,
            status: item.done,
            createDate: item.createDate,
            endDate: item.endDate,
            description: item.description,
            lastModifiedDate: moment().format("YYYY-MM-DD"),
            userId: item.userId
        }).then(response => {
            console.log(response);
        });

        this.setState({tasks: tasks});
    }

    render() {
        return (
            <div>
                <TopBar/>
                <div className="container" style={{'textAlign': 'left'}}>
                    <Header/>
                    <Form addTask={this.addTask}/>
                    <List items={tasks} deleteTask={this.deleteTask} doneTask={this.doneTask}/>
                </div>
            </div>
        );
    }
}
