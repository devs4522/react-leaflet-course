import React, { useState } from 'react';
import { Tree } from 'antd';
import { continents } from '../data/continents';
import "./item_group_tree.css";
import itemGroupIconUrl from "../images/building_icon.png";

const ItemGroupTree = ({onItemsUpdate}) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const groups = [
        {
            key: 0, 
            title: "Continent G1", 
            children: [{
                key: '0-0',
                title: continents.features[0].properties.CONTINENT,
                data:  continents.features[0]
            },{
                key: '0-1',
                title: continents.features[1].properties.CONTINENT,
                data:  continents.features[1]
            },{
                key: '0-2',
                title: continents.features[2].properties.CONTINENT,
                data:  continents.features[2]
            }]
        },
        {
            key: 1, 
            title: "Continent G2", 
            children: [{
                key: '1-0',
                title: continents.features[3].properties.CONTINENT,
                data:  continents.features[3]
            },{
                key: '1-1',
                title: continents.features[4].properties.CONTINENT,
                data:  continents.features[4]
            },{
                key: '1-2',
                title: continents.features[5].properties.CONTINENT,
                data:  continents.features[5]
            }]
        },
        {
            key: 2, 
            title: "Continent G2", 
            children: [{
                key: '2-0',
                title: continents.features[6].properties.CONTINENT,
                data:  continents.features[6]
            },{
                key: '2-1',
                title: continents.features[7].properties.CONTINENT,
                data:  continents.features[7]
            }]
        },
    ];


    const onExpand = (expandedKeysValue) => {
      console.log('onExpand', expandedKeysValue);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      setExpandedKeys(expandedKeysValue);
      setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
      console.log('onCheck', checkedKeysValue);
      setCheckedKeys(checkedKeysValue);
      onItemsUpdate(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
      console.log('onSelect', info);
      setSelectedKeys(selectedKeysValue);
  
    };


    return (
        <>
            <div className="item-group-icon-container">
                <img src={itemGroupIconUrl} alt="Item Group Icon" className="item-group-icon" />
            </div>
            <div className="item-group-container">
                <h2>My Continent Groups</h2>
                <Tree
                    showIcon
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    treeData={groups}
                />
            </div>
        </>
        
    );

}

export { ItemGroupTree };