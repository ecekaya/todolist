import {BaseService} from "./BaseService";

export class LoginService extends BaseService {

    static auth = "auth/";

    static login = "login";

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