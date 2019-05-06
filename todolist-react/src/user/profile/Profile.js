import React from "react";
import picture from "./default-profile.jpg";
import {Chart} from 'primereact/chart';
import {TopBar} from "../../todo/TopBar";
import {TabView, TabPanel} from 'primereact/tabview';
import {USER_NAME, USER_SURNAME} from "../../constants";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {removeSession, setSession} from "../../common/Session";
import {User} from "../../models/User";
import {LoginService} from "../../services/LoginService";
import './Profile.css';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordAgain: ''
        };
    }

    onSubmit(event) {
        event.preventDefault();
    }

    render() {
        const stackedData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                type: 'line',
                label: 'Created',
                borderColor: '#66BB6A',
                borderWidth: 3,
                fill: false,
                data: [
                    50,
                    25,
                    12,
                    48,
                    56,
                    76,
                    42,
                    56,
                    12,
                    45,
                    42,
                    65
                ]
            }, {
                type: 'bar',
                label: 'Finished',
                backgroundColor: '#FFCE56',
                data: [
                    21,
                    84,
                    24,
                    75,
                    37,
                    65,
                    34,
                    7,
                    24,
                    15,
                    21,
                    3
                ]
            }, {
                type: 'bar',
                label: 'Left',
                backgroundColor: '#36A2EB',
                data: [
                    41,
                    52,
                    24,
                    74,
                    23,
                    21,
                    32,
                    26,
                    19,
                    3,
                    7,
                    31
                ]
            }]
        };

        const stackedOptions = {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };

        return (
            <div>
                <div style={{display: "flex"}}><TopBar/></div>
                <div className="container gray-bg col-md-8" style={{"padding": "20px"}}>
                    <h1>Profile</h1>
                    <div className="col-md-2 image" style={{float: "left"}}>
                        <img src={picture} alt="Profile" height={150} width={140}/>
                        <div className="col-md-12" style={{padding: "20px"}}>
                            <span>{localStorage.getItem(USER_NAME)} {localStorage.getItem(USER_SURNAME)}</span>
                        </div>
                    </div>

                    <div className="col-md-9 charts" style={{display: "inline-block"}}>
                        <TabView>
                            <TabPanel header="Statistics">
                                <div className="content-section implementation">
                                    <Chart type="bar" data={stackedData} options={stackedOptions}/>
                                </div>
                            </TabPanel>
                            <TabPanel header="Settings">
                                <div className="col-md-7" style={{"padding": "20px"}}>
                                    <form ref="form" onSubmit={this.onSubmit} className="form">
                                        <h4><i className="pi pi-key"/>Change Password</h4>
                                        <div className="col-md-12">
                                            <Password className="col-md-12" value={this.state.oldPassword}
                                                      promptLabel="Old password"
                                                      onChange={(e) => this.setState({oldPassword: e.target.value})}/>
                                            <Password className="col-md-12" value={this.state.newPassword}
                                                      promptLabel="New password"
                                                      onChange={(e) => this.setState({newPassword: e.target.value})}/>
                                            <Password className="col-md-12" value={this.state.newPassword}
                                                      promptLabel="New password again"
                                                      onChange={(e) => this.setState({newPasswordAgain: e.target.value})}/>
                                        </div>
                                        <div className="col-md-12">
                                            <Button type="submit" className="p-button-primary" label="Submit"
                                                    icon="pi pi-check"/>
                                        </div>
                                    </form>
                                </div>
                            </TabPanel>
                        </TabView>

                    </div>
                </div>
            </div>

        );
    }

}