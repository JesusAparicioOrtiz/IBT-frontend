import axios from 'axios';

function deleteCity(event) {
    alert("Deleting city...");
    event.preventDefault();
    const city = event.target.city.value;

    axios.post(`${process.env.REACT_APP_SERVER}/api/v1/city/`,
        { city: city},{  validateStatus:false, headers: {
            'x-access-token': localStorage.getItem('user')
        }
    }).then((response) => {
        if (response.status === 200) {
            alert('City deleted!');
        } else {
            alert(response.data.message);
        }
    })
}

export default deleteCity;