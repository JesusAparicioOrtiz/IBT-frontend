import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

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

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} minZoom={3} >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </MapContainer>
    );
}

export default Map;
