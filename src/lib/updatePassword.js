import axios from 'axios';
import sha256 from 'js-sha256';
import logout from '../lib/logout';

async function updatePassword(event, selectedValue) {
    event.preventDefault();
    const oldPassword = event.target.oldPassword.value;
    const newPassword = event.target.newPassword.value;
    const newPassword2 = event.target.newPassword2.value;

    if(newPassword !== newPassword2) {
        alert('Passwords do not match');
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
        alert('Password updated!');
        logout();
        window.location.href = '/';
        alert('You have been logged out');
    } else {
        alert(response.data.message);
    }
}

export default updatePassword;