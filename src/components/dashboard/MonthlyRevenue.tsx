import * as React from 'react';
import DollarIcon from '@mui/icons-material/AttachMoney';

import CardWithIcon from './CardWithIcon';

const MonthlyRevenue = () => {
    return (
        <CardWithIcon to="/commands" icon={DollarIcon}/>
    );
};

export default MonthlyRevenue;