import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {Layout, notification} from '../node_modules/antd';
import {Signup} from "./user/signup/Signup.js";
import {TDApp} from "./todo/TDApp";
import {ConfirmUser} from "./user/signup/ConfirmUser";
import {ACCESS_TOKEN} from "./constants";
import {Login} from "./user/login/Login";
import {Profile} from "./user/profile/Profile";


export class App extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {

        debugger;
        localStorage.removeItem(ACCESS_TOKEN);

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Todo List',
            description: description,
        });
    }

    render() {
        return (
            <Layout className="app-container">
                <div>
                    <Switch>
                        {/*<Route exact path="/"*/}
                               {/*render={(props) => <PollList isAuthenticated={this.state.isAuthenticated}*/}
                                                            {/*currentUser={this.state.currentUser}*/}
                                                            {/*handleLogout={this.handleLogout} {...props} />}>*/}
                        {/*</Route>*/}


                        <Route exact path="/" component={localStorage.getItem(ACCESS_TOKEN) !== "accessToken" ? TDApp : Login}/>
                        <Route path="/login/:close" component={Login}/>
                        <Route path="/login" component={Login} />
                        <Route path="/confirm/:token" component={ConfirmUser} />
                        <Route path="/signup" component={Signup}/>
                        <Route path="/profile" component={Profile}/>
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
