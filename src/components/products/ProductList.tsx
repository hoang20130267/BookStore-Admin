import {
    CreateButton,
    DatagridConfigurable,
    ExportButton, ImageField,
    List, NumberField,
    SearchInput,
    SelectColumnsButton, TextField,
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
    <SearchInput source="title" alwaysOn/>,
    // <TextInput label="Tên danh mục" source="name" />,
];
export const ProductList = () => (
    <List sort={{field: 'id', order: 'DESC'}}
          perPage={25}
          filters={postFilters}
          actions={<ListActions/>}
    >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" label="ID"/>
            <TextField source="category.name" label="Danh mục"/>
            <TextField source="title" label="Tên sản phẩm"/>
            <ImageField source="image" label="Hình ảnh"
                        sx={{'& img': {maxWidth: 70, maxHeight: 70, objectFit: 'contain'}}}/>
            <NumberField source="oldPrice" options={{
                style: 'currency',
                currency: 'VND',
            }}
                         label="Giá gốc"/>
            <NumberField source="currentPrice" options={{
                style: 'currency',
                currency: 'VND',
            }}
                         label="Giá hiện tại"/>
            <TextField source="createdBy.username" label="Tạo bởi"/>
            <TextField source="createdAt" label="Ngày tạo"/>
            <TextField source="updatedBy.username" label="Cập nhật bởi"/>
            <TextField source="updatedAt" label="Ngày cập nhật"/>
        </DatagridConfigurable>
    </List>
);