 import React from "react";
 import { Tooltip, Marker, useMap, LayersControl, LayerGroup  } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcon";
import MarkerClusterGroup from "react-leaflet-markercluster";

 export const MarkerLayerWithTooltipCluster = ({data}) => {
    const leafletMap= useMap();
    const layer = data.features.map((feature) => {
        const { coordinates } = feature.geometry;
        const { name } = feature.properties; 
        return (
          <>
            <Marker 
              key={String(coordinates[0])} 
              position={[coordinates[1], 
              coordinates[0]]} 
              icon={defaultIcon}
              eventHandlers={{
                click: (e) => leafletMap.panTo(e.latlng)
              }}
            >
                <Tooltip>
                  <h3>{name}</h3>
                </Tooltip>
              </Marker>
          </>
        )
    });

    return (
      <LayersControl.Overlay  name="World Cities Cluster">
           <MarkerClusterGroup zoomToBoundsOnClick={false}>{layer}</MarkerClusterGroup> 
      </LayersControl.Overlay>
  );
    
}
