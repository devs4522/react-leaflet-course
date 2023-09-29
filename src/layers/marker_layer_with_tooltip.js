 import React from "react";
 import { Tooltip, Marker, useMap, LayersControl, LayerGroup  } from "react-leaflet";
import { mountainIcon } from "../icons/mountainIcon";

 export const MarkerLayerWithTooltip = ({data}) => {
    const leafletMap= useMap();
    const layer = data.features.map((feature) => {
        const { coordinates } = feature.geometry;
        const { name , continent, elevation } = feature.properties; 
        return (
          <>
            <Marker 
              key={String(coordinates)} 
              position={[coordinates[1], 
              coordinates[0]]} 
              icon={mountainIcon}
              eventHandlers={{
                click: (e) => leafletMap.panTo(e.latlng)
              }}
            >
                <Tooltip>
                  <h3>Mt. {name}</h3>
                  Continent: <b>{continent}</b> <br/>
                  Elevation: <b>{elevation}</b> <br/>
                </Tooltip>
              </Marker>
          </>
        )
    });

    return (
      <LayersControl.Overlay  name="Highest Point">
           <LayerGroup>{layer}</LayerGroup> 
      </LayersControl.Overlay>
  );
    
}
