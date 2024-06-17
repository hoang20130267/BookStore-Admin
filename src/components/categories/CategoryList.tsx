import {
    CreateButton,
    DatagridConfigurable,
    EditButton,
    ExportButton,
    List,
    SearchInput,
    SelectColumnsButton,
    TextField,
    TopToolbar
} from "react-admin";
import * as React from "react";
const adminInfo = JSON.parse(localStorage.getItem('auth') || '{}');
const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        {adminInfo.roles[0].description === 'ADMIN' && <CreateButton/>}
        <ExportButton/>
    </TopToolbar>
);
const postFilters = [
    <SearchInput source="name" placeholder="Tìm kiếm" alwaysOn/>,
];
const CategoryList = () => (
    <List sort={{field: 'id', order: 'ASC'}}
          filters={postFilters}
          actions={<ListActions/>}
    >
        <DatagridConfigurable rowClick="edit">
            <TextField source="id" label="ID"/>
            <TextField source="parentCategory.name" label="Danh mục cha"/>
            <TextField source="name" label="Tên danh mục"/>
            <TextField source="createdBy.username" label="Tạo bởi"/>
            <TextField source="createdAt" label="Ngày tạo"/>
            <TextField source="updatedBy.username" label="Cập nhật bởi"/>
            <TextField source="updatedAt" label="Ngày cập nhật"/>
            {adminInfo.roles[0].description === 'ADMIN' && <EditButton />}
        </DatagridConfigurable>
    </List>
);

export default CategoryList;