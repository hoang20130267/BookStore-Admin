import {
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List,
    NumberField,
    SearchInput,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    useTranslate
} from "react-admin";
import * as React from "react";
import {Inventory} from "../../type";
import {Chip} from '@mui/material';

const adminInfo = JSON.parse(localStorage.getItem('auth') || '{}');
const QuickFilter = ({label, source, defaultValue}: { label: string, source?: string, defaultValue?: boolean }) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};

const postFilters = [
    <SearchInput source="q" placeholder="Tìm kiếm" alwaysOn/>,
    <QuickFilter source="active" label="Hết hàng" defaultValue={false} />,
];

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        {adminInfo.roles[0].description === 'ADMIN' && <CreateButton/>}
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
    <List sort={{field: 'remainingQuantity', order: 'DESC'}}
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
            <TextField source="createdAt" label="Ngày nhập"/>
            <BooleanField source="active" label="Trạng thái"/>
        </DatagridConfigurable>
    </List>
);