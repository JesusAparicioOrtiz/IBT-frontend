import axios from 'axios';

function deleteAccount(event) {
    alert("Deleting account...");
    event.preventDefault();

    axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/user/delete`,
    {  validateStatus:false, headers: {
        'x-access-token': localStorage.getItem('user')
        }
    }
    ).then((response) => { 
        alert(response.data.message);
        window.location.href = '/';
    })
}

export default deleteAccount;