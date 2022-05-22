import axios from 'axios';
import sha256 from 'js-sha256';
function checkLogIn(event) {
    alert("Logging in...");
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    var hash = sha256.create();
    hash.update(password);
    const h = hash.hex();
    axios.post(`http://${process.env.REACT_APP_SERVER}/api/v1/user/login`,
        { username: username , password: h},{ validateStatus: false }).then((response) => {
        if (response.status === 200) {
            localStorage.setItem('user', response.data.token);
            alert('Logged in!');
            window.location.href = '/';
        } else {
            alert(response.data.message);
        }
    })
}

export default checkLogIn;