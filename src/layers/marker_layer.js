import L from 'leaflet';
import { useState } from "react";
import { Popup, Marker,LayersControl, LayerGroup } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcon";
import { Button, Card, InputNumber, Space } from 'antd';
import { FilterOutlined} from '@ant-design/icons';
import boooleanPointInPolygon from "@turf/boolean-point-in-polygon";

const DEFAULT_RADIUS= 3000;
 
 const PopupStatistics = ({ feature, setRadiusFilter}) => {
    const [radius, setRadius] = useState(DEFAULT_RADIUS);
    const { NAME, ADM0NAME, POP_MAX} = feature.properties;
    return (
        <>
            <Card type="inner" title="Name" >
                <b >{`${NAME} ${ADM0NAME}`}</b>
            </Card>
            <Card type="inner" title="Population" >
                <b >{`${POP_MAX}`}</b>
            </Card>
            <Card type="inner" title="Radius Filter" >
                <Space>
                    <InputNumber
                        defaultValue={DEFAULT_RADIUS}
                        min={0}
                        onChange={(e) => setRadius(e)}
                    >
                    </InputNumber>
                    <Button 
                        type="primary" 
                        shape="round" 
                        icon={<FilterOutlined />}
                        onClick={() => setRadiusFilter((prevState) => {
                            let newFilter;
                            if(prevState) {
                                if(radius === 0) {
                                    newFilter = prevState;
                                } else {
                                    const sameFeature = prevState.feature === feature;
                                    const sameRadius= prevState.radius === radius;
                                    if(!sameFeature || !sameRadius) {
                                        newFilter= { feature, radius}
                                    }
                                }
                            } else if(radius != 0) {
                                newFilter = { feature, radius};
                            }
                            return newFilter;
                        }
                    )}
                    >
                        Filter by km
                    </Button>
                </Space>
            </Card>

        </> 
    )
 }

export const MarkerLayer = ({data, setRadiusFilter, getRadiusFilter, getGeoFilter}) => {
    const radiusFilter = getRadiusFilter();
    const geoFilter = getGeoFilter();
    console.log("radiusfilter", radiusFilter);
    let centerPoint;
    if(radiusFilter) {
        const { coordinates } = radiusFilter.feature.geometry;
        centerPoint= L.latLng(coordinates[1], coordinates[0]);
    }

    const layer = data.features.filter((currentFeature) => {   
        let filterByRadius;
        let filterByGeo;

        if(centerPoint) {
            const { coordinates } = currentFeature.geometry;
            const currentPoint = L.latLng(coordinates[1], coordinates[0]);
            filterByRadius= centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius;
        } 

        if(geoFilter) {
            filterByGeo = boooleanPointInPolygon(currentFeature, geoFilter); 
        }

        let doFilter = true;
        if(geoFilter && radiusFilter) {
            doFilter= filterByGeo && filterByRadius;
        } else if(geoFilter && !radiusFilter) {
            doFilter= filterByGeo;
        } else if(!geoFilter && radiusFilter) {
            doFilter= filterByRadius;
        }
        return doFilter;
    }).map((feature) => {
        const { coordinates } = feature.geometry;
        return (
            <Marker 
                key={String(coordinates)} 
                position={[coordinates[1], 
                coordinates[0]]} 
                icon={defaultIcon}
                doFitToBounds={true}
            >
                <Popup>
                    <PopupStatistics feature={feature} setRadiusFilter={setRadiusFilter}></PopupStatistics>
                </Popup>
              </Marker>
        )
    });
    
    return (
        <LayersControl.Overlay  name="World Cities">
           <LayerGroup>{layer}</LayerGroup> 
        </LayersControl.Overlay>
    );

}
