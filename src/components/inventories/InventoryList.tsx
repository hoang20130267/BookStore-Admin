import {
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    ExportButton,
    List,
    NumberField,
    SearchInput,
    SelectColumnsButton,
    TextField,
    TopToolbar
} from "react-admin";
import * as React from "react";
import {Inventory} from "../../type";

const postFilters = [
    <SearchInput source="q" placeholder="Tìm kiếm" alwaysOn/>,
];

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const rowStyle = (record: Inventory, index: number) => {
    if (record.remainingQuantity === 0) {
        return {backgroundColor: '#ff6666'};
    } else if (record.remainingQuantity < 10) {
        return {backgroundColor: '#ffcccc'};
    } else {
        return {backgroundColor: 'white'};
    }
};
export const InventoryList = () => (
    <List sort={{field: 'id', order: 'ASC'}}
          perPage={10}
          filters={postFilters}
          actions={<ListActions/>}
    >
        <DatagridConfigurable rowStyle={rowStyle}>
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