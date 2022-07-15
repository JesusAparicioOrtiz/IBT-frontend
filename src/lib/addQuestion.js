import axios from 'axios';

function addCity(question, city) {
    return new Promise((resolve, reject) => {

        if(city.length < 2) {
            reject('City must be higher than 2 characters');
            return;
        }

        if(question.length < 10 || question.length > 300) {
            reject('Question length must be between 10 and 300 characters long');
            return;
        }

        console.log(question, city);
        axios.post(`${process.env.REACT_APP_SERVER}/api/v1/forum/question/${city}`,
            { city: city, question: question},{  validateStatus:false, headers: {
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