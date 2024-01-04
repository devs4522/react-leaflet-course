import React from "react";
import { NewMap } from "./Map/NewMap";
// import { Map } from "./Map/Map";
// import { MyMap } from "./Map/MyMap";
import "leaflet/dist/leaflet.css";
import "./App.css";
import "antd/dist/antd.variable.min.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export const App = () => {
    return <NewMap />
}