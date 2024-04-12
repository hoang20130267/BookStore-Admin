import {Card, CardContent} from '@mui/material';
import {FilterLiveSearch, FilterList, FilterListItem} from 'react-admin';
import LockIcon from '@mui/icons-material/Lock';

export const BlogAside = () => {
    return (
        <Card
            sx={{
                order: -1,
                mr: 2,
                mt: 6,
                alignSelf: 'flex-start'
            }}
        >
            <CardContent>
                <FilterLiveSearch label={'Tìm...'} name={'search'}/>
                <FilterList label={'Trạng thái'} icon={<LockIcon/>}>
                    <FilterListItem label={'Hoạt động'} value={{status: true}}/>
                    <FilterListItem label={'Bị khóa'} value={{status: false}}/>
                </FilterList>
            </CardContent>
        </Card>
    )
}