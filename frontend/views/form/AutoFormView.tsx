import React, {useState} from "react";
import ProveedorSimpleModel from "Frontend/generated/com/example/application/entity/ProveedorSimpleModel";
import {AutoForm} from "@hilla/react-crud";
import {ProveedorSimpleService} from "Frontend/generated/endpoints";
import {HillaProveedorSimpleService} from "Frontend/generated/endpoints";
import {Button} from "@hilla/react-components/Button.js";
import ProveedorSimple from "Frontend/generated/com/example/application/entity/ProveedorSimple";

export default function AutoFormView() {
    const [editedItem, setEditedItem] = useState<ProveedorSimple | null>(null);
    const handleEdit = async () => {
        setEditedItem(await ProveedorSimpleService.getById(1));
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
                service={HillaProveedorSimpleService}
                model={ProveedorSimpleModel}
                item={editedItem}
                deleteButtonVisible={editedItem ? true : false}
                style={{margin: '2rem'}}
                onDeleteSuccess={() => setEditedItem(null)}
            />
        </div>
    );
}