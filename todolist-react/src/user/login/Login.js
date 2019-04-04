import React from 'react';
import '../signup/Signup.css';
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import moment from '../../../node_modules/moment';
import {Link} from "../../../node_modules/react-router-dom";
import {LoginService} from "../../services/LoginService";
import {setSession, removeSession} from "../../common/Session";

var loginService = new LoginService();

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        const {close} = this.props.match.params;

        if (close === "close") {
            removeSession();
        }
    }

    componentDidMount() {
        this.refs.username.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        var user = new User();
        user.username = this.refs.username.value;
        user.password = this.refs.password.value;

        if (user.username !== "" && user.password !== "") {

            loginService.getRequest(LoginService.host + LoginService.auth + LoginService.login + "?username=" + user.username + "&password=" + user.password)
                .then(response => {
                    this.refs.form.reset();
                    setSession(response.data);
                    this.props.history.push("/");
                }).catch(error => {
                console.log(error.response);
                alert("Username or password is wrong!");
            });
        } else {
            alert("Please insert all needed values!");
        }
    }

    render() {
        return (
            <div className="signupForm">
                <div className="gray-bg col-md-4" style={{"padding": "20px"}}>
                    <h1>Sign In</h1>
                    <form ref="form" onSubmit={this.onSubmit} className="form">
                        <div className="col-md-12 ">
                            <input type="text" ref="username" className="form-control" placeholder="Username"/>
                            <input type="password" ref="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </form>
                    <nav>
                        {/*<span>Forget your password? </span><Link to="/login">Sign in</Link>*/}
                    </nav>
                </div>
            </div>
        );
    }
}