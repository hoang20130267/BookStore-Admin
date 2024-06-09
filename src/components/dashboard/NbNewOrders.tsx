import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CardWithIcon from './CardWithIcon';

const NbNewOrders = () => {
    return (
        <CardWithIcon
            to="/commands"
            icon={ShoppingCartIcon}
        />
    );
};

export default NbNewOrders;