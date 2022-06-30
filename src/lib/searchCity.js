import axios from 'axios';

function searchCity(event,city) {
    event.preventDefault();

    return new Promise((resolve, reject) => {

        if(city.length < 3 || city.length > 30) {
            alert('City must be between 3 and 30 characters long');
            return reject();
        }

        axios.get(`${process.env.REACT_APP_SERVER}/api/v1/city/search/${city}`,{  validateStatus:false, headers: {
                'x-access-token': localStorage.getItem('user')
            }
        }).then((response) => {
            if (response.status === 200) {
                return resolve(response.data)
            } else {
                alert(response.data.message);
                return reject();
            }
        })
    
    });
}

export default searchCity;