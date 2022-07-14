import axios from 'axios';

function deleteAccount(event) {
    event.preventDefault();

    return new Promise((resolve, reject) => {
        axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/user/delete`,
        {  validateStatus:false, headers: {'x-access-token': localStorage.getItem('user')}}).then((response) => { 
            resolve();
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export default deleteAccount;