import axios from 'axios';
import sha256 from 'js-sha256';
import {validateEmail, validatePassword} from '../utils/validators';

async function createUser(event, selectedValue) {
    event.preventDefault();
    return new Promise(async (resolve, reject) => {
    
        const username = event.target.username.value;
        const password = event.target.password.value;
        const password2 = event.target.password2.value;
        const email = event.target.email.value;
        const name = event.target.name.value;
        const surname = event.target.surname.value;

        if(username.length < 5 || username.length > 20) {
            reject('Username must be between 5 and 20 characters long');
            return;
        }
        if(password !== password2) {
            reject('Passwords do not match');
            return;
        }

        if(!validatePassword(password)) {
            reject('Password must be between 8 and 64 characters long and contain at least one number, one lowercase letter, uppercase letter and one special character (@$!%*?&)');
            return;
        }
        
        if(!validateEmail(email)) {
            reject('Email is not valid');
            return;
        }
        if(name.length < 3 || name.length > 20) {
            reject('Name must be between 3 and 20 characters long');
            return;
        }
        if(surname.length < 3 || surname.length > 20) {
            reject('Surname must be between 3 and 20 characters long');
            return;
        }

        if(selectedValue.length === 0) {
            reject('Please select a language');
            return;
        }

        var hash = sha256.create();
        hash.update(password);
        const h = hash.hex();

        var hash2 = sha256.create();
        hash2.update(password2);
        const h2 = hash.hex();


        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/user/signup`,{ username: username , password: h, password2: h2, email: email, name: name, surname: surname, languages: selectedValue },{ validateStatus: false });
        if(response.status === 200) {
            resolve();
        } else {
            reject(response.data.message);
        }
    });
}

export default createUser;