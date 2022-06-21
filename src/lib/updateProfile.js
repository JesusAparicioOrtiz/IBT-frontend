import axios from 'axios';
import {validateEmail} from '../utils/validators';

async function updateProfile(event, selectedValue) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const name = event.target.name.value;
    const surname = event.target.surname.value;

    if(username.length < 5 || username.length > 20) {
        alert('Username must be between 5 and 20 characters long');
        return;
    }
    if(!validateEmail(email)) {
        alert('Email is not valid');
        return;
    }
    if(name.length < 3 || name.length > 20) {
        alert('Name must be between 3 and 20 characters long');
        return;
    }
    if(surname.length < 3 || surname.length > 20) {
        alert('Surname must be between 3 and 20 characters long');
        return;
    }

    if(selectedValue.length === 0) {
        alert('Please select a language');
        return;
    }

    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/user/profile/update`,
    {username: username, email: email, name: name, surname: surname, languages: selectedValue },
    {   headers: {
            'x-access-token': localStorage.getItem('user')
        }
    });
    if(response.status === 200) {
        window.location.href = '/map';
    } else {
        alert(response.data.message);
    }
}


export default updateProfile;