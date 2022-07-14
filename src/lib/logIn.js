import axios from 'axios';
import sha256 from 'js-sha256';
function logIn(username,password) {
    return new Promise((resolve, reject) => {
        var hash = sha256.create();
        hash.update(password);
        const h = hash.hex();
        axios.post(`${process.env.REACT_APP_SERVER}/api/v1/user/login`,
            { username: username , password: h},{ validateStatus: false }).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('user', response.data.token);
                localStorage.setItem('username', response.data.username);
                resolve();
            } else {
                reject(response.data.message);
            }
        }).catch((error) => {
            alert("Server error");
        });
    });
}

export default logIn;