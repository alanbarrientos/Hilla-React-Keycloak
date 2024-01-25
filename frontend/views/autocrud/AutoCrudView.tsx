import {AutoCrud} from "@hilla/react-crud";
import {HillaProveedorSimpleService} from "Frontend/generated/endpoints";
import ProveedorSimpleModel from "Frontend/generated/com/example/application/entity/ProveedorSimpleModel";
import React from "react";

export default function AutoCrudView() {

    return (
        <div>
            <AutoCrud service={HillaProveedorSimpleService} model={ProveedorSimpleModel} />
        </div>
    );
}