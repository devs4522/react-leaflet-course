
import { Popup, GeoJSON } from 'react-leaflet';

const ItemGroupLayers = ({items}) =>  {

 return (
    <>
        {items.map(
          (item) =>
            item.selected && (
              <GeoJSON key={item.key} data={item.data}>
                <Popup>{item.title}</Popup>
              </GeoJSON>
            )
        )}
    </>
 );

}

export { ItemGroupLayers };