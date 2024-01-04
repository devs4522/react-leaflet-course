import { Circle, LayersControl } from "react-leaflet";

export const RadiusFilter = ({radiusFilter, setRadiusFilter}) => {
    if(radiusFilter) {
        const { coordinates } = radiusFilter.feature.geometry;
        const layer=  (
            <Circle 
                center={[coordinates[1], coordinates[0]]}
                radius={radiusFilter.radius * 1000}
                eventHandlers={{
                    dblclick: (e) => {
                        e.originalEvent.view.L.DomEvent.stopPropagation(e);
                        setRadiusFilter(null);
                    }
                }}
                pathOptions={{fill:true, fillColor:"green", fillOpacity: 0.1, weight: 1}}
               
            />
        );
        return (
            <LayersControl.Overlay  name="Radius Filter" checked={true}>
                {layer}
            </LayersControl.Overlay>
        );
    } else {
        return null;
    }
}