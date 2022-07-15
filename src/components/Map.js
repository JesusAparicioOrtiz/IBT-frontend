import React, {useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import {MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import {  Container, Navbar, Nav, NavDropdown, Form, Button, Row, Col} from "react-bootstrap";
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
    const [lines, setLines] = useState([]);
    const [linesFiltered, setLinesFiltered] = useState([]);
    const [userDataFiltered, setUserDataFiltered] = useState([]);

    function DateFilter() {
        var [fromDate, setFromDate] = useState('');
        var [toDate, setToDate] = useState('');

        const filterPlaces = (e) => {
            e.preventDefault();
            var from = fromDate ? new Date(fromDate) : new Date(0);
            var to = toDate ? new Date(toDate) : new Date();
            var filtered = userData.filter(place => {
                return new Date(place.date) >= from && new Date(place.date) <= to;
            });
            setUserDataFiltered(filtered);
            let linesAux = [];
            filtered.forEach(place => {
                linesAux.push([place.latitude, place.longitude]);
            });
            setLines(linesAux);
            setLinesFiltered(linesAux);
        }

        return (<>
        <Form className="d-flex" onSubmit = {filterPlaces} >
            <Form.Control
                type="date"
                placeholder="From"
                className="me-2"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
            />
            <Form.Control
                type="date"
                placeholder="To"
                className="me-2"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
            />
            <Button variant="outline-light" type="submit" >Filter</Button>
        </Form>
        </>);
    }

    function LineFilter() {
        return (<>
            <Form.Range min={0} max={lines.length-1} step={1} onChange={(e) => setLinesFiltered(lines.slice(e.target.value))} />
        </>);
    }

    useEffect( () => { 
        const getUserCities = ( async () => {
            axios.get(`${process.env.REACT_APP_SERVER}/api/v1/user/cities`, {
            headers: {
                'x-access-token': localStorage.getItem('user')
            }
            }).then(res => {
                let cities = res.data.cities;
                let citiesCoordinates = [];
                cities.sort((a, b) => { return new Date(b.date) - new Date(a.date) });
                cities.forEach(city => {
                    citiesCoordinates.push([city.latitude, city.longitude]);
                });
                setLines(citiesCoordinates);
                setLinesFiltered(citiesCoordinates);
                setUserData(cities);
                setUserDataFiltered(cities);
            })
        }) 
        getUserCities();
    }, []);

    return (<>
        <NavigationBar dateFilters={DateFilter} lineFilter={LineFilter} />
            <MapContainer center={center} zoom={3} scrollWheelZoom={true} minZoom={3}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userDataFiltered.map((item,index)=>{
                return (<Marker position={[item.latitude, item.longitude]} icon={marker} key={index}>
                    <Popup>
                        <div>
                            <h4>{item.name}</h4>
                            <p>{item.date.split('T')[0]}</p>
                        </div>
                    </Popup>
                    </Marker>)
            })}
            <Polyline pathOptions={{ color: 'purple' }} positions={linesFiltered} />
            </MapContainer>
        </>
    );
}

export default Map;
