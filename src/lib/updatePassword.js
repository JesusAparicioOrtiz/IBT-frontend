import axios from 'axios';
import sha256 from 'js-sha256';
import logout from '../lib/logout';
import {validatePassword} from '../utils/validators';

async function updatePassword(event) {
    event.preventDefault();

    return new Promise(async (resolve, reject) => {
        const oldPassword = event.target.oldPassword.value;
        const newPassword = event.target.newPassword.value;
        const newPassword2 = event.target.newPassword2.value;

        if(newPassword !== newPassword2) {
            reject('Passwords do not match');
            return;
        }

        if(!validatePassword(newPassword)) {
            reject('Password must be between 8 and 64 characters long and contain at least one number, one lowercase letter, one uppercase letter and one special character (@$!%*?&)');
            return;
        }

        var hash = sha256.create();
        hash.update(oldPassword);
        const h = hash.hex();

        var hash2 = sha256.create();
        hash2.update(newPassword);
        const h2 = hash2.hex();

        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/user/password/update`,
        { oldPassword: h, newPassword: h2 },
        {   headers: {
                'x-access-token': localStorage.getItem('user')
            }
        });
        if(response.status === 200) {
            logout();
            alert('Password updated successfully!');
        } else {
            reject(response.data.message);
        }
    });
}

export default updatePassword;