import axios from 'axios';

function addCity(event, city) {
    event.preventDefault();
    return new Promise((resolve, reject) => {
        const description = event.target.description.value;
        let date;

        if(event.target.date.value === "") {
            reject("Please enter a date");
            return;
        }
        
        try {
            date = new Date(event.target.date.value);
            date.setHours(0, 0, 0, 0);
            console.log(date)
        } catch (e) {
            reject('Invalid date');
            return;
        }

        if(city.name.length < 3) {
            reject('City must be higher than 3 characters');
            return;
        }

        if(description.length < 10 || description.length > 300) {
            reject('Description must be between 10 and 300 characters long');
            return;
        }


        if(date.getTime() > new Date().getTime()) {
            reject('Date must be in the past');
            return;
        }

        axios.post(`${process.env.REACT_APP_SERVER}/api/v1/city/subscribe`,
            { city: city, description: description, date: date},{  validateStatus:false, headers: {
                'x-access-token': localStorage.getItem('user')
            }
        }).then((response) => {
            if (response.status === 200) {
                resolve();
            } else {
                reject(response.data.message);
            }
        }).catch((error) => {
            reject("Server error");
        });
    });
}

export default addCity;