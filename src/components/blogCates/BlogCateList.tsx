import * as React from 'react';
import {BlogCateSearch} from "./BlogCateSearch";
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
    EditButton,
    DeleteButton,
} from "react-admin";

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const BlogCateList = () => (
    <List sort={{field: 'id', order: 'ASC'}} perPage={5}
          actions={<VisitorListActions/>}
          filters={<BlogCateSearch/>}
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
            <TextField source="name" label="Tên danh mục"/>
            <TextField source="createdBy.userInfo.fullName" label="Người tạo"/>
            <DateField source="createdAt" label="Ngày tạo"/>
            <TextField source="updatedBy.userInfo.fullName" label="Người cập nhật"/>
            <DateField source="updatedAt" label="Ngày cập nhật"/>
            <EditButton />
            <DeleteButton />
        </DatagridConfigurable>
    </List>
);