import React, {useEffect, useRef} from "react";
import {useForm, useFormPart} from "@hilla/react-form";
import {TextField} from "@hilla/react-components/TextField.js";
import ProveedorSimpleModel from "Frontend/generated/com/example/application/entity/ProveedorSimpleModel";
import {Button} from "@hilla/react-components/Button.js";
import {ProveedorSimpleService} from "Frontend/generated/endpoints";
import {Checkbox} from "@hilla/react-components/Checkbox";
import {FormLayout} from "@hilla/react-components/FormLayout";
import { Notification } from '@hilla/react-components/Notification.js';


export default function FormView() {
    const { invalid, submitting, model, field, reset, submit, addValidator} = useForm(ProveedorSimpleModel, {
        onSubmit: async (proveedor) => {
            if(proveedor.active === undefined){
                proveedor.active = false;
            }
            await ProveedorSimpleService.saveProveedor(proveedor);
            Notification.show(proveedor.name + ' agregado correctamente')
            reset()
        }
    });
    // Example of a custom client-side validator
    const nameField = useFormPart(model.name);
    useEffect(() => {
        nameField.addValidator({
            message: 'Must contains at least 2 characters',
            validate: (value: string) => {
                if (value.length >= 2) {
                    return true;
                }
                return false;
            }
        });
    }, []);
    return (
        <div>
            <br/>
            <h2 style={{marginLeft: '1rem'}}>Form Example</h2>
            <br/>
            <h3 style={{marginLeft: '2rem'}}>Create Proveedor</h3>
            <br/>
            {nameField.value && <h4 style={{marginLeft: '2rem'}}>Preview : {nameField.value}</h4>}
            <FormLayout style={{marginLeft: '2rem'}}>
                <TextField label="Name" {...field(model.name)}style={{marginBottom: '1rem'}}></TextField>
                <br/>
                <Checkbox label="IsActive" {...field(model.active)} style={{marginBottom: '2rem'}}></Checkbox>
                <br/>
            </FormLayout>
            <Button onClick={reset} style={{marginLeft: '2rem',marginRight: '1rem'}}>Reset</Button>
            <Button disabled={invalid || submitting} onClick={submit}>Save</Button>
        </div>
    );
}