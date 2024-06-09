import {FilterList, FilterListItem, FilterLiveSearch} from 'react-admin';
import {Card, CardContent} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export const OrderFilterSidebar = () => (
    <Card sx={{
        order: -1,
        mr: 2,
        mt: '48px',
        width: '230px',
        height: 'fit-content',
        minWidth: '230px',
        maxWidth: '230px'
    }}>
        <CardContent>
            <FilterLiveSearch/>
            <FilterList label="Trạng thái" icon={<BookmarkBorderIcon/>}>
                <FilterListItem label="Đang chờ xử lý" value={{slug: 'pending'}}/>
                <FilterListItem label="Đã xác nhận" value={{slug: 'confirmed'}}/>
                <FilterListItem label="Đang chuẩn bị hàng" value={{slug: 'preparing'}}/>
                <FilterListItem label="Đang vận chuyển" value={{slug: 'shipping'}}/>
                <FilterListItem label="Đã giao hàng" value={{slug: 'delivered'}}/>
                <FilterListItem label="Đã hủy" value={{slug: 'cancelled'}}/>
            </FilterList>
        </CardContent>
    </Card>
);