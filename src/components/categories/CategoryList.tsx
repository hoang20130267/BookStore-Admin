import {
    BooleanField,
    CreateButton,
    Datagrid, DatagridConfigurable, DeleteButton, EditButton,
    ExportButton,
    FilterButton, FilterLiveSearch,
    List, SearchInput,
    SelectColumnsButton,
    TextField, TextInput,
    TopToolbar
} from "react-admin";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const postFilters = [
    <SearchInput source="name" alwaysOn/>,
    // <TextInput label="Tên danh mục" source="name" />,
];
const CategoryList = () => (
    <List sort={{field: 'id', order: 'DESC'}}
          filters={postFilters}
          actions={<ListActions/>}
          pagination={false}
    >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" label="ID"/>
            <TextField source="name" label="Tên danh mục"/>
            <TextField source="createdBy.username" label="Tạo bởi"/>
            <TextField source="createdAt" label="Ngày tạo"/>
            <TextField source="updatedBy.username" label="Cập nhật bởi"/>
            <TextField source="updatedAt" label="Ngày cập nhật"/>
            <EditButton/>
        </DatagridConfigurable>
    </List>
);

export default CategoryList;