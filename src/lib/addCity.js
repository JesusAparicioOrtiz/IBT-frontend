import axios from 'axios';

function addCity(event) {
    alert("Adding city...");
    event.preventDefault();
    const city = event.target.city.value;

    if(city.length < 3) {
        alert('City must be at least 5 characters long');
        return;
    }

    axios.post(`${process.env.REACT_APP_SERVER}/api/v1/city/subscribe`,
        { city: city},{  validateStatus:false, headers: {
            'x-access-token': localStorage.getItem('user')
        }
    }).then((response) => {
        if (response.status === 200) {
            alert('City added!');
            window.location.href = '/map';
        } else {
            alert(response.data.message);
        }
    })
}

export default addCity;