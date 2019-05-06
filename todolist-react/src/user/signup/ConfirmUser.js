import * as React from "react";
import {UserService} from "../../services/UserService";
import {setSession} from "../../common/Session";

var userService = new UserService();


export class ConfirmUser extends React.Component {

    componentDidMount() {

        const {token} = this.props.match.params;

        userService.postRequest(UserService.host + UserService.user + UserService.confirm + token)
            .then(response => {
                debugger;
                console.log(response.data);
                if (response.data === "") {
                    alert("You already confirm your email address. Please sign in!");
                    this.props.history.push("/login");
                } else {
                    setSession(response.data);
                    // localStorage.setItem(ACCESS_TOKEN, token);
                    // localStorage.setItem(USER_NAME, response.data.name);
                    // localStorage.setItem(USER_SURNAME, response.data.surname);
                    // localStorage.setItem(USERNAME, response.data.username);
                    // localStorage.setItem(USER_ID,response.data.id);
                    alert("Successfully sign in! Please wait. You will redirecting...");
                    this.props.history.push("/");
                }

            }).catch(error => {
            console.log(error.response);
            alert("Couldn't signed in!");
        });
    }
    render(){
        return "Please wait!";
    }
}