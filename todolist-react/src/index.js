import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import icons from 'glyphicons';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

var todoItems = [];
todoItems.push({index: 1, value: "Learn react", done: false});
todoItems.push({index: 2, value: "Go shopping", done: true});
todoItems.push({index: 3, value: "Buy flowers", done: true});

class TDApp extends React.Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
        this.state = {todoItems: todoItems};
    }

    addTask(todoItem) {
        todoItems.unshift({
            index: todoItems.length + 1,
            value: todoItem.newItemValue,
            done: false
        });

        this.setState({todoItems: todoItems});
    }

    deleteTask(itemIndex) {
        todoItems.splice(itemIndex, 1);
        this.setState({todoItems: todoItems});
    }

    doneTask(itemIndex) {
        var item = todoItems[itemIndex];
        todoItems.splice(itemIndex, 1);
        item.done = !item.done;
        todoItems.done ? todoItems.push(item) : todoItems.unshift(item);
        this.setState({todoItems: todoItems});
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Form addTask={this.addTask} />
                <List items={this.props.initItems} deleteTask={this.deleteTask} doneTask={this.doneTask} />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return <h1>Todo List</h1>
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.refs.itemName.focus();
    }

    onSubmit(event){
        event.preventDefault();
        var newItemValue = this.refs.itemName.value;

        if(newItemValue){
            this.props.addTask({newItemValue});
            this.refs.form.reset();
        }

    }

    render() {
        return (
            <div className="col-md-6">
                <form ref="form" onSubmit={this.onSubmit} className="form-inline" action="/login">
                    <div className="col-md-12">
                        <input type="text" ref="itemName" className="form-control" placeholder="Add a new todo..."/>
                    </div>
                    <div className="col-md-12">
                        <textarea className="form-control" placeholder="Description" />
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

class List extends React.Component {
    render() {
        var tasks = this.props.items.map((item,index) =>{
            return(
                <ListItem key={index} item={item} index={index} deleteTask={this.props.deleteTask} doneTask={this.props.doneTask}  />
            );
        });
        return (
            <div className="col-md-6">
                <ul className="bg-light list-group">
                    {tasks}
                </ul>
            </div>
        );
    }
}

class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }

    onClickClose(){
        var index = parseInt(this.props.index);
        this.props.deleteTask(index);
    }

    onClickDone(){
        var index=parseInt(this.props.index);
        this.props.doneTask(index);
    }

    render(){
        var doneClass= this.props.item.done ? true : false;

        return(
            <li className="list-group-item"  style={{ textDecoration: doneClass ? "line-through" : ""}}>
                <div>
                    <button className="btn btn-default" aria-hidden="false" onClick={this.onClickDone} >{icons.ok}</button>
                    {this.props.item.value}
                    <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
                </div>
            </li>
        )
    }

}


//
// export default class PersonList extends React.Component {
//     state = {
//         users: []
//     }
//
//     componentDidMount() {
//         axios.get(`http://localhost:8080/user/findAll`)
//             .then(res => {
//                 debugger;
//                 const users = res.data;
//                 this.setState({users});
//             })
//     }
//
//     render() {
//         return (
//             <ul>
//                 {this.state.users.map(user => <li>{user.name}</li>)}
//             </ul>
//         )
//     }
// }
ReactDOM.render(<TDApp initItems={todoItems}/>, document.getElementById('root'));