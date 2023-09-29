import L from "leaflet";

import mountainMarkerPng from "../images/mountain-marker-icon.png"; 

const LeafIcon = L.Icon.extend({
    options: {
        iconSize: [23, 23],
        iconAnchor: [17, 16]
    }
})

export const mountainIcon = new LeafIcon({iconUrl: mountainMarkerPng});