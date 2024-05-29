import * as React from 'react';
import {CommentSearch} from "./CommentSearch";
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    SelectColumnsButton, DatagridConfigurable, BulkUpdateButton, BulkDeleteButton
} from 'react-admin';
import {
    List,
    TextField,
    DateField,
    DeleteButton,
} from "react-admin";
import RatingField from './RatingField';

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const CommentList = () => (
    <List sort={{field: 'id', order: 'DESC'}} perPage={5}
          actions={<VisitorListActions/>}
          filters={<CommentSearch/>}
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
          }}
    >
        <DatagridConfigurable
            rowClick="show"
            bulkActionButtons={
                <>
                    <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                    <BulkDeleteButton/>
                </>
            }
        >
            <TextField source="id" label="ID"/>
            <TextField source="user.username" label="Người bình luận"/>
            <TextField source="cmtDetail" label="Người tạo"/>
            <RatingField source="rating" label="Số sao"/>
            <DateField source="created_at" label="Ngày tạo"/>
            <DateField source="updated_at" label="Ngày tạo"/>
            <DeleteButton />
        </DatagridConfigurable>
    </List>
);