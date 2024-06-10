import * as React from 'react';
import {BlogSearch} from "./BlogSearch";
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    SelectColumnsButton, DatagridConfigurable, BulkUpdateButton, BulkDeleteButton
} from 'react-admin';
import {
    List,
    ImageField,
    TextField,
    DateField,
    EditButton,
} from "react-admin";

import DeleteButton from "../../layout/DeleteButton";

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);
export const BlogList = () => (
    <List sort={{field: 'id', order: 'ASC'}} perPage={5}
          actions={<VisitorListActions/>}
          filters={<BlogSearch/>}
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
            <TextField source="blogCate.name" label="Danh mục"/>
            <ImageField source="image" label="Hình ảnh"
                        sx={{'& img': {maxWidth: 100, maxHeight: 50, objectFit: 'contain'}}}/>
            <TextField source="createdBy.username" label="Người tạo"/>
            <TextField source="title" label="Tiêu đề"/>
            <DateField source="createdAt" label="Ngày tạo"/>
            <EditButton />
            <DeleteButton param={"tin tức"}/>
        </DatagridConfigurable>
    </List>
);