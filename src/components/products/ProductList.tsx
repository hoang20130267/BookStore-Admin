import {
    BooleanField,
    ChipField,
    CreateButton,
    DatagridConfigurable, DateInput,
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
];
export const ProductList = () => (
    <List sort={{field: 'id', order: 'DESC'}}
          perPage={10}
          filters={postFilters}
          actions={<ListActions/>}
    >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" label="ID"/>
            <ChipField source="category.name" label="Danh mục"/>
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
            <TextField source="createdAt" label="Ngày tạo"/>
            <TextField source="updatedAt" label="Ngày cập nhật"/>
            <BooleanField source="active" label="Trạng thái"/>
        </DatagridConfigurable>
    </List>
);