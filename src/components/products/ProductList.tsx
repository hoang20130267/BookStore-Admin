import {
    ArrayField,
    BooleanField,
    ChipField,
    CreateButton,
    DatagridConfigurable,
    EditButton,
    ExportButton,
    ImageField,
    List,
    NumberField,
    SearchInput,
    SelectColumnsButton,
    ShowButton,
    TextField,
    TopToolbar
} from "react-admin";
import * as React from "react";
import DeleteButton from "../../layout/DeleteButton";
import Box from "@mui/material/Box";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

const postFilters = [
    <SearchInput source="title" placeholder="Tìm kiếm" alwaysOn/>,
];
export const ProductList = () => (
    <List sort={{field: 'id', order: 'ASC'}}
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
            <Box display={{xs: 'block', sm: 'flex', width: '100%'}}>
                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                    <EditButton/>
                </Box>
            </Box>
        </DatagridConfigurable>
    </List>
);