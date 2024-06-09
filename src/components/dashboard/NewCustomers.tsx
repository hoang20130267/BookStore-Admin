import * as React from 'react';
import { Avatar, Box, Button } from '@mui/material';
import CustomerIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import {
    ListBase,
    WithListContext,
    SimpleList,
} from 'react-admin';
import { subDays } from 'date-fns';

import CardWithIcon from './CardWithIcon';
import { User } from './types';

const NewCustomers = () => {

    const aMonthAgo = subDays(new Date(), 30);
    aMonthAgo.setDate(aMonthAgo.getDate() - 30);
    aMonthAgo.setHours(0);
    aMonthAgo.setMinutes(0);
    aMonthAgo.setSeconds(0);
    aMonthAgo.setMilliseconds(0);

    const filters = {
        has_ordered: true,
        first_seen_gte: aMonthAgo.toISOString(),
    };

    console.log("Applied Filters:", filters);
    return (
        <ListBase
            resource="user"
            filter={filters}
            sort={{ field: 'username', order: 'DESC' }}
            perPage={100}
            disableSyncWithLocation
        >
            <CardWithIcon
                to="/user"
                icon={CustomerIcon}
                title={"Khách hàng mới"}
                subtitle={
                    <WithListContext render={({ total }) => <>{total}</>} />
                }
            >
                <SimpleList<User>
                    primaryText={record => `${record.userInfo.fullName}`}
                    leftAvatar={customer => (
                        <Avatar
                            src={`${customer.userInfo.avatar}?size=32x32`}
                            alt={`${customer.userInfo.fullName}`}
                        />
                    )}
                />
                <Box flexGrow={1}>&nbsp;</Box>
                <Button
                    sx={{ borderRadius: 0 }}
                    component={Link}
                    to="/user"
                    size="small"
                    color="primary"
                >
                    <Box p={1} sx={{ color: 'primary.main' }}>
                        Xem tất cả
                    </Box>
                </Button>
            </CardWithIcon>
        </ListBase>
    );
};

export default NewCustomers;