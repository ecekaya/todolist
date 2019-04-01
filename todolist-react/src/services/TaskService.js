import {BaseService} from "./BaseService";

export class TaskService extends BaseService {

    // constructor(props) {
    //     super(props);
    // }

    static task = "task/";

    getRequest(url) { debugger
        return super.getRequest(url);
    }

    postRequest(url, body) {
        return super.postRequest(url, body);
    }

    deleteRequest(url) {
        return super.deleteRequest(url);
    }
}