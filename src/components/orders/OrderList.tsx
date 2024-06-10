import {
    ChipField,
    DatagridConfigurable,
    ExportButton,
    FunctionField,
    List,
    NumberField,
    SearchInput,
    SelectColumnsButton,
    TextField,
    TopToolbar
} from "react-admin";
import * as React from "react";
import {Order} from "../../type";
import {OrderFilterSidebar} from "./OrderFilterSidebar";

export const OrderList = () => {
    const ListActions = () => (
        <TopToolbar>
            <SelectColumnsButton/>
            <ExportButton/>
        </TopToolbar>
    );
    return (
        <List
            sort={{field: 'orderDate', order: 'DESC'}}
            perPage={10}
            filterDefaultValues={{slug: 'pending'}}
            aside={<OrderFilterSidebar/>}
            actions={<ListActions/>}
            sx={{width: '100%'}}
        >
            <DatagridConfigurable rowClick="edit">
                <TextField source="orderDate" label="Ngày đặt hàng"/>
                <ChipField source="orderCode" label="Mã đơn hàng"/>
                <TextField source="shippingAddress.fullName" label="Người dùng"/>
                <FunctionField<Order> source="shippingAddress" label="Địa chỉ"
                                      render={(record) => `${record.shippingAddress.hnumSname}, 
                               ${record.shippingAddress.wardCommune}, 
                               ${record.shippingAddress.countyDistrict}, 
                               ${record.shippingAddress.provinceCity}`}/>
                <TextField source="totalQuantity" label="Số lượng"/>
                <NumberField source="orderTotal" label="Tổng"
                             options={{
                                 style: 'currency',
                                 currency: 'VND',
                             }}
                             sx={{fontWeight: 'bold'}}
                />
                <TextField source="status.name" label="Trạng thái"/>
            </DatagridConfigurable>
        </List>
    );
}