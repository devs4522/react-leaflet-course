import React, { useState } from 'react';
import { MapContainer, TileLayer, MultiPolygon, Marker, Popup, GeoJSON } from 'react-leaflet';
import "./MyMap.css";
import { ItemGroupTree } from "../controls/item_group_tree";
import { ItemGroupLayers } from '../layers/Items_group_layers';
import { initialItems } from '../data/items';

const MyMap = () => {
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
    <div className="map-container">
      <ItemGroupTree onItemsUpdate={updateItems}/>
      <MapContainer center={[59.334591, 18.063240]} zoom={3} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ItemGroupLayers items={items} />
      </MapContainer>
    </div>
  );
};

export { MyMap };
