import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';

import {
    ReferenceField,
    FunctionField,
    useGetList,
} from 'react-admin';
import CardWithIcon from './CardWithIcon';
// import StarRatingField from '../reviews/StarRatingField';
import { User, Comment } from './types';

const PendingReviews = () => {
    const { data: comment, total } = useGetList<Comment>('comment', {
        filter: { rating: 5 },
        sort: { field: 'id', order: 'ASC' },
        pagination: { page: 1, perPage: 10 },
    });

    // console.log("comment", comment)

    return (
        <CardWithIcon
            to={{
                pathname: '/comment',
            }}
            icon={CommentIcon}
            title={"Đánh giá người dùng"}
            subtitle={total}
        >
                <List>
                {comment?.map((record: Comment) => (
                    <ListItem
                        key={record.id}
                        component={Link}
                        to={`/comment/${record.id}`}
                        alignItems="flex-start"
                    >
                        <ListItemAvatar>
                            <Avatar
                                src={`${record.user.userInfo.avatar}?size=32x32`}
                                alt={`${record.user.userInfo.fullName}`}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            primary={record.user.userInfo.fullName}
                            secondary={record.cmtDetail}
                            sx={{
                                overflowY: 'hidden',
                                height: '4em',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                paddingRight: 0,
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Box flexGrow={1}>&nbsp;</Box>
            <Button
                sx={{ borderRadius: 0 }}
                component={Link}
                to="/comment"
                size="small"
                color="primary"
            >
                <Box p={1} sx={{ color: 'primary.main' }}>
                    Xem tất cả
                </Box>
            </Button>
        </CardWithIcon>
    );
};

export default PendingReviews;