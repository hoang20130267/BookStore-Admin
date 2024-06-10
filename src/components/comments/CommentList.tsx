import * as React from 'react';
import { CommentSearch } from "./CommentSearch";
import {
    ExportButton,
    TopToolbar,
    SelectColumnsButton,
    DatagridConfigurable,
    BulkUpdateButton,
    BulkDeleteButton,
} from 'react-admin';
import {
    List,
    TextField,
    DateField,
} from "react-admin";
import RatingField from './RatingField';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useCallback} from 'react';
import { Box, Drawer } from '@mui/material';
import CommentShow from "./CommentShow";
import DeleteButton from "../../layout/DeleteButton";

const VisitorListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

export const CommentList = () => {
    const location = useLocation();
    const match = matchPath('/comment/:id/show', location.pathname);
    const navigate = useNavigate();
    const handleClose = useCallback(() => {
        navigate('/comment');
    }, [navigate]);

    return (
        <Box display="flex">
            <List
                sort={{ field: 'id', order: 'DESC' }}
                perPage={5}
                actions={<VisitorListActions />}
                filters={<CommentSearch />}
                sx={{
                    '& .column-title': {
                        maxWidth: '16em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                    '& .column-commentable': {
                        maxWidth: '4em',
                    },
                    flexGrow: 1,
                    transition: (theme: any) =>
                        theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    marginRight: !!match ? '400px' : 0,
                }}
            >
                <DatagridConfigurable
                    rowClick="show"
                    bulkActionButtons={
                        <>
                            <BulkUpdateButton data={{ stock: 100 }} label="Refill stock" />
                            <BulkDeleteButton />
                        </>
                    }
                >
                    <TextField source="id" label="ID" />
                    <TextField source="user.username" label="Người bình luận" />
                    <TextField source="cmtDetail" label="Người tạo" />
                    <RatingField source="rating" label="Số sao" />
                    <DateField source="created_at" label="Ngày tạo" />
                    <DateField source="updated_at" label="Ngày tạo" />
                    <DeleteButton param={"bình luận"}/>
                </DatagridConfigurable>
            </List>
            <Drawer
                variant="persistent"
                open={!!match}
                anchor="right"
                onClose={handleClose}
                sx={{ zIndex: 100 }}
            >
                {!!match && (
                    <CommentShow
                        id={(match as any).params.id}
                        onCancel={handleClose} children={undefined} />
                )}
            </Drawer>
        </Box>
    );
};
