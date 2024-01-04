// ShapefileLayer.js
import React, { useEffect, useState } from 'react';
import { GeoJSON, LayersControl } from "react-leaflet";
// import L from 'leaflet';
import shp from 'shpjs';

export const ShapefileLayer = ({ data }) => {
//   const [shapeData, setShapeData] = useState({ features: []});
//   useEffect(() => {
//     // Load and display the Shapefile layer
//     fetch('shape_files/IND_adm.zip')
//       .then((response) => response.arrayBuffer())
//       .then(async (arrayBuffer) => {  
//         console.log("Array Buffer:", arrayBuffer);
//         try {
//             const data = await shp(arrayBuffer);
//             const geoJson = {
//                 type: 'FeatureCollection',
//                 features: data[1].features,
//               };
//               setShapeData(geoJson);
//               console.log("Shape files geoJson Data", data);
//             // Rest of the code
//           } catch (error) {
//             console.error("Error parsing Shapefile ZIP:", error);
//           }        
//         // shp.parseZip(arrayBuffer).then((data) => {
//         //     const geoJson = {
//         //       type: 'FeatureCollection',
//         //       features: data[0].features,
//         //     };
//         //     setShapeData(geoJson);
//         //     console.log("Shape files geoJson Data", data);

//         //     // Now, you can add the GeoJSON to your Leaflet map
//         //     // L.geoJSON(geoJson).addTo(map);
//         //   });

//         // const geoJson = shp(arrayBuffer);
//         // setShapeData(geoJson);
//       });
//   }, []);

  const layer = (
        <GeoJSON 
            key="shape-file-layer" 
            data={data}
            style= {(feature) => {
                return {
                    color: "red",
                    weight: 0.5,
                    fillOpacity: 0.5,
                }
            }}
        >
        </GeoJSON>
    );

    return (
        <LayersControl.Overlay  name="Shape Files">
            {layer}
        </LayersControl.Overlay>
    ); // This component doesn't render anything directly
}
