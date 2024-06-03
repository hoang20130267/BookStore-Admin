import {
    CreateButton,
    DatagridConfigurable,
    DateField,
    ExportButton,
    List,
    NumberField,
    SearchInput,
    SelectColumnsButton,
    TextField, TextInput,
    TopToolbar
} from "react-admin";
import * as React from "react";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const postFilters = [
    <SearchInput source="q" placeholder="Tìm kiếm" alwaysOn />,
];
export const InventoryList = () => (
    <List sort={{field: 'id', order: 'DESC'}}
          perPage={10}
          filters={postFilters}
          actions={<ListActions/>}
    >
        <DatagridConfigurable>
            <TextField source="id" label="ID"/>
            <TextField source="product.title" label="Tên sản phẩm"/>
            <NumberField source="importPrice" options={{
                style: 'currency',
                currency: 'VND',
            }} label="Giá nhập"/>
            <DateField source="createdAt" label="Ngày nhập"/>
            <DateField source="updatedAt" label="Ngày cập nhật"/>
            <NumberField source="quantity" label="Số lượng"/>
        </DatagridConfigurable>
    </List>
);