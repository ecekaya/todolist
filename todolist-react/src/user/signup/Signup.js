import React from 'react';
import './Signup.css';
import {UserService} from "../../services/UserService";
import {User} from "../../models/User";
import moment from '../../../node_modules/moment';
import {Link} from "../../../node_modules/react-router-dom";
import {InputText} from '../../../node_modules/primereact/inputtext';
import {Button} from "../../../node_modules/primereact/button";
import {Password} from 'primereact/password';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

var userService = new UserService();

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            password: ''
        }

    }

    componentDidMount() {
        // this.refs.name.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        var user = new User();
        user.name = this.state.name;
        user.surname = this.state.surname;
        user.email = this.state.email;
        user.username = this.state.username;
        user.password = this.state.password;
        user.createDate = moment().format("YYYY-MM-DD").toString();

        if (user.email !== "" && user.name !== "" && user.surname !== "" && user.username !== "" && user.password !== "") {

            userService.postRequest(UserService.host + UserService.user + UserService.create, user,
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(response => {
                    console.log(response);
                    if (response.data !== null && response.data !== "") {
                        alert("Successfully signed up! Check your email.");
                        this.setState({user: response.data});
                    } else {
                        alert("Username is already taken!");
                    }
                    this.refs.form.reset();
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
                <div className="gray-bg col-md-4" style={{"padding": "20px"}}>
                    <h1>Sign Up</h1>
                    <form ref="form" onSubmit={this.onSubmit} className="form signupForm" style={{"padding":"40px"}}>
                        <div className="col-md-12 ">
                            <span className="p-float-label">
                                <InputText id="name" className="col-md-12" value={this.state.name}
                                           onChange={(e) => this.setState({name: e.target.value})} />
                                <label htmlFor="name">Name</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="surname" className="col-md-12" value={this.state.surname}
                                           onChange={(e) => this.setState({surname: e.target.value})} />
                                <label htmlFor="surname">Surname</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="username" className="col-md-12" value={this.state.username}
                                           onChange={(e) => this.setState({username: e.target.value})} />
                                <label htmlFor="username">Username</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="email" className="col-md-12" value={this.state.email}
                                           onChange={(e) => this.setState({email: e.target.value})} />
                                <label htmlFor="email">Email</label>
                            </span>
                            <Password className="col-md-12" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />

                            {/*<input type="text" ref="name" className="form-control" placeholder="Name"/>*/}
                            {/*<input type="text" ref="surname" className="form-control" placeholder="Surname"/>*/}
                            {/*<input type="text" ref="username" className="form-control" placeholder="Username"/>*/}
                            {/*<input type="email" ref="email" className="form-control" placeholder="Email"/>*/}
                            {/*<input type="password" ref="password" className="form-control" placeholder="Password"/>*/}
                        </div>
                        <div className="col-md-12">
                            {/*<button type="submit" className="btn btn-outline-success">Sign up</button>*/}
                            <Button type="submit" className="p-button-success" label="Sign up" icon="pi pi-user-plus"/>

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