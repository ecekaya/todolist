import axios from "axios";
import React from 'react';


export class BaseService extends React.Component {

    constructor(props) {
        super(props);
        this.getRequest = this.getRequest.bind(this);
        this.postRequest = this.postRequest.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);

        // this.state = {
        //     response: []
        // }
    }

    static host = "http://localhost:8081/";

    static findAll = "findAll";
    static create = "create";
    static update = "update";
    static delete = "delete/";

    getRequest(url) {
        debugger;
        return new Promise((resolve, reject) => {
            axios.get(url).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        });
    }


    postRequest(url, body) {
        return new Promise((resolve, reject) => {
            debugger;
            axios.post(url, body).then(data => {
                console.log(data.data);
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        });
    }

    deleteRequest(url) {
        return new Promise((resolve, reject) => {
            axios.delete(url).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        });
    }
}