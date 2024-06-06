import {
    BooleanField, BooleanInput, ChipField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    ExportButton, FilterButton, FilterListItem,
    List,
    NumberField,
    SearchInput,
    SelectColumnsButton, SelectInput,
    TextField, TextInput,
    TopToolbar
} from "react-admin";
import * as React from "react";

const postFilters = [
    <SearchInput source="q" placeholder="Tìm kiếm" alwaysOn/>,
];

const ListActions = () => (
    <TopToolbar>
        {/*<FilterButton filters={postFilters} disableSaveQuery/>*/}
        <SelectColumnsButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
export const InventoryList = () => (
    <List sort={{field: 'id', order: 'DESC'}}
          perPage={10}
          filters={postFilters}
          actions={<ListActions/>}
    >
        <DatagridConfigurable>
            <TextField source="id" label="ID"/>
            <TextField source="product.title" label="Tên sản phẩm"/>
            <NumberField source="importPrice"
                         options={{
                             style: 'currency',
                             currency: 'VND',
                         }}
                         label="Giá nhập"/>
            <NumberField source="salePrice"
                         options={{
                             style: 'currency',
                             currency: 'VND',
                         }}
                         label="Giá bán"/>
            <NumberField source="importedQuantity" label="Số lượng nhập"/>
            <NumberField source="remainingQuantity" label="Số lượng còn lại"/>
            <DateField source="createdAt" label="Ngày nhập"/>
            <BooleanField source="active" label="Trạng thái"/>
        </DatagridConfigurable>
    </List>
);