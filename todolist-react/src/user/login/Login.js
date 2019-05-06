import React from 'react';
import '../signup/Signup.css';
import {User} from "../../models/User";
import {LoginService} from "../../services/LoginService";
import {setSession, removeSession} from "../../common/Session";
import {InputText} from '../../../node_modules/primereact/inputtext';
import {Button} from "../../../node_modules/primereact/button";
import {Password} from 'primereact/password';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

var loginService = new LoginService();

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        };

        const {close} = this.props.match.params;

        if (close === "close") {
            removeSession();
        }
    }

    componentDidMount() {
        // this.refs.username.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        var user = new User();
        user.username = this.state.username;
        user.password = this.state.password;

        if (user.username !== "" && user.password !== "") {

            loginService.getRequest(LoginService.host + LoginService.auth + LoginService.login + "?username=" + user.username + "&password=" + user.password)
                .then(response => {
                    this.refs.form.reset();
                    debugger;
                    if (response.data !== null && response.data !== "") {
                        setSession(response.data);
                        this.props.history.push("/");
                    } else {
                        alert("Please confirm your account before login!");
                    }
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
                            {/*<input type="text" ref="username" className="form-control" placeholder="Username"/>*/}
                            {/*<input type="password" ref="password" className="form-control" placeholder="Password"/>*/}
                            <span className="p-float-label">
                                <InputText id="username" className="col-md-12" value={this.state.username}
                                           onChange={(e) => this.setState({username: e.target.value})}/>
                                <label htmlFor="username">Username</label>
                            </span>
                            <Password className="col-md-12" value={this.state.password}
                                      onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="col-md-12">
                            {/*<button type="submit" className="btn btn-primary">Sign in</button>*/}
                            <Button type="submit" className="p-button-primary" label="Sign in" icon="pi pi-sign-in"/>

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