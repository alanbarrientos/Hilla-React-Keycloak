import {AutoGrid} from "@hilla/react-crud";
import {HillaProveedorService} from "Frontend/generated/endpoints";
import ProveedorModel from "Frontend/generated/com/example/application/entity/ProveedorModel";
import React from "react";

export default function AutoGridView() {

    return (
        <div>
            <br/>
            <h1 style={{marginLeft: '1rem'}}>Grid In Column Filter And Sorting</h1>
            <br/>
            <AutoGrid style={{marginLeft: '1rem'}} service={HillaProveedorService} model={ProveedorModel} />;
        </div>
    );
}