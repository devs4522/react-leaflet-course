import {useState, useEffect, useRef} from "react";
import { MapContainer, TileLayer, Popup, Marker, LayersControl, LayerGroup } from "react-leaflet";
import { cities } from "../data/citi";
import { mountains } from "../data/highest_points";
import { continents } from "../data/continents";
import fireStations  from "../data/geoJson_files/sweden_fire_station_polygon.json";
import swedenAdmin0 from "../data/geoJson_files/gadm41_SWE_0.json";
import swedenAdmin1 from "../data/geoJson_files/gadm41_SWE_1.json";
import swedenAdmin2 from "../data/geoJson_files/gadm41_SWE_2.json";

import { MarkerLayer } from "../layers/marker_layer";
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip";
import { MarkerLayerWithTooltipCluster } from "../layers/marker_layer_with_tooltip_cluster";
import { RadiusFilter } from "../layers/radius_filter";
import { ContinentsPolygonLayer } from "../layers/continent_layer";
import { CustomLayers } from "../layers/layers";

import { FitBoundsToDataControl } from "../controls/fit_data_to_bounds";
import { ShowActiveFiltersControl } from "../controls/show_active_filters";

const position = [25.38537, 82.96283]

export const Map = () => {
    const baseLayerRef = useRef();
    const [geoFilter, setGeoFilter] = useState(null);
    const getGeoFilter = () => geoFilter;

    const [radiusFilter,  setRadiusFilter] = useState(null);
    const getRadiusFilter= () => radiusFilter;

    const [asyncCities, setAsyncCities] = useState({ features: []});




    useEffect(() => {
        // baseLayerRef.current = (
        //     <TileLayer
        //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //     />
        //   );

        const fetchData = async () => {
            const response = await fetch("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places.geojson");
            const cities = await response.json();
            setAsyncCities(cities);
        }
        fetchData().catch(console.error);
        console.log("asyncCities", asyncCities);
    }, []);

    return(
        <MapContainer center={[59.334591,18.063240]} zoom={3} scrollWheelZoom={false}>
            <LayersControl position="topright">
                {/* <LayersControl.BaseLayer checked name="OSM streets">
                    {baseLayerRef.current}
                </LayersControl.BaseLayer> */}
                <LayersControl.BaseLayer checked name="OSM streets">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="ESRI World Imagery">
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </LayersControl.BaseLayer>
                <MarkerLayer 
                    data={asyncCities} 
                    setRadiusFilter={setRadiusFilter} 
                    getRadiusFilter={getRadiusFilter}
                    getGeoFilter={getGeoFilter}
                    />
                <MarkerLayerWithTooltip data={mountains}/>
                <MarkerLayerWithTooltipCluster data={cities} />
                {/* <MarkerLayerWithTooltipReproject data={irishCities2157} /> */}
                <RadiusFilter radiusFilter={radiusFilter} setRadiusFilter={setRadiusFilter}/>
                <CustomLayers data={[fireStations, swedenAdmin0, swedenAdmin1, swedenAdmin2]}/>
                <ContinentsPolygonLayer data={continents} setGeoFilter={setGeoFilter} getGeoFilter={getGeoFilter}/>
            </LayersControl>
            <FitBoundsToDataControl/>
            <ShowActiveFiltersControl getFilters={() => ({geoFilter, radiusFilter})}/>
            
            
        </MapContainer>
      )
}