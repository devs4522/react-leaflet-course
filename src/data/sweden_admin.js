import L from 'leaflet';
import { defaultIcon } from "../icons/defaultIcon";
import swedenAdmin0 from "../data/geoJson_files/gadm41_SWE_0.json";
import swedenAdmin1 from "../data/geoJson_files/gadm41_SWE_1.json";
import swedenAdmin2 from "../data/geoJson_files/gadm41_SWE_2.json";
const swedenAdminBoundry = {
    label: 'Sweden Admin',
    selectAllCheckbox: true,
    children: [
        /* start aiports from http://www.partow.net/miscellaneous/airportdatabase/#Download */
        {label: 'Sweden Admin 0', layer: L.geoJSON(swedenAdmin0,{
            style: (feature) => {
                return {
                    color: "blue",
                    weight: 0.5,
                    fillOpacity: 0.4,
                }
            }
        }).bindPopup((layer) => "Swedeen")},
        {label: 'Sweden Admin 1',layer: L.geoJSON(swedenAdmin1,{
            style: (feature) => {
                return {
                    color: "blue",
                    weight: 0.5,
                    fillOpacity: 0.4,
                }
            }
        })},
        {label: 'Sweden Admin 2', layer: L.geoJSON(swedenAdmin2,{
            style: (feature) => {
                return {
                    color: "blue",
                    weight: 0.5,
                    fillOpacity: 0.4,
                }
            }
        })},
    ]
};

export { swedenAdminBoundry }