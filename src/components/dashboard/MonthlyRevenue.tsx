import * as React from 'react';
import DollarIcon from '@mui/icons-material/AttachMoney';

import CardWithIcon from './CardWithIcon';

interface MonthlyRevenueProps {
    revenue: string;
}

const MonthlyRevenue: React.FC<MonthlyRevenueProps> = ({revenue}) => {
    return (
        <CardWithIcon
            to={`/orders?filter=%7B"slug"%3A"delivered"%7D`}
            icon={DollarIcon}
            title="Doanh thu tháng này"
            subtitle={revenue}
        />
    );
};

export default MonthlyRevenue;
