import {
    CreateButton,
    DatagridConfigurable,
    DeleteButton,
    EditButton,
    ExportButton,
    List,
    SearchInput,
    SelectColumnsButton,
    TextField,
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
];
const CategoryList = () => (
    <List sort={{field: 'id', order: 'ASC'}}
          filters={postFilters}
          actions={<ListActions/>}
    >
        <DatagridConfigurable rowClick="show">
            <TextField source="id" label="ID"/>
            <TextField source="parentCategory.name" label="Danh mục cha"/>
            <TextField source="name" label="Tên danh mục"/>
            <TextField source="createdBy.username" label="Tạo bởi"/>
            <TextField source="createdAt" label="Ngày tạo"/>
            <TextField source="updatedBy.username" label="Cập nhật bởi"/>
            <TextField source="updatedAt" label="Ngày cập nhật"/>
            <EditButton/>
            <DeleteButton/>
        </DatagridConfigurable>
    </List>
);

export default CategoryList;