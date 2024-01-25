import React, {useEffect, useState} from "react";
import {ProveedorService} from "Frontend/generated/endpoints";
import Proveedor from "Frontend/generated/com/example/application/entity/Proveedor";
import {AutoGrid, AutoGridRef} from "@hilla/react-crud";
import ProveedorModel from "Frontend/generated/com/example/application/entity/ProveedorModel";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {FormLayout} from "@hilla/react-components/FormLayout";
import {Checkbox} from "@hilla/react-components/Checkbox";
import {useForm} from "@hilla/react-form";
import {Notification} from "@hilla/react-components/Notification";
import {DatePicker} from "@hilla/react-components/DatePicker";
import {Dialog} from "@hilla/react-components/Dialog";

export default function ProveedoresView() {
    const [selectedItems, setSelectedItems] = useState<Proveedor[]>([]);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [toCreate, setToCreate] = useState(true);
    const { invalid,
        read,
        value,
        submitting,
        model,
        field,
        reset,
        clear,
        submit, addValidator} = useForm(ProveedorModel, {
        onSubmit: async (proveedor) => {
            if(toCreate){
                await ProveedorService.createProveedor(proveedor);
                Notification.show(proveedor.name + ' agregado correctamente')
            } else {
               await  ProveedorService.save(proveedor)
                Notification.show(proveedor.name + ' editado correctamente')
                setEditDialog(false)
            }
            autoGridRef.current?.refresh()
            reset()
        }
    });
    let autoGridRef = React.useRef<AutoGridRef>(null);
    useEffect(() => {
        if (selectedItems.length > 0 && editDialog){
            read(selectedItems[0])
        }
    }, [selectedItems, editDialog]);



    // @ts-ignore
    return (
        <div>
            <br/>
            <h1 style={{marginLeft: '1rem'}}>Proveedores</h1>
            <br/>
            <AutoGrid
                ref={autoGridRef}
                style={{margin: '1rem'}} service={ProveedorService}
                model={ProveedorModel}
                visibleColumns={['name', 'active', 'fechaDeFundacionDelProveedor']}
                noHeaderFilters={true}
                multiSort={true}
                selectedItems={selectedItems}
                onActiveItemChanged={(e) => {
                    const item = e.detail.value;
                    setSelectedItems(item ? [item] : []);
                }}
            />
            <HorizontalLayout
                    style={{
                        justifyContent: 'right',
                        margin: '1rem'
                    }}
            >
                {selectedItems.length > 0 &&
                    <>
                        <Button style={{margin: "0.5rem"}} theme="secondary error" onClick={() => setDeleteDialog(true)}>
                            Borrar
                        </Button>
                        <Button style={{margin: "0.5rem"}}
                                theme="secondary"
                                onClick={
                                    () => {
                                        setToCreate(false)
                                        setEditDialog(true)
                                    }
                                }
                        >
                            Editar
                        </Button>
                    </>
                }
                <Button style={{margin: "0.5rem"}} theme="primary" onClick={() => {
                    setToCreate(true);
                    setEditDialog(true);
                    setSelectedItems([])
                }}>
                    Crear
                </Button>
            </HorizontalLayout>

            <Dialog
                headerTitle="Editar Proveedor"
                opened={editDialog}
                onOpenedChanged={({detail}) => {
                    setEditDialog(detail.value);
                }}
            >
                <FormLayout style={{marginLeft: '2rem', marginRight: '2rem', width: "25rem"}}>
                    <TextField label="Proveedor" {...field(model.name)} style={{marginBottom: '1rem'}}></TextField>
                    <br/>
                    <TextField label="Encargado" {...field(model.nombreEncargadoGeneral)} style={{marginBottom: '2rem'}}></TextField>
                    <br/>
                    <Checkbox label="Esta Activo?" {...field(model.active)} style={{marginBottom: '2rem'}}></Checkbox>
                    <br/>
                    <DatePicker label="Fecha de Fundacion del Proveedor" {...field(model.fechaDeFundacionDelProveedor)}></DatePicker>
                    <br/>
                </FormLayout><br/>
                <HorizontalLayout
                    style={{
                        justifyContent: 'right',
                        margin: '1rem'
                    }}
                >
                    <Button style={{margin:"0.5rem", marginBottom:"0rem"}} onClick={() => setEditDialog(false)}>Cancel</Button>
                    <Button style={{margin:"0.5rem", marginBottom:"0rem"}} theme="primary" onClick={submit}>
                        Guardar
                    </Button>
                </HorizontalLayout>
            </Dialog>
            <Dialog
                headerTitle={"Estas seguro que deseas Borrar el Proveedor " + selectedItems[0]?.name!}
                opened={deleteDialog}
                onOpenedChanged={({ detail }) => {
                    setDeleteDialog(detail.value);
                }}
                footerRenderer={() => (
                    <>
                        <Button theme="primary error" onClick={() => setDeleteDialog(false)}>No</Button>
                        <Button theme="primary" onClick={() => {
                            ProveedorService.delete(selectedItems[0]?.id!);
                            setDeleteDialog(false);
                            autoGridRef.current?.refresh();
                        }}>
                            Si
                        </Button>
                    </>
                )}
            >
                <></>
            </Dialog>
        </div>

    );
}









