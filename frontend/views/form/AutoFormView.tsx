import React, {useState} from "react";
import ProveedorModel from "Frontend/generated/com/example/application/entity/ProveedorModel";
import {AutoForm} from "@hilla/react-crud";
import {HillaProveedorService, ProveedorService} from "Frontend/generated/endpoints";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {Button} from "@hilla/react-components/Button.js";
import Proveedor from "Frontend/generated/com/example/application/entity/Proveedor";

export default function AutoFormView() {
    const [editedItem, setEditedItem] = useState<Proveedor | null>(null);
    const handleEdit = async () => {
        setEditedItem(await ProveedorService.getById(1));
    };

    const handleCreate = () => {
        setEditedItem(null);
    };

    return (
        <div>
            <br/>
            <h2 style={{marginLeft: '1rem'}}>Auto Form Example</h2>
            <br/>
            <h3 style={{marginLeft: '2rem'}}>Create Proveedor</h3>
            <br/>
            <Button style={{marginLeft: '2rem'}} onClick={handleEdit}>Edit Mode</Button>
            <Button style={{marginLeft: '2rem'}} onClick={handleCreate}>Create Mode</Button>
            <AutoForm
                // @ts-ignore
                service={HillaProveedorService}
                model={ProveedorModel}
                item={editedItem}
                deleteButtonVisible={editedItem ? true : false}
                style={{margin: '2rem'}}
                onDeleteSuccess={() => setEditedItem(null)}
            />
        </div>
    );
}