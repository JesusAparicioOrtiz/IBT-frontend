import axios from 'axios';

function addCity(event) {
    alert("Adding city...");
    event.preventDefault();
    const city = event.target.city.value;
    const description = event.target.description.value;
    let date;

    if(event.target.date.value === "") {
        alert("Please enter a date");
        return;
    }
    
    try {
        date = new Date(event.target.date.value);
        date.setHours(0, 0, 0, 0);
    } catch (e) {
        alert('Invalid date');
        return;
    }

    if(city.length < 3 || city.length > 30) {
        alert('City must be between 3 and 30 characters long');
        return;
    }

    if(description.length < 10 || description.length > 300) {
        alert('Description must be between 10 and 300 characters long');
        return;
    }


    if(date.getTime() > new Date().getTime()) {
        alert('Date must be in the past');
        return;
    }

    axios.post(`${process.env.REACT_APP_SERVER}/api/v1/city/subscribe`,
        { city: city, description: description, date: date},{  validateStatus:false, headers: {
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