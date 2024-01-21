import {AutoCrud} from "@hilla/react-crud";
import {HillaProveedorService} from "Frontend/generated/endpoints";
import ProveedorModel from "Frontend/generated/com/example/application/entity/ProveedorModel";
import React from "react";

export default function AutoCrudView() {

    return (
        <div>
            <AutoCrud service={HillaProveedorService} model={ProveedorModel} />
        </div>
    );
}