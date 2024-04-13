import {Card, CardContent} from '@mui/material';
import {FilterLiveSearch} from 'react-admin';

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
                <FilterLiveSearch label={'Tìm kiếm'} name={'search'}/>
            </CardContent>
        </Card>
    )
}