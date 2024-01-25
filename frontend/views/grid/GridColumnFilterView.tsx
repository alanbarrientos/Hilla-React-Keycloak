import React from "react";
import {ProveedorSimpleService} from "Frontend/generated/endpoints";
import ProveedorSimple from "Frontend/generated/com/example/application/entity/ProveedorSimple";
import {
    Grid,
    type GridDataProviderCallback,
    type GridDataProviderParams,
} from '@hilla/react-components/Grid.js';
import Sort from "Frontend/generated/dev/hilla/mappedtypes/Sort";
import Direction from "Frontend/generated/org/springframework/data/domain/Sort/Direction";
import {GridSortColumn} from "@hilla/react-components/GridSortColumn";
import {GridFilterColumn} from "@hilla/react-components/GridFilterColumn";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import {Templatizer} from "@polymer/polymer/lib/legacy/templatizer-behavior";
import {TextField} from "@hilla/react-components/TextField.js";




export default function GridColumnFilterView() {
    function filterEstractorFromParams<T>(params: GridDataProviderParams<T>) {
        if(params.filters.length>0){
            return {
                "@type": "and",
                children: params.filters.map((filter) => ({
                    "@type": "propertyString",
                    propertyId: filter.path,
                    filterValue: filter.value,
                    matcher: Matcher.CONTAINS
                }))
            };
        }else {
            return undefined;
        }
    }

    async function proveedorProvider(
        params: GridDataProviderParams<ProveedorSimple>,
        callback: GridDataProviderCallback<ProveedorSimple>

    ){
        const sort: Sort = {
            orders: params.sortOrders.map((order) => ({
                property: order.path,
                direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
                ignoreCase: false,
            })),
        };

        const res = await ProveedorSimpleService.list({
            pageNumber:params.page,
            pageSize:params.pageSize,
            sort
        },
            filterEstractorFromParams<ProveedorSimple>(params)
    )

        callback(res.items, res.totalCount);
    }



    return (
        <div>
            <br/>
            <h1 style={{marginLeft: '1rem'}}>Grid In Column Filter And Sorting</h1>
            <br/>
            <Grid style={{margin: '1rem'}} dataProvider={proveedorProvider} multiSort multiSortPriority="append">
                <GridFilterColumn header="Name" path="name" flexGrow={0} width="230px">
                </GridFilterColumn>
                <GridSortColumn path="active" header="Active"/>
                <GridSortColumn path="dateAdded" header="Date Added" />
            </Grid>
        </div>
    );
}


// -----------------------------------------------------------------------
// Eager loading

// export default function GridColumnFilterView() {
//     const [proveedoresEager, setProveedoresEager] = useState<Proveedor[]>([]);
//     const [proveedoresLazy, setProveedoresLazy] = useState<Proveedor[]>([]);
//     useEffect(() => {
//         ProveedorService.listAll().then((value: React.SetStateAction<Proveedor[]>) => setProveedoresEager(value))
//
//     }, []);
//
//     return (
//         <div>
//             <h1>Grid Eager Loading</h1>
//             <Grid items={proveedoresEager}>
//                 <GridColumn path="name" />
//                 <GridColumn path="active" />
//                 <GridColumn path="dateAdded" />
//             </Grid>
//             <h1>Grid Lazy Loading</h1>
//         </div>
//     );
// }
