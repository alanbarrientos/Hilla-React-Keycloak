import React, {useState} from "react";
import {ProveedorSimpleService} from "Frontend/generated/endpoints";
import ProveedorSimple from "Frontend/generated/com/example/application/entity/ProveedorSimple";
import {
    Grid,
    type GridDataProviderCallback,
    type GridDataProviderParams,
    GridFilterDefinition
} from '@hilla/react-components/Grid.js';
import Sort from "Frontend/generated/dev/hilla/mappedtypes/Sort";
import Direction from "Frontend/generated/org/springframework/data/domain/Sort/Direction";
import {GridSortColumn} from "@hilla/react-components/GridSortColumn";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {Icon} from "@hilla/react-components/Icon";




export default function GridExternalFilterView() {
    const [searchTerm, setSearchTerm] = useState('')
    let inputValue = '';
    function filterExtractor<T>(filters: GridFilterDefinition[]) {
        if(filters.length>0){
            return {
                "@type": "and",
                children: filters.map((filter) => ({
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

        const res = await ProveedorSimpleService.listByName({
                pageNumber:params.page,
                pageSize:params.pageSize,
                sort
            }, searchTerm
        )

        callback(res.items, res.totalCount);
    }



    return (
        <div>
            <br/>
            <h1 style={{marginLeft: '1rem'}}>Grid External Filter And Sorting</h1>
            <br/>
            <TextField style={{margin: '1rem'}}  onChange={(event) => {
                inputValue = event.target.value
            }}>
            </TextField>
            <Button onClick={() => { setSearchTerm(inputValue) }}>
                <Icon icon="vaadin:search"/>
            </Button>
            <br/>
            <Grid style={{margin: '1rem'}} dataProvider={proveedorProvider} multiSort multiSortPriority="append">
                <GridSortColumn path="name" header="Name" />
                <GridSortColumn path="active" header="Active"/>
                <GridSortColumn path="dateAdded" header="Date Added" />
            </Grid>
        </div>
    );
}
