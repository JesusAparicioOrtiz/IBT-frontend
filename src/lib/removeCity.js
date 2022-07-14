import axios from 'axios';

function removeCity(event, cityId) {
    console.log(cityId);
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
                resolve(response.status === 200);
            }).catch((error) => {
                reject(error);
            });
    });
}

export default removeCity;