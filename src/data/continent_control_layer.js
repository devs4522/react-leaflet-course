import L from 'leaflet';
import { continents } from './continents';

const continentBoundry = {
    label: 'Continents',
    selectAllCheckbox: true,
    children: continents.features.map((feature) => {
        return {
            label: feature.properties.CONTINENT,
            layer: L.geoJSON(feature, {
                style: (feature) => {
                    return {
                        color: "blue",
                        weight: 0.5,
                        fillOpacity: 0.4,
                    }
                }
            }).bindPopup((layer) => layer.feature.properties.CONTINENT)
        }
    })
};

export { continentBoundry }