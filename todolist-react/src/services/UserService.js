import {BaseService} from "./BaseService";

export class UserService extends BaseService {

    static user = "user/";

    getRequest(url) {
        return super.getRequest(url);
    }

    postRequest(url, body) {
        debugger;
        return super.postRequest(url, body);
    }

    deleteRequest(url) {
        return super.deleteRequest(url);
    }
}