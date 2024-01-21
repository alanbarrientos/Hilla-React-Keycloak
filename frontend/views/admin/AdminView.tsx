import React from "react";
import {AutoCrud} from "@hilla/react-crud";
import {HillaProveedorService, ProveedorService} from "Frontend/generated/endpoints";
import ProveedorModel from "Frontend/generated/com/example/application/entity/ProveedorModel";

export default function AdminView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{ width: '200px' }} src="images/empty-plant.png" />
      <h2>Admin view</h2>
        {/*<AutoCrud service={BoardHillaService} model={BoardModel} />*/}

    </div>
  );
}
