import React, {useState} from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import { airportsEurope }  from '../data/airports';
import { swedenAdminBoundry } from "../data/sweden_admin";
import { continentBoundry } from "../data/continent_control_layer";
import { TreeLayerControl } from "../layers/tree_control_layers";
import { Header } from '../components/header';
import L from 'leaflet';
import { ItemGroupTree } from "../controls/item_group_tree";
import { ItemGroupLayers } from '../layers/Items_group_layers';
import { initialItems } from '../data/items';

const osm = L.tileLayer(
    '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '© OpenStreetMap contributors'}
);

const baseTree = {label: 'OSM', layer: osm, name: 'OpenStreeMap'};


const controlTreeOptions = {
    namedToggle: true,
    collapsed: true,
    expanded: false,
}

export const NewMap = () => {

    const [items, setItems] = useState(initialItems);

    const updateItems = (checkedKeysValue) => {
      items.forEach(item => {
          item.selected =false;
          if(checkedKeysValue.includes(item.key)) {
              item.selected = true;
          }
      });
      setItems([...items]);
      console.log("items", items);
    }

  return (
    <>
        <Header />
        <ItemGroupTree onItemsUpdate={updateItems}/>
        <MapContainer center={[59.334591, 18.063240]} zoom={3} scrollWheelZoom={false}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OSM streets">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>

                <TreeLayerControl overlayTree={[airportsEurope, swedenAdminBoundry, continentBoundry]} options={controlTreeOptions} />
            </LayersControl>
            <ItemGroupLayers items={items} />
        </MapContainer>
    </>

  );
};
