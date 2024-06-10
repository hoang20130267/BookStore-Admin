import {
    DateField,
    Edit,
    EmailField,
    FunctionField,
    Labeled,
    PrevNextButtons,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TopToolbar,
    useRecordContext
} from "react-admin";
import {Order, OrderDetail, OrderStatus} from "../../type";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

const OrderTitle = () => {
        const record = useRecordContext<Order>();
        if (!record) return null;
        return <span>Đơn hàng {record.orderCode}</span>;
    }
;
const ListActions = () => (
    <TopToolbar>
        <PrevNextButtons linkType="edit"/>
    </TopToolbar>
);
const OrderEdit = () => (
    <Edit title={<OrderTitle/>}
          actions={<ListActions/>}>
        <OrderForm/>
    </Edit>
);

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const OrderItems = () => {
    const record = useRecordContext();
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow sx={{
                        '& th': {
                            fontWeight: 'bold',
                        }
                    }}>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell sx={{textAlign: 'right'}}>Giá sản phẩm</TableCell>
                        <TableCell sx={{textAlign: 'right'}}>Số lượng</TableCell>
                        <TableCell sx={{textAlign: 'right'}}>Tổng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {record?.orderDetails.map((item: OrderDetail) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.product.title}</TableCell>
                            <TableCell
                                sx={{textAlign: 'right'}}>{currencyFormatter.format(item.product.currentPrice)}</TableCell>
                            <TableCell sx={{textAlign: 'right'}}>{item.quantity}</TableCell>
                            <TableCell sx={{textAlign: 'right'}}>{currencyFormatter.format(item.totalMoney)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
const OrderTotals = () => {
    const record = useRecordContext();

    const calculateTotalMoney = (orderDetails: OrderDetail[]): number => {
        return orderDetails.reduce((total, orderDetail) => {
            return total + orderDetail.totalMoney;
        }, 0);
    };
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Tổng tiền hàng</TableCell>
                        <TableCell
                            sx={{textAlign: 'right'}}>{currencyFormatter.format(calculateTotalMoney(record.orderDetails))}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Phí vận chuyển</TableCell>
                        <TableCell sx={{textAlign: 'right'}}>{currencyFormatter.format(record.shippingCost)}</TableCell>
                    </TableRow>
                    {record.promotion && (<TableRow>
                        <TableCell>Voucher từ cửa hàng</TableCell>
                        <TableCell
                            sx={{textAlign: 'right'}}>{record.promotion?.discount ? '-' : ''}{record.promotion?.discount ? currencyFormatter.format((record.promotion?.discount / 100) * record.orderTotal) : ''}</TableCell>
                    </TableRow>)}
                    <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>Thành tiền</TableCell>
                        <TableCell sx={{
                            fontWeight: 'bold',
                            textAlign: 'right'
                        }}>{currencyFormatter.format(record.orderTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const OrderForm = () => {
    const [status, setStatus] = useState<OrderStatus[]>([]);
    const fetchStatus = async () => {
        const result = await axios.get("http://localhost:8080/api/orders/status")
        if (result.data) {
            setStatus(result.data);
        }
    }

    useEffect(() => {
        fetchStatus();
    }, []);


    return (
        <SimpleForm>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Đơn hàng</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Labeled label="Ngày đặt">
                                <DateField source="orderDate"/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Labeled label="Mã đơn hàng">
                                <TextField source="orderCode" label="Mã đơn hàng"/>
                            </Labeled>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectInput
                                source="status.id"
                                label="Trạng thái"
                                choices={status}
                                validate={req}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack>
                        <Typography variant="h6" style={{marginBottom: '0.5em'}}>Khách hàng</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Labeled label="Họ tên">
                                    <TextField source="shippingAddress.fullName"
                                               sx={{fontSize: '1rem'}}/>
                                </Labeled>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Labeled label="Email">
                                    <EmailField source="user.email" sx={{fontSize: '1rem'}}/>
                                </Labeled>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Labeled label="Địa chỉ giao hàng">
                                    <TextField source="shippingAddress.phoneNumber"
                                               sx={{fontSize: '1rem'}}/>
                                </Labeled>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" style={{marginBottom: '0.5em', marginTop: '1em'}}>Địa chỉ
                            giao
                            hàng</Typography>
                        <FunctionField<Order> source="shippingAddress" label="Địa chỉ"
                                              render={(record) => `${record.shippingAddress.hnumSname}, 
                                                       ${record.shippingAddress.wardCommune}, 
                                                       ${record.shippingAddress.countyDistrict}, 
                                                       ${record.shippingAddress.provinceCity}`}
                                              sx={{fontSize: '1rem'}}/>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container>
                <Typography variant="h6" style={{marginBottom: '0.5em', marginTop: '1em'}}>Chi tiết đơn
                    hàng</Typography>
                <OrderItems/>
            </Grid>
            <Grid container>
                <Typography variant="h6" style={{marginBottom: '0.5em', marginTop: '1em'}}>Tổng đơn hàng</Typography>
                <OrderTotals/>
            </Grid>

        </SimpleForm>
    )
}
const req = [required()];
export default OrderEdit;