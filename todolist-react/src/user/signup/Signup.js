import React from 'react';
import './Signup.css';
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import moment from '../../../node_modules/moment';
import {BrowserRouter as Router, Route,Switch, Link} from "../../../node_modules/react-router-dom";
import {TaskList} from "../../index";
import {TaskService} from "../../services/TaskService";


var userService = new UserService();

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user: []
        }
    }

    componentDidMount() {
        this.refs.name.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        var user = new User();
        user.name = this.refs.name.value;
        user.surname = this.refs.surname.value;
        user.email = this.refs.email.value;
        user.username = this.refs.username.value;
        user.password = this.refs.password.value;
        user.createDate = moment().format("YYYY-MM-DD").toString();

        if (user.email !== "" && user.name !== "" && user.surname !== "" && user.username !== "" && user.password !== "") {

            userService.postRequest(UserService.host + UserService.user + UserService.create, user,
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(response => {
                    alert("Successfully signed up! Check your email.");
                    this.setState({user: response.data});
                    this.refs.form.reset();
                    this.props.history.push("/");
                }).catch(error => {
                console.log(error.response);
                alert("Couldn't signed up!");
            });
        } else {
            alert("Please insert all needed values!");
        }
    }

    render() {
        return (
            <div className="signupForm">
                <div className="gray-bg col-md-5" style={{"padding": "20px"}}>
                    <h1>Sign Up</h1>
                    <form ref="form" onSubmit={this.onSubmit} className="form">
                        <div className="col-md-12 ">
                            <input type="text" ref="name" className="form-control" placeholder="Name"/>
                            <input type="text" ref="surname" className="form-control" placeholder="Surname"/>
                            <input type="text" ref="username" className="form-control" placeholder="Username"/>
                            <input type="email" ref="email" className="form-control" placeholder="Email"/>
                            <input type="password" ref="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-outline-success">Sign up</button>
                        </div>
                    </form>
                    <nav>
                        <span>Already have an account? </span><Link to="/login">Sign in</Link>
                    </nav>
                </div>
            </div>
        );
    }
}