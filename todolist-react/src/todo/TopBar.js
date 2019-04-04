import React from 'react';
import {Icon} from 'antd';
import "./TopBar.css";
import {Link} from 'react-router-dom';
import {USER_NAME, USER_SURNAME} from "../constants";

export class TopBar extends React.Component {

    render() {
        return (
            <div className="col-md-12 topbar">
                <div style={{"float": "left"}}>
                    <h5>Todo list</h5>
                </div>
                <div style={{"float": "right"}}>
                    <div style={{"float": "left","margin":"8px 20px 0 0" , "fontSize":"large"}} >
                       Welcome <span>{localStorage.getItem(USER_NAME)} {localStorage.getItem(USER_SURNAME)}!</span>
                    </div>
                    <Link to='/'><Icon type="home" title="Home" style={{"cursor": "pointer"}}/></Link>
                    <Link to='/login/close'><Icon type="poweroff" title="Logout" style={{"cursor": "pointer", "marginLeft": "10px"}}/></Link>
                </div>
            </div>
        );
    }
}
