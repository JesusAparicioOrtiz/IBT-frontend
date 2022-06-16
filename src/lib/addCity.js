import axios from 'axios';

function addCity(event) {
    alert("Adding city...");
    event.preventDefault();
    const city = event.target.city.value;
    let date;
    try {
        date = new Date(event.target.date.value);
        date.setHours(0, 0, 0, 0);
    } catch (e) {
        alert('Invalid date');
        return;
    }

    if(city.length < 3) {
        alert('City must be at least 5 characters long');
        return;
    }

    if(date.getTime() > new Date().getTime()) {
        alert('Date must be in the past');
        return;
    }

    axios.post(`${process.env.REACT_APP_SERVER}/api/v1/city/subscribe`,
        { city: city, date: date},{  validateStatus:false, headers: {
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