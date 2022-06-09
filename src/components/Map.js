import React, {useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Button } from 'react-bootstrap';
import NavigationBar from './Navigationbar';
import axios from 'axios';

const center = [37.392529, -5.994072];

const universidad = new Icon({
    iconUrl: "/universidad.svg",
    iconSize: [30,30]
});
const hospital = new Icon({
    iconUrl: "/hospital.svg",
    iconSize: [40,40]
});
const marker = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [50, 50]
});

function Map() {

    const [userData, setUserData] = useState([]);

    useEffect( () => { 
        const getUserCities = ( async () => {
            axios.get(`${process.env.REACT_APP_SERVER}/api/v1/user/cities`, {
            headers: {
                'x-access-token': localStorage.getItem('user')
            }
            }).then(res => {
                console.log(res)
                setUserData(res.data.cities);
            })
        }) 
        getUserCities();
    }, []);

    return (<>
        <NavigationBar />
            <MapContainer center={center} zoom={3} scrollWheelZoom={true} minZoom={3}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userData.map((item,index)=>{
                return (<Marker position={[item.latitude, item.longitude]} icon={marker}>
                    <Popup>
                        <div>
                            <h4>{item.name}</h4>
                        </div>
                    </Popup>
                    </Marker>)
            })}
            </MapContainer>
        </>
    );
}

export default Map;
