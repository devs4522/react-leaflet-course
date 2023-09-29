import React from "react";
import { Map } from "./Map/Map";
import "leaflet/dist/leaflet.css";
import "./App.css";
import "antd/dist/antd.variable.min.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export const App = () => {
    return <Map />
}