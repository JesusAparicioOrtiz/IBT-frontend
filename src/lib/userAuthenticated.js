import axios from "axios"

export default function userAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}