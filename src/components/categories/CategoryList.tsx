import {
    CreateButton,
    Datagrid, DatagridConfigurable,
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
    <TextInput label="Tên danh mục" source="name" />,
];
const CategoryList = () => (
    <List sort={{field: 'id', order: 'ASC'}}
          filters={postFilters}
          actions={<ListActions/>}>
        <DatagridConfigurable rowClick="show">
            <TextField source="id"/>
            <TextField source="parentCategory.name" label="Danh mục cha"/>
            <TextField source="name" label="Tên danh mục"/>
            <TextField source="created_by.username" label="Tạo bởi"/>
            <TextField source="created_at" label="Ngày tạo"/>
            <TextField source="updated_by.username" label="Cập nhật bởi"/>
            <TextField source="updated_at" label="Ngày cập nhật"/>
        </DatagridConfigurable>
    </List>
);

export default CategoryList;