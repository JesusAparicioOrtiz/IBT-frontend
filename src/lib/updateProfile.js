import axios from 'axios';
import sha256 from 'js-sha256';

async function updateProfile(event, selectedValue) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const name = event.target.name.value;
    const surname = event.target.surname.value;

    if(username.length < 5) {
        alert('Username must be at least 5 characters long');
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

    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/user/profile/update`,
    {username: username, email: email, name: name, surname: surname, languages: selectedValue },
    {   headers: {
            'x-access-token': localStorage.getItem('user')
        }
    });
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

export default updateProfile;