import {ACCESS_TOKEN, USER_ID, USER_NAME, USER_SURNAME, USERNAME} from "../constants";

export function setSession(user) {
    debugger;
    localStorage.setItem(ACCESS_TOKEN, user.tokenId);
    localStorage.setItem(USER_NAME, user.name);
    localStorage.setItem(USER_SURNAME, user.surname);
    localStorage.setItem(USERNAME, user.username);
    localStorage.setItem(USER_ID, user.id);

}

export function removeSession() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(USER_SURNAME);
    localStorage.removeItem(USERNAME);
    localStorage.removeItem(USER_ID);
}