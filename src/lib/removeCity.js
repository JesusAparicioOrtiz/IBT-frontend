import axios from 'axios';

function removeCity(event, cityId) {
    alert("Deleting city...");
    return new Promise((resolve, reject) => {
        axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/city/remove`,
        {  validateStatus:false, headers: {
            'x-access-token': localStorage.getItem('user')
            },
            data: {
                city: cityId
            }
        }
        ).then((response) => { 
            alert(response.data.message);
            resolve(response.status === 200);
        })
    });
}

export default removeCity;