import { List } from "antd";

export const ShowActiveFiltersControl = ({getFilters}) => {
    const { geoFilter, radiusFilter } = getFilters(); 
    const getDisplayFilter = () => {
        const filtersToDisplay = [];

        const round = (num) => Math.round(num * 100 / 100);

        if(geoFilter){
            filtersToDisplay.push(geoFilter.properties.CONTINENT);
        }

        if(radiusFilter){
            const {coordinates} = radiusFilter.feature.geometry;
            const { radius } = radiusFilter;
            const radiusFilterToDisplay= `
            Center: (Lat: ${round(coordinates[1])}, Lon: ${round(coordinates[0])} )
            Radius: ${radius} km`;
            filtersToDisplay.push(radiusFilterToDisplay);
        }

        return filtersToDisplay.length > 0 ?  filtersToDisplay : ["No Active Filter"]
    }

    const RenderActiveFilters = () => {
        return (<List
        size="small"
        header={<div>Active Filters</div>}
        bordered
        dataSource={getDisplayFilter()}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />)
    }



    return (
        <div className="leaflet-bottom leaflet-left">
            <div className="leaflet-control leaflet-bar leaflet-control-layers">
                <RenderActiveFilters />
            </div>

        </div>
    )
}