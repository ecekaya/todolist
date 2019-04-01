import React, {Component} from 'react';
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import {Layout, notification} from '../node_modules/antd';
import LoadingIndicator from './common/LoadingIndicator';
import {Signup} from "./user/signup/Signup.js";
import {TDApp} from "./todo/TDApp";
import {TaskList} from "./todo/TaskList";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        // this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    // loadCurrentUser() {
    //     this.setState({
    //         isLoading: true
    //     });
    //     getCurrentUser()
    //         .then(response => {
    //             this.setState({
    //                 currentUser: response,
    //                 isAuthenticated: true,
    //                 isLoading: false
    //             });
    //         }).catch(error => {
    //         this.setState({
    //             isLoading: false
    //         });
    //     });
    // }

    componentDidMount() {
        // this.loadCurrentUser();
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        // localStorage.removeItem(USER_ID);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Todo List',
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: 'Todo List',
            description: "You're successfully logged in.",
        });
        // this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">

                <div className="container">
                    <Switch>
                        {/*<Route exact path="/"*/}
                               {/*render={(props) => <PollList isAuthenticated={this.state.isAuthenticated}*/}
                                                            {/*currentUser={this.state.currentUser}*/}
                                                            {/*handleLogout={this.handleLogout} {...props} />}>*/}
                        {/*</Route>*/}
                        {/*<Route path="/login"*/}
                               {/*render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>*/}

                        <Route path="/signup" component={Signup}/>
                        <Route exact path="/" component={TDApp}/>

                        {/*<Route path="/users/:username"*/}
                               {/*render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}*/}
                                                           {/*currentUser={this.state.currentUser} {...props}  />}>*/}
                        {/*</Route>*/}
                        {/*<PrivateRoute authenticated={this.state.isAuthenticated} path="/poll/new" component={NewPoll}*/}
                                      {/*handleLogout={this.handleLogout}></PrivateRoute>*/}
                        {/*<Route component={NotFound}></Route>*/}
                    </Switch>
                </div>
            </Layout>
        );
    }
}

// export default withRouter(App);
