import { GeoJSON, LayerGroup, LayersControl, useMap } from "react-leaflet";
import { useState } from "react";
export const CustomLayers = ({data}) => {
    const leafletMap = useMap();
    const [parentLayerChecked, setParentLayerChecked] = useState(true);
    const [selectedLayers, setSelectedLayers] = useState([]);
    // Function to handle layer toggle
    const handleLayerToggle = (layerKey) => {
        if(layerKey === "Sweden Admin"){
            if(selectedLayers.length> 0)  {
                setSelectedLayers([]);
            } else {
                setSelectedLayers(['Sweden Admin 0', 'Sweden Admin 1', 'Sweden Admin 2']);
            }
        } else {
            if (selectedLayers.includes(layerKey)) {
                setSelectedLayers(selectedLayers.filter((key) => key !== layerKey));
              } else {
                setSelectedLayers([...selectedLayers, layerKey]);
              }
        }
        
    };

    const layers = (
        <>
            {/* <GeoJSON 
                key="fire-station-geo-json-layer" 
                data={data[0]}
                eventHandlers={{
                    click: (e) => leafletMap.panTo(e.latlng)
                }}
                style= {(feature) => {
                    return {
                        color: "red",
                        weight: 0.5,
                        fillOpacity: 0.4,
                    }
                }}
            >
            </GeoJSON> */}
            <LayersControl.Overlay 
                key="Sweden Admin 0"
                name="Sweden Admin 0" 
                checked={selectedLayers.includes('Sweden Admin 0')}
                onChange={() => handleLayerToggle('Sweden Admin 0')}
            >
                <GeoJSON 
                    key="swe-adm-0" 
                    data={data[1]}
                    eventHandlers={{
                        click: (e) => leafletMap.panTo(e.latlng)
                    }}
                    style= {(feature) => {
                        return {
                            color: "blue",
                            weight: 0.5,
                            fillOpacity: 0.4,
                        }
                    }}
                >
                </GeoJSON>
            </LayersControl.Overlay>
            
            <LayersControl.Overlay  
                key="Sweden Admin 1" 
                name="Sweden Admin 1" 
                checked={selectedLayers.includes('Sweden Admin 1')}
                onChange={() => handleLayerToggle('Sweden Admin 1')}

            >
                <GeoJSON 
                    key="swe-adm-1" 
                    data={data[2]}
                    eventHandlers={{
                        click: (e) => leafletMap.panTo(e.latlng)
                    }}
                    style= {(feature) => {
                        return {
                            color: "blue",
                            weight: 0.5,
                            fillOpacity: 0.4,
                        }
                    }}
                >
                </GeoJSON>
            </LayersControl.Overlay>
            <LayersControl.Overlay 
                key="Sweden Admin 2"  
                name="Sweden Admin 2" 
                checked={selectedLayers.includes('Sweden Admin 2')}
                onChange={() => handleLayerToggle('Sweden Admin 2')}
            >
                <GeoJSON 
                    key="swe-adm-2" 
                    data={data[3]}
                    eventHandlers={{
                        click: (e) => leafletMap.panTo(e.latlng)
                    }}
                    style= {(feature) => {
                        return {
                            color: "blue",
                            weight: 0.5,
                            fillOpacity: 0.4,
                        }
                    }}
                >
                </GeoJSON>
            </LayersControl.Overlay>
        </>
    );
    
    return layers;
    // return (
       
        // <LayersControl.Overlay 
        //     key="Sweden Admin" 
        //     name="Sweden Admin" 
        //     checked={
        //         selectedLayers.includes('Sweden Admin 0') &&
        //         selectedLayers.includes('Sweden Admin 1') &&
        //         selectedLayers.includes('Sweden Admin 2')
        //     } 
        //     onChange={() => handleLayerToggle('Sweden Admin')}>
            // {/* <LayerGroup> */}
            
            //  {layers}
            
            // {/* </LayerGroup> */}
           
        // </LayersControl.Overlay>

    // );
}