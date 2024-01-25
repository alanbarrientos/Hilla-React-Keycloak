import {AutoGrid} from "@hilla/react-crud";
import {HillaProveedorSimpleService} from "Frontend/generated/endpoints";
import ProveedorSimpleModel from "Frontend/generated/com/example/application/entity/ProveedorSimpleModel";
import React, {useState} from "react";
import Proveedor from "Frontend/generated/com/example/application/entity/Proveedor";
import ProveedorSimple from "Frontend/generated/com/example/application/entity/ProveedorSimple";

export default function AutoGridView() {
    const [selectedItems, setSelectedItems] = useState<ProveedorSimple[]>([]);


    return (
        <div>
            <br/>
            <h1 style={{marginLeft: '1rem'}}>Grid In Column Filter And Sorting</h1>
            <br/>
            <AutoGrid
                style={{marginLeft: '1rem'}} service={HillaProveedorSimpleService}
                model={ProveedorSimpleModel}
                selectedItems={selectedItems}
                onActiveItemChanged={(e) => {
                    const item = e.detail.value;
                    setSelectedItems(item ? [item] : []);
                    console.log(selectedItems)
                }}
            />;
        </div>
    );
}