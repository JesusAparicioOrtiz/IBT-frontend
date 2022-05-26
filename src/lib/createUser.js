import axios from 'axios';
import sha256 from 'js-sha256';

async function createUser(event, selectedValue) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const password2 = event.target.password2.value;
    const email = event.target.email.value;
    const name = event.target.name.value;
    const surname = event.target.surname.value;

    if(username.length < 5) {
        alert('Username must be at least 5 characters long');
        return;
    }
    if(password !== password2) {
        alert('Passwords do not match');
        return;
    }
    if(!verifyEmail(email)) {
        alert('Email is not valid');
        return;
    }
    if(name.length < 5) {
        alert('Name must be at least 5 characters long');
        return;
    }
    if(surname.length < 5) {
        alert('Surname must be at least 5 characters long');
        return;
    }

    var hash = sha256.create();
    hash.update(password);
    const h = hash.hex();

    var hash2 = sha256.create();
    hash2.update(password2);
    const h2 = hash.hex();


    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/user/signup`,{ username: username , password: h, password2: h2, email: email, name: name, surname: surname, languages: selectedValue });
    if(response.status === 200) {
        window.location.href = '/';
    } else {
        alert(response.data.message);
    }
}

function verifyEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default createUser;