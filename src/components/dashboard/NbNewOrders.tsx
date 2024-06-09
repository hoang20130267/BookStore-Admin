import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardWithIcon from './CardWithIcon';

interface Props {
    nbNewOrders: number;
}

const NbNewOrders = ({ nbNewOrders }: Props) => {
    return (
        <CardWithIcon
            to="/orders"
            icon={ShoppingCartIcon}
            title="Đơn hàng mới"
            subtitle={nbNewOrders}
        />
    );
};

export default NbNewOrders;
