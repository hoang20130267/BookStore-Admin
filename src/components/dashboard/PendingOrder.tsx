import * as React from 'react';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useReference } from 'react-admin';

import { User, Order } from '../../types';

interface Props {
    order: Order;
}

export const PendingOrder = (props: Props) => {
    const { order } = props;
    const { referenceRecord: isLoading } = useReference<User>({
        reference: 'user',
        id: order.user.id,
    });

    return (
        <ListItem button component={Link} to={`/orders/${order.id}`}>
            <ListItemAvatar>
                {isLoading ? (
                    <Avatar />
                ) : (
                    <Avatar
                        src={`${order?.user?.userInfo?.avatar}?size=32x32`}
                        sx={{ bgcolor: 'background.paper' }}
                        alt={`${order?.user?.userInfo?.fullName}`}
                    />
                )}
            </ListItemAvatar>
            <ListItemText
                primary={new Date(order.orderDate).toLocaleString('en-GB')}
                secondary={'của ' + (order?.user?.userInfo?.fullName) + ', ' + (order?.orderDetails?.length) + ' sản phẩm'}
            />
            <ListItemSecondaryAction>
                <Box
                    component="span"
                    sx={{
                        marginRight: '1em',
                        color: 'text.primary',
                    }}
                >
                    {order.orderTotal.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
